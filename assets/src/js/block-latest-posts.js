/**
 * Add read-more button for each post card in latest posts block, with the html of the custom block 'button-clear-text-image'
 * The following is the html structure of the button to append. We've get it from the button pattern.
 *
 * <div className="wp-block-button wp-block-button__clear-style--text-icon">
 *   <a className="wp-block-button__custom-link has-text-align-left" href={link} target={targetBlank ? "_blank" : "_self"}><span className="wp-block-button__text">{buttonText}</span>
 *     <svg viewBox="0 0 43 43" width="43" height="43" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="43" height="43" rx="21.5" fill="#FFE000" /><path d="M22.5 16V20.5H27V22.5H22.5V27H20.5V22.5H16V20.5H20.5V16H22.5Z" fill="#005DA1"/></svg>
 *   </a>
 * </div>
 */

(function () {
	const blocks = document.querySelectorAll("*:not(.wp-block-gutenberg-blocks-paginated-posts) > .wp-block-latest-posts__list");
	const blockSelector = "*:not(.wp-block-gutenberg-blocks-paginated-posts) > .wp-block-latest-posts__list";
	/**
	 * Append the read-more button to each post card in the latest posts block
	 */
	const addReadMoreButtonToPostCard = (postCards) => {
		postCards && postCards.forEach((postCard) => {
			// Get data
			const postLink = postCard.querySelector("a");
			const postLinkHref = postLink.getAttribute("href");
			const targetValue = postLink.getAttribute("target");

			// Create elements
			const container = document.createElement("div");
			const readMoreButtonWrapper = document.createElement("div");
			const readMoreButton = document.createElement("a");
			const imgIcon = document.createElement("img");
			const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			const svgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

			// Classes and attributes for elements
			container.classList.add("wp-block-buttons");
			readMoreButtonWrapper.classList.add("wp-block-button", "is-style-fill", "wp-block-button__clear-style--text-icon");
			readMoreButton.classList.add("wp-block-button__link", "has-blue-color", "has-transparent-background-color", "has-text-color", "has-background", "has-link-color", "has-text-align-left", "wp-element-button");
			readMoreButton.setAttribute("href", postLinkHref);
			readMoreButton.setAttribute("target", targetValue ? targetValue : "_self");
			readMoreButton.textContent = latestPosts?.readMoreBtnText;

			// Classes and attributes for the img
			imgIcon.setAttribute("decoding", "async");
			imgIcon.setAttribute("style", "width: 43px;");
			imgIcon.setAttribute("src", latestPosts?.readMoreBtnIcon);

			// Classes and attributes for the svg
			svgIcon.setAttribute("viewBox", "0 0 43 43");
			svgIcon.setAttribute("width", "43");
			svgIcon.setAttribute("height", "43");
			svgIcon.setAttribute("fill", "none");
			svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");

			svgRect.setAttribute("width", "43");
			svgRect.setAttribute("height", "43");
			svgRect.setAttribute("rx", "21.5");
			svgRect.setAttribute("fill", "#FFE000");

			svgPath.setAttribute("d", "M22.5 16V20.5H27V22.5H22.5V27H20.5V22.5H16V20.5H20.5V16H22.5Z");
			svgPath.setAttribute("fill", "#005DA1");

			// Append the elements to DOM
			svgIcon.appendChild(svgRect);
			svgIcon.appendChild(svgPath);
			readMoreButton.appendChild(imgIcon);
			readMoreButton.appendChild(svgIcon);
			readMoreButtonWrapper.appendChild(readMoreButton);
			container.appendChild(readMoreButtonWrapper);
			postCard.appendChild(container);
		});
	};

	/**
	 * Check if I'm in the editor
	 */
	function isGutenbergActive() {
		return document.body.classList.contains("block-editor-page");
	}

	/**
	 * Perform an action when a block is loaded on the editor. Wait for the block to be loaded and then execute the callback function.
	 * If doesn't find the block, maybe you need to change the selector to a more nested one.
	 * @param {string} blockElements - The block elements to wait for
	 * @param {function} action - The function to execute when the block is loaded
	 */
	const onBlockLoadedInEditor = (blockElements, blockSelector, action) => {
		let blockLoaded = false;
		let blockLoadedInterval = setInterval(function () {
			if (document.querySelector(blockSelector + " > li")) {
					action(document.querySelectorAll(blockSelector + " > li"));
					blockLoaded = true;
					if (blockLoaded) {
						clearInterval(blockLoadedInterval);
					}
			}
		}, 500);
	};

	window.addEventListener("DOMContentLoaded", function () {
		if (isGutenbergActive()) {
			// For the editor:
			onBlockLoadedInEditor(blocks, blockSelector, addReadMoreButtonToPostCard);
		} else {
			// For the front-end:
			const postCards = document.querySelectorAll("*:not(.wp-block-gutenberg-blocks-paginated-posts) > .wp-block-latest-posts__list > li");
			addReadMoreButtonToPostCard(postCards);
		}
	});

})();