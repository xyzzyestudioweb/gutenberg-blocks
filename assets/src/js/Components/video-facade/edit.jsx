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
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { youtubeId } = attributes;

	const onChangeYoutubeId = (value) => {
		setAttributes({ youtubeId: value });
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<PanelBody title={__('Block settings', 'gutenberg-blocks')} initialOpen={true} >
					<PanelRow>
						<TextControl label={__('YouTube Video ID', 'gutenberg-blocks')} value={youtubeId} onChange={onChangeYoutubeId} />
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{youtubeId != '' ? (
					<LiteYouTubeEmbed id={youtubeId} />
				) : (
					<h5>{__('Please, enter a YouTube Video ID', 'gutenberg-blocks')}</h5>
				)}
			</div>
		</React.Fragment>
	);
}
