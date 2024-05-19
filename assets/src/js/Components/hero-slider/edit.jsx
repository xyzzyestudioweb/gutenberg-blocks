/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, useInnerBlocksProps, store as blockEditorStore } from "@wordpress/block-editor";
import { PanelBody, RangeControl, Button, TextControl } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";
import { select, dispatch, useRegistry } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import sliderPreview from "./sliderPreview.jpg";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const blockProps = useBlockProps();
	const { numberOfSlides, slides, isPreview, anchorLink } = attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["gutenberg-blocks/hero-slide"],
		orientation: "horizontal",
		renderAppender: false,
		template: slides,
	});

	const { replaceInnerBlocks } = dispatch(blockEditorStore);
	const registry = useRegistry();
	const { getBlocks } = registry.select(blockEditorStore);
	let innerBlocks = getBlocks(clientId);

	const onChangeNumberOfSlides = (value) => {
		const isAddingSlide = value > numberOfSlides;
		if (isAddingSlide) {
			let newSlides = value - numberOfSlides;
			let arrSlides = [];
			for (let i = 0; i < newSlides; i++) {
				arrSlides.push(createBlock("gutenberg-blocks/hero-slide"));
			}
			innerBlocks = [...innerBlocks, ...arrSlides];
		} else {
			innerBlocks = innerBlocks.slice(0, -(numberOfSlides - value));
		}
		replaceInnerBlocks(clientId, innerBlocks);
		setAttributes({ numberOfSlides: value, slides: innerBlocks });
	};

	const onSelectSlide = (slideID) => {
		let currentBlock = document.getElementById("block-" + slideID);
		if (currentBlock) {
			let inners = currentBlock.parentElement.getElementsByClassName("wp-block-gutenberg-blocks-blocks-hero-slide");
			for (let i = 0; i < inners.length; i++) {
				inners[i].style.display = "none";
			}
			currentBlock.style.display = "block";
		}
	};

	const onChangeAnchorLink = (value) => {
		setAttributes({ anchorLink: value });
	};

	useEffect(() => {
		if (slides.length === 1 && innerBlocks.length === 0 && !isPreview) {
			replaceInnerBlocks(clientId, [createBlock("gutenberg-blocks/hero-slide")]);
		} else {
			setAttributes({ slides: innerBlocks });
		}
	}, []);

	useEffect(() => {
		const lastSlide = innerBlocks.slice(-1);
		if (lastSlide.length > 0) {
			onSelectSlide(lastSlide[0].clientId);
		}
	}, [innerBlocks]);

	useEffect(() => {
		const editor = select("core/block-editor");

		const clickHandler = () => {
			const selectedBlock = editor.getSelectedBlock();
			if (selectedBlock && selectedBlock.name === "gutenberg-blocks/hero-slide") {
				onSelectSlide(selectedBlock.clientId);
			}
		};

		document.addEventListener("click", clickHandler);
		return () => {
			document.removeEventListener("click", clickHandler);
		};
	}, []);

	if (isPreview) {
		return (
			<img src={sliderPreview} alt={__("Slider preview", "gutenberg-blocks")} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
		);
	}

	return (
		<React.Fragment>
			<InspectorControls>
				<PanelBody title={__("Slider settings", "gutenberg-blocks")}>
					<RangeControl
						label={__("Number of slides", "gutenberg-blocks")}
						value={numberOfSlides}
						onChange={onChangeNumberOfSlides}
						min={1}
						max={10}
					/>
					<TextControl
						label={__("Anchor link", "gutenberg-blocks")}
						value={anchorLink}
						onChange={onChangeAnchorLink}
						help={__("Enter the id of the anchor link", "gutenberg-blocks")}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="tab-panel">
					{slides?.map((slide, index) => {
						return (
							<Button
								key={index}
								label={"Slide " + index}
								className={"remove-background"}
								variant="tertiary"
								onClick={() => onSelectSlide(slide.clientId)}
							>
								{"Slide " + (index + 1)}
							</Button>
						);
					})}
				</div>
				<div {...innerBlocksProps}></div>
				{anchorLink != "" && slides.length === 1 && (
					<div className="anchor-container">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="27" viewBox="0 0 19 27" fill="none">
							<line x1="10.0347" y1="2.18557e-08" x2="10.0347" y2="26" stroke="white" />
							<line x1="18.3536" y1="17.8884" x2="9.88844" y2="26.3535" stroke="white" />
							<line x1="9.7861" y1="26.3536" x2="1.32098" y2="17.8884" stroke="white" />
						</svg>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}
