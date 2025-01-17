export async function getUserAgents(url: string) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}`);
	}

	const text = await response.text();

	const lines = text.split('\n');

	const userAgents: string[] = [];

	for (const line of lines) {
		if (line.startsWith('User-agent: ')) {
			const ua = line.slice(12);

			if (ua === '*') {
				continue;
			}

			userAgents.push(ua);
		}
	}

	console.log(`Fetched ${userAgents.length} user agents from ${url}`);

	return userAgents;
}
