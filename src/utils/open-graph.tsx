/** @jsxRuntime automatic */
/** @jsxImportSource satori/jsx */

import type { CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import type { JSXNode } from 'satori/jsx';
import sharp from 'sharp';

import config from '@/config';

const WIDTH = 1200;
const HEIGHT = 630;
const FONT_FAMILY = 'IBM Plex Sans';
const BACKGROUND = '#f5f5f5';
const TEXT = '#0f172a';
const MUTED_TEXT = '#52525b';

const fonts = Promise.all([
	readFile(
		resolve(
			process.cwd(),
			'node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff',
		),
	),
	readFile(
		resolve(
			process.cwd(),
			'node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff',
		),
	),
]);

const avatar = readFile(resolve(process.cwd(), 'src/assets/avatar.png')).then(
	(image) => `data:image/png;base64,${image.toString('base64')}`,
);

async function render(card: JSXNode): Promise<ArrayBuffer> {
	const [regular, bold] = await fonts;
	const svg = await satori(card, {
		fonts: [
			{ data: regular, name: FONT_FAMILY, weight: 400 },
			{ data: bold, name: FONT_FAMILY, weight: 700 },
		],
		height: HEIGHT,
		width: WIDTH,
	});
	const image = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();

	return image.buffer.slice(
		image.byteOffset,
		image.byteOffset + image.byteLength,
	) as ArrayBuffer;
}

export function getPostOpenGraphImageUrl(
	post: CollectionEntry<'posts'>,
): string {
	return new URL(
		post.data.ogImage ?? `/posts/${post.id}/og.jpeg`,
		config.url,
	).toString();
}

export async function renderHomeOpenGraphImage(): Promise<ArrayBuffer> {
	const avatarSrc = await avatar;

	return render(
		<div
			style={{
				alignItems: 'center',
				backgroundColor: BACKGROUND,
				color: TEXT,
				display: 'flex',
				height: '100%',
				justifyContent: 'center',
				padding: 80,
				width: '100%',
			}}
		>
			<img
				height={280}
				src={avatarSrc}
				style={{ borderRadius: '50%', objectFit: 'cover' }}
				width={280}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginLeft: 80,
					maxWidth: 680,
				}}
			>
				<div
					style={{
						fontFamily: FONT_FAMILY,
						fontSize: 86,
						fontWeight: 700,
						letterSpacing: -3,
						lineHeight: 1,
					}}
				>
					Kelvin Chan
				</div>
				<div
					style={{
						color: MUTED_TEXT,
						fontFamily: FONT_FAMILY,
						fontSize: 36,
						lineHeight: 1.3,
						marginTop: 22,
					}}
				>
					An undergraduate student in HKUST, majoring in Electronics
					Engineering.
				</div>
				<div
					style={{
						color: MUTED_TEXT,
						fontFamily: FONT_FAMILY,
						fontSize: 28,
						marginTop: 38,
					}}
				>
					tsun1031.xyz
				</div>
			</div>
		</div>,
	);
}

export function renderPostOpenGraphImage(
	post: CollectionEntry<'posts'>,
): Promise<ArrayBuffer> {
	return render(
		<div
			style={{
				backgroundColor: BACKGROUND,
				color: TEXT,
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				padding: 72,
				width: '100%',
			}}
		>
			<div
				style={{
					color: MUTED_TEXT,
					fontFamily: FONT_FAMILY,
					fontSize: 24,
					fontWeight: 700,
					letterSpacing: 2,
				}}
			>
				{(post.data.tags?.[0] ?? 'Post').toUpperCase()}
			</div>
			<div
				style={{
					display: '-webkit-box',
					fontFamily: FONT_FAMILY,
					fontSize: 60,
					fontWeight: 700,
					letterSpacing: -2,
					lineClamp: 3,
					lineHeight: 1.08,
					marginTop: 22,
					overflow: 'hidden',
				}}
			>
				{post.data.title}
			</div>
			<div
				style={{
					color: MUTED_TEXT,
					display: '-webkit-box',
					fontFamily: FONT_FAMILY,
					fontSize: 27,
					lineClamp: 2,
					lineHeight: 1.3,
					marginTop: 28,
					overflow: 'hidden',
				}}
			>
				{post.data.description}
			</div>
			<div style={{ flexGrow: 1 }} />
			<div
				style={{
					color: MUTED_TEXT,
					fontFamily: FONT_FAMILY,
					fontSize: 24,
					fontWeight: 700,
				}}
			>
				tsun1031.xyz
			</div>
		</div>,
	);
}
