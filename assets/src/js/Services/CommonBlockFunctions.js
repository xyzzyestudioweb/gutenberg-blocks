/**
* Add common classes to all our custom blocks for common styling.
*/
export function addCommonClassName() {
	/**
	 * Add custom common class to all our custom blocks for common styling.
	 * 
	 * @param {string} className The default class name of the block.
	 * @param {string} blockName The name of the block.
	 * @return {string} The modified class name.
	 */
	function addBlockClassName(className, blockName) {
		if (blockName.startsWith('gutenberg-blocks/') && !className.includes('gutenberg-custom-block')) {
			return className + ' gutenberg-custom-block';
		}

		return className;
	}

	wp.hooks.addFilter(
		'blocks.getBlockDefaultClassName',
		'gutenberg-blocks/set-block-custom-class-name',
		addBlockClassName
	);
}

export function waitForElement(selector) {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(mutations => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}