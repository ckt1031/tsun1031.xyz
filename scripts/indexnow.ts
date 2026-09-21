/**
 * Submits all canonical URLs from the deployed sitemap to IndexNow.
 * https://www.indexnow.org/documentation
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10_000;
const REQUEST_TIMEOUT_MS = 30_000;
const DEFAULT_SITE_URL = 'https://tsun1031.xyz';
const KEY_FORMAT = /^[A-Za-z0-9-]{8,128}$/;

function decodeXmlEntities(value: string) {
	return value
		.replaceAll('&amp;', '&')
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&quot;', '"')
		.replaceAll('&apos;', "'");
}

function extractLocations(xml: string) {
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, value]) =>
		decodeXmlEntities(value.trim()),
	);
}

function extractSitemapUrls(sitemap: string, siteUrl: URL) {
	const urls = new Set<string>();

	for (const value of extractLocations(sitemap)) {
		const url = new URL(value);
		url.hash = '';

		if (url.origin === siteUrl.origin) urls.add(url.toString());
	}

	return [...urls].toSorted();
}

function isSitemapIndex(xml: string) {
	return /<sitemapindex(?:\s|>)/i.test(xml);
}

async function readRemoteText(url: URL, label: string) {
	const response = await fetch(url, {
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(
			`${label} returned ${response.status} ${response.statusText}`,
		);
	}

	return response.text();
}

async function readSitemapUrls(siteUrl: URL) {
	const sitemapUrl = new URL('sitemap-index.xml', siteUrl);
	const sitemap = await readRemoteText(sitemapUrl, 'Production sitemap');

	if (!isSitemapIndex(sitemap)) return extractSitemapUrls(sitemap, siteUrl);

	const sitemapUrls = extractSitemapUrls(sitemap, siteUrl);
	const urlLists = await Promise.all(
		sitemapUrls.map(async (url) => {
			const childSitemap = await readRemoteText(new URL(url), 'Sitemap entry');
			return extractSitemapUrls(childSitemap, siteUrl);
		}),
	);

	return [...new Set(urlLists.flat())].toSorted();
}

async function submitUrls() {
	const isDryRun = Bun.env.INDEXNOW_DRY_RUN === '1';
	const key = Bun.env.INDEXNOW_KEY;
	if (!key) throw new Error('INDEXNOW_KEY environment variable is required');
	if (!KEY_FORMAT.test(key))
		throw new Error('INDEXNOW_KEY has an invalid format');

	const siteUrl = new URL(Bun.env.INDEXNOW_SITE_URL ?? DEFAULT_SITE_URL);
	const isLocalDryRun = isDryRun && siteUrl.hostname === 'localhost';
	if (siteUrl.protocol !== 'https:' && !isLocalDryRun) {
		throw new Error('INDEXNOW_SITE_URL must use HTTPS for IndexNow');
	}
	siteUrl.pathname = '/';
	siteUrl.search = '';
	siteUrl.hash = '';

	const [urls, remoteKey] = await Promise.all([
		readSitemapUrls(siteUrl),
		readRemoteText(new URL(`${key}.txt`, siteUrl), 'IndexNow key file'),
	]);
	if (urls.length === 0) throw new Error('No site URLs found in the sitemap');
	if (remoteKey.trim() !== key) {
		throw new Error(
			'Production IndexNow key file does not match the local key',
		);
	}

	for (const url of urls) {
		if (!url.startsWith(siteUrl.origin)) {
			throw new Error(
				`URL ${url} does not belong to the site ${siteUrl.origin}`,
			);
		}

		// Print URL:
		console.info(`Submitting URL: ${url}`);
	}

	if (isDryRun) {
		console.log(
			`IndexNow dry run: ${urls.length} URL(s) for ${siteUrl.host} in ${Math.ceil(urls.length / MAX_URLS_PER_REQUEST)} request(s)`,
		);
		return;
	}

	for (let index = 0; index < urls.length; index += MAX_URLS_PER_REQUEST) {
		const urlList = urls.slice(index, index + MAX_URLS_PER_REQUEST);
		const response = await fetch(INDEXNOW_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ host: siteUrl.host, key, urlList }),
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		});

		if (!response.ok) {
			const detail = (await response.text()).trim().slice(0, 200);
			throw new Error(
				`IndexNow returned ${response.status} ${response.statusText}${detail ? `: ${detail}` : ''}`,
			);
		}

		console.log(
			`IndexNow accepted ${urlList.length} URL(s) (${response.status})`,
		);
	}
}

try {
	await submitUrls();
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`IndexNow notification failed: ${message}`);
	process.exitCode = 1;
}
