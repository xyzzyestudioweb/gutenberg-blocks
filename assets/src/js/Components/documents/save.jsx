/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
// export default function save({ attributes }) {
export default function save() {
  const blockProps = useBlockProps.save();
  return <div {...blockProps} />;

  // const { pageID, files } = attributes;

  // if (Object.keys(files).length === 0) {
  //   return null;
  // }

  // return (
  //   <div {...blockProps}>
  //     <div className="files-container">
  //       {files.map((file, index) => (
  //         <div key={index} className="single-file-container">
  //           <div className="single-file-container__heading">
  //             <img loading="lazy" src={file.icon} alt="file-icon" />
  //             <div className="file-text-container">
  //               <p>{file.title}</p>
  //             </div>
  //           </div>
  //           <div className="file__link-container wp-block-buttons">
  //             <div className="wp-block-button is-style-fill wp-block-button__clear-style--text-icon">
  //               <a
  //                 href={file.url}
  //                 download
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="wp-block-button__link has-blue-color has-transparent-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button"
  //               >
  //                 <span>{__("Download", "gutenberg-blocks")}</span>
  //                 <img
  //                   style={{ width: "43px" }}
  //                   src="/wp-content/plugins/gutenberg-block/assets/build/img/icons/download.svg"
  //                 />
  //                 <svg
  //                   width="43"
  //                   height="43"
  //                   viewBox="0 0 43 43"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <rect width="43" height="43" rx="21.5" fill="#FFE000" />
  //                   <path
  //                     d="M21.5 27L16 22.2857M21.5 27L27 22.2857M21.5 27L21.5 16"
  //                     stroke="#005DA1"
  //                     strokeWidth="2"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                 </svg>
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}
