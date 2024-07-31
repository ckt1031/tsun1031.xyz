// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

const config = {
	url: 'tsun1031.xyz', // Site domain. Do not include a trailing slash!
	description: `Welcome to ckt1031's cool website! Expect regular updates as I release exciting new content.
  I started this site in June 2022, so stay tuned for all the latest updates!`,
	author: 'cktsun', // Your name.
	siteTitle: 'ckt1031', // Site title.
	siteIconPublicPath: '/favicon.ico', // Path to the public folder, where the site icon is located.

	github_project_url: 'https://github.com/ckt1031/tsun1031.xyz',

	twitter: '@cktsun1031', // Twitter username.

	social: {
		discordServer: 'https://discord.gg/Y2ZnZc5Nnh',
		feed: '/feed.xml',
		github: 'https://github.com/ckt1031',
		instagram: 'https://www.instagram.com/ckt.1031/',
		twitter: 'https://twitter.com/@cktsun1031',
		youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
				href: '/about',
				name: 'About',
			},
		],
	},

	footer: {
		routes: [
			{
				href: '/about',
				name: 'About Me',
			},
		],
	},
};

export default config;
