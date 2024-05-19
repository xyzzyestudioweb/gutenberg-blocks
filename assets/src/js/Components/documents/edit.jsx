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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
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
  const { pageID } = attributes;

  const handlePageIDChange = (value) => {
    setAttributes({ pageID: parseInt(value) });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Documents settings", "gutenberg-blocks")}>
          <TextControl
            label={__("Page ID to get files from", "gutenberg-blocks")}
            value={pageID}
            onChange={handlePageIDChange}
            type="number"
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {/* {renderFiles(files)} */}
        <Component attributes={attributes} setAttributes={setAttributes} is_edit_mode={true} />
      </div>
    </>
  );
}
