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
import { PanelBody, TextControl, SelectControl, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import Component from './Component';

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
	const { cpt, perPage, textForShowGalleryButton, showDate, isPaginated } = attributes;
	const hasGalleryStyle = blockProps.className?.includes('is-style-custom-cpt');

	const handleCptChange = (cpt) => {
		setAttributes({ cpt: cpt });
	};

	const handlePerPageChange = (perPage) => {
		setAttributes({ perPage: parseInt(perPage) });
	};

	const handleTextChange = (text) => {
		setAttributes({ textForShowGalleryButton: text });
	}

	const handleShowDateChange = (newValue) => {
		setAttributes({ showDate: newValue });
	}

	const handleIsPaginatedChange = (newValue) => {
		setAttributes({ isPaginated: newValue });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Posts settings', 'gutenberg-blocks')}>
					<SelectControl
						label={__('CPT to get posts from', 'gutenberg-blocks')}
						value={cpt}
						options={[
							{ label: 'Posts', value: 'post' },
							{ label: 'Gallery', value: 'gallery' },
						]}
						onChange={handleCptChange}
						type="text"
					/>
					<TextControl
						label={__('Post per page', 'gutenberg-blocks')}
						value={perPage}
						onChange={handlePerPageChange}
						type="number"
					/>
					{hasGalleryStyle && (<TextControl
						label={__('Text for "Show gallery" button', 'gutenberg-blocks')}
						value={textForShowGalleryButton}
						onChange={handleTextChange}
						type="text"
					/>)}
					{!hasGalleryStyle && (<ToggleControl
						label={__('Show date', 'elmusel')}
						help={showDate ? 'It shows the post date' : 'It doesn\'t shows the post date'}
						checked={showDate}
						onChange={handleShowDateChange}
					/>)}
					<ToggleControl
						label={__('Want pagination?', 'elmusel')}
						help={isPaginated ? 'It shows the pagination when needed' : 'It doesn\'t shows the pagination'}
						checked={isPaginated}
						onChange={handleIsPaginatedChange}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<Component
					attributes={attributes}
					is_edit_mode={true}
					blockProps={blockProps}
				/>
			</div>
		</>
	);
}
