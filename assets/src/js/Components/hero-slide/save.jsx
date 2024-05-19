/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
  const blockProps = useBlockProps.save({ className: "swiper-slide" });
  const { background, title, subtitle, ctaText, ctaLink, ctaTarget } =
    attributes;

  if (Object.keys(background).length === 0) {
    return null;
  }

  return (
    <div {...blockProps}>
      <div className="slide-wrapper">
        {background.type === "video" ? (
          <video className="slide-background" playsInline autoPlay muted loop>
            <source src={background.url} type={background.mime} />
          </video>
        ) : (
          <img className="slide-background" src={background.url}
            srcSet={`${background.sizes?.medium != undefined ? background.sizes.medium.url + " 300w, " : ""}
							${background.sizes?.large != undefined ? background.sizes.large.url + " 768w, " + background.sizes.large.url + " 1024w," : ""}
							${background.sizes?.full?.url != undefined ? background.sizes.full.url + " 1536w, " + background.sizes.full.url + " 1920w" : ""}`}
          />
        )}
        <span className="slide-background-overlay"></span>
        <div className="slide-content">
          <h1 className="slide-title">{title}</h1>
          <p className="slide-subtitle">{subtitle}</p>
          {ctaText && ctaLink && (
            <div className="wp-block-buttons">
              <div className="wp-block-button is-style-fill wp-block-button__fill-style--text-icon">
                <a className="wp-block-button__link has-blue-color has-white-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button" href={ctaLink} target={ctaTarget} rel="noopener noreferrer">
                  <span>{ctaText}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <rect width="24" height="24" rx="12" fill="#FFE000" />
                    <path d="M13 6.5V11H17.5V13H13V17.5H11V13H6.5V11H11V6.5H13Z" fill="#005DA1" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
