// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

const config = {
	url: 'https://tsun1031.xyz', // Site domain. Do not include a trailing slash!
	description:
		"Kelvin Chan's personal website and blog about software, electronics, university life, and projects.",
	author: 'Kelvin Chan', // Your name.
	siteTitle: 'ckt1031', // Site title.
	siteIconPublicPath: '/favicon.ico', // Path to the public folder, where the site icon is located.

	github_project_url: 'https://github.com/ckt1031/tsun1031.xyz',

	twitter: '@cktsun1031', // Twitter username.

	social: {
		github: 'https://github.com/ckt1031',
		instagram: 'https://www.instagram.com/ckt.1031/',
		twitter: 'https://twitter.com/cktsun1031',
	},

	headbar: {
		routes: [
			{
				href: '/',
				name: 'Home',
			},
			{
				href: '/posts',
				name: 'Posts',
			},
			{
				href: '/contact',
				name: 'Contact',
			},
			{
				href: '/about',
				name: 'About',
			},
		],
	},
};

export default config;
