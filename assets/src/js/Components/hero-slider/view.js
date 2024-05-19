/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */

(function () {
	const initSlider = (slider) => {
		const autoplayProgress = document.querySelector(".autoplay-progress");
		const progressBar = document.querySelector(".progress");

		let swiper;
		const numberOfSlides = slider.querySelectorAll(".swiper-slide").length;
		const parent = slider.parentElement;

		swiper = new Swiper(slider, {
			centeredSlides: true,
			grabCursor: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			loop: numberOfSlides > 1,
			// pagination: {
			//   el: ".swiper-pagination",
			//   clickable: true,
			// },
			navigation: {
				nextEl: parent.querySelector(".swiper-next"),
				prevEl: parent.querySelector(".swiper-prev"),
			},
			on: {
				autoplayTimeLeft(s, time, progress) {
					autoplayProgress.style.display = "flex";
					const newProgress = (1 - progress) * 100;
					progressBar.style.width = `${newProgress}%`;
				},
			},
		});

		return swiper;
	};

	window.addEventListener("DOMContentLoaded", function () {
		let swiper;
		const sliders = document.querySelectorAll(".hero-swiper");
		sliders.forEach((slider) => {
			swiper = initSlider(slider);
		});
	});
})();

/* eslint-enable no-console */
