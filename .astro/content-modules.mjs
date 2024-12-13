export default new Map([
	[
		'src/content/posts/my-accomplishments-in-2023.mdx',
		() =>
			import(
				'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fposts%2Fmy-accomplishments-in-2023.mdx&astroContentModuleFlag=true'
			),
	],
	[
		'src/content/posts/my-hkdse-result.mdx',
		() =>
			import(
				'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fposts%2Fmy-hkdse-result.mdx&astroContentModuleFlag=true'
			),
	],
	[
		'src/content/posts/what-is-this-site.mdx',
		() =>
			import(
				'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fposts%2Fwhat-is-this-site.mdx&astroContentModuleFlag=true'
			),
	],
]);
