import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '[data-theme="dark"]'],
	plugins: [require('@tailwindcss/typography')],
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
			},
		},
	},
};

export default config;
