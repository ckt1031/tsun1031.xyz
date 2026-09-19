# tsun1031.xyz

[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=fff&style=for-the-badge)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-black?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A personal website showcasing information about me and my articles!

## Official Website

Visit the official website [here](https://tsun1031.xyz).

## Get Started

[Node.js](https://nodejs.org) 18 (or latest LTS) and [bun](https://bun.sh) are required to build this project.

Install dependencies:

```bash
bun install
```

To start the development server:

```bash
bun run dev
```

Build the project:

```bash
bun run build
```

## IndexNow

Set `INDEXNOW_KEY` in `.env` and the deployment environment. Builds with this
variable publish `/<key>.txt`, which IndexNow uses to verify this site. Generate
a key with `openssl rand -hex 16`, or follow [Bing's IndexNow
setup](https://www.bing.com/indexnow/getstarted).

After deploying the matching build, submit every URL in the production sitemap:

```bash
bun run indexnow
```

The script defaults to `https://tsun1031.xyz`. Set `INDEXNOW_SITE_URL` to use a
different deployment, and use `INDEXNOW_DRY_RUN=1` to verify its sitemap and
key file without notifying IndexNow.

## License

This project is licensed under the [MIT License](LICENSE).
