// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

const config = {
  url: import.meta.env.VITE_SITE_URL, // Site domain. Do not include a trailing slash!
  author: 'ckt1031', // Your name.
  siteTitle: 'ckt1031', // Site title.
  siteIconPublicPath: '/favicon.ico', // Path to the public folder, where the site icon is located.

  github_project_url: 'https://github.com/ckt1031/ckt1031.xyz',

  social: {
    discordServer: 'https://discord.gg/Y2ZnZc5Nnh',
    feed: '/feed.xml',
    github: 'https://github.com/ckt1031',
    instagram: 'https://www.instagram.com/ckt.1031/',
    twitter: 'https://twitter.com/@cktsun1031',
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },

  projects: [
    {
      github: 'https://github.com/ckt1031/ckt1031.xyz',
      tags: ['Next.js', 'Tailwind CSS'],
    },
    {
      github: 'https://github.com/ckt1031/nodejs-config',
      tags: ['ESLint', 'Prettier', 'Node.js'],
    },
    {
      github: 'https://github.com/ckt1031/obsidian-wordwise-plugin',
      tags: ['Obsidian', 'OpenAI'],
    },
    {
      github: 'https://github.com/ckt1031/obsidian-tinypng-plugin',
      tags: ['Obsidian'],
    },
    {
      github: 'https://github.com/ckt1031/DraconianBot',
      tags: ['Discord.js', 'Node.js'],
    },
    {
      github: 'https://github.com/ckt1031/discord-captcha-site',
      tags: ['Discord.js', 'Express.js', 'Node.js'],
    },
  ],

  headbar: {
    routes: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/projects',
        name: 'Projects',
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
      {
        href: '/technology',
        name: 'Techs',
      },
    ],
  },
};

export default config;
