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
import { useBlockProps, MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';
import { select } from "@wordpress/data";

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

const TEMPLATE = [['gutenberg-blocks/slide-content', {}]]

export default function Edit({ attributes, setAttributes, clientId }) {

	const blockProps = useBlockProps()
	const { background, title, subtitle, ctaText, ctaLink, ctaTarget } = attributes

	const onChangeBackground = (value) => {
		setAttributes({ background: value })
	}

	const onChangeTitle = (value) => {
		setAttributes({ title: value })
	}

	const onChangeSubtitle = (value) => {
		setAttributes({ subtitle: value })
	}

	const onRemoveBackground = () => {
		const currentBlock = select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map(block => block.clientId);
		wp.data.dispatch('core/block-editor').removeBlocks(clientIds);
		setAttributes({ background: {} })
	}

	return (
		<React.Fragment>

			<InspectorControls>
				<PanelBody
					title={__('News settings', 'gutenberg-blocks')}
				>
					<TextControl
						label={__('Slide title', 'gutenberg-blocks')}
						value={title}
						onChange={onChangeTitle}
						type="text"
					/>
					<TextareaControl
						label={__('Slide subtitle', 'gutenberg-blocks')}
						value={subtitle}
						onChange={onChangeSubtitle}
						type="text"
					/>
					<TextControl
						label={__('CTA text', 'gutenberg-blocks')}
						value={ctaText}
						onChange={(value) => { setAttributes({ ctaText: value }) }}
						type="text"
					/>
					<TextControl
						label={__('CTA link', 'gutenberg-blocks')}
						value={ctaLink}
						onChange={(value) => { setAttributes({ ctaLink: value }) }}
						type="text"
					/>
					<ToggleControl
						label={__('Open in new tab', 'gutenberg-blocks')}
						checked={ctaTarget === '_blank'}
						onChange={(value) => { setAttributes({ ctaTarget: value ? '_blank' : '_self' }) }}
					/>
				</PanelBody>
			</InspectorControls>

			<div  {...blockProps} >
				{Object.keys(background).length === 0 ? (
					<MediaPlaceholder
						onSelect={onChangeBackground}
						allowedTypes={['image', 'video']}
						multiple={false}
						labels={{ title: __('Slide image', 'gutenberg-blocks') }}
					/>
				) : (
					<div className='slide-wrapper'>
						<Button
							className={'remove-background'}
							variant='primary'
							icon='no-alt'
							onClick={() => { onRemoveBackground() }}
						/>
						{background.type === 'image' || background.media_type === 'image' ? (
							<img className='slide-background' src={background.url} />
						) : (
							<video className='slide-background' playsInline autoPlay muted loop>
								<source src={background.url} type={background.mime} />
							</video>
						)}
						<span className='slide-background-overlay'></span>
						<div className='slide-content' >
							<h1 className='slide-title'>{title}</h1>
							<p className='slide-subtitle'>{subtitle}</p>
							{ctaText && ctaLink && (
								<div className='wp-block-buttons'>
									<div className='wp-block-button is-style-fill wp-block-button__fill-style--text-icon'>
										<a className='wp-block-button__link has-blue-color has-white-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button' href={ctaLink} target={ctaTarget} rel="noopener noreferrer">
											<span>{ctaText}</span>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect width="24" height="24" rx="12" fill="#FFE000" />
												<path d="M13 6.5V11H17.5V13H13V17.5H11V13H6.5V11H11V6.5H13Z" fill="#005DA1" />
											</svg>
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

		</React.Fragment>
	);
}
