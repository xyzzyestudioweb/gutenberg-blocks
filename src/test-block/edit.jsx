/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from "@wordpress/components"

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import blockData from './block.json';
import { BaseComponent } from "../app/BaseComponent"

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	
	const blockProps = useBlockProps();
	const { testInput, testToggle } = attributes;
	const attrData = blockData.attributes

	return (
		<React.Fragment>
			<InspectorControls>
				<PanelBody title = { __( "Block options", "gutenberg-blocks" ) } >
					<BaseComponent attr={ testInput } data={ attrData.testInput } set={ setAttributes } />
					<BaseComponent attr={ testToggle } data={ attrData.testToggle } set={ setAttributes } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h2>{testInput}</h2>
			</div>
		</React.Fragment>
	);
}
