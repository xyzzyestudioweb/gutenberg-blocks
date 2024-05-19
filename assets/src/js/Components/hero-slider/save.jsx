/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes, clientId }) {
	const blockProps = useBlockProps.save();
	const { slides, anchorLink } = attributes;

	return (
		<section id={clientId} {...blockProps}>
			<div className="swiper hero-swiper">
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				{anchorLink != '' && slides.length === 1 && (
					<div className="anchor-container">
						<a href={'#' + anchorLink}>
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="27" viewBox="0 0 19 27" fill="none" >
								<line x1="10.0347" y1="2.18557e-08" x2="10.0347" y2="26" stroke="white" />
								<line x1="18.3536" y1="17.8884" x2="9.88844" y2="26.3535" stroke="white" />
								<line x1="9.7861" y1="26.3536" x2="1.32098" y2="17.8884" stroke="white" />
							</svg>
						</a>
					</div>
				)}
			</div>
			<div className="swiper-pagination"></div>
			<div className="swiper-buttons">
				<div className="swiper-next">
					<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" >
						<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="white" fillOpacity="0.9" />
						<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" stroke="white" />
						<path d="M35 28L29 34M35 28L29 22M35 28L21 28" stroke="#005DA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div className="swiper-prev">
					<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" >
						<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="white" fillOpacity="0.9" />
						<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" stroke="white" />
						<path d="M21 28L27 22M21 28L27 34M21 28L35 28" stroke="#005DA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</div>
			<div className="autoplay-progress">
				<span class="progress-bg"></span>
				<span class="progress"></span>
			</div>
		</section>
	);
}
