const COPY_ICON_SELECTOR = '#code-copy-icon';
const COPIED_ICON_SELECTOR = '#code-copied-icon';

function setButtonIcon(button: HTMLButtonElement, icon: HTMLTemplateElement) {
	button.replaceChildren(icon.content.cloneNode(true));
}

export function addCodeCopyButtons() {
	const copyIcon =
		document.querySelector<HTMLTemplateElement>(COPY_ICON_SELECTOR);
	const checkIcon =
		document.querySelector<HTMLTemplateElement>(COPIED_ICON_SELECTOR);

	if (!copyIcon || !checkIcon) return;

	document
		.querySelectorAll<HTMLPreElement>('.blog-style pre.astro-code')
		.forEach((codeBlock) => {
			const code = codeBlock.querySelector('code');
			if (!code) return;

			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'code-copy-button';
			button.setAttribute('aria-label', 'Copy code');
			button.title = 'Copy code';
			setButtonIcon(button, copyIcon);

			button.addEventListener('click', async () => {
				try {
					await navigator.clipboard.writeText(code.textContent ?? '');
					setButtonIcon(button, checkIcon);
					button.setAttribute('aria-label', 'Copied');
					button.title = 'Copied';

					window.setTimeout(() => {
						setButtonIcon(button, copyIcon);
						button.setAttribute('aria-label', 'Copy code');
						button.title = 'Copy code';
					}, 2000);
				} catch {
					button.setAttribute('aria-label', 'Unable to copy code');
					button.title = 'Unable to copy code';
				}
			});

			const wrapper = document.createElement('div');
			wrapper.className = 'code-block-wrapper';
			codeBlock.before(wrapper);
			wrapper.append(codeBlock, button);
		});
}
