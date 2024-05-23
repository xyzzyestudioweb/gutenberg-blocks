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

/**
 * Get the thumbnail from an iframe of a youtube video
 */
export const getThumbnailFromVideo = (youtubeVideo) => {
	const videoId = youtubeVideo.split('embed/')[1].split('?')[0];
	return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}