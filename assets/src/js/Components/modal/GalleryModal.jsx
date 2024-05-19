import { __ } from "@wordpress/i18n";

/** 
 * Render the modal content for Gallery Modal.
*/
export default function GalleryModal({ idSelected, contentData = {} }) {
  // TODO: Don't forget to add the thumbnail images at the bottom of the slides.

  const printSlides = (contentData) => {
    return contentData.map((post, index) => (
      <div className="swiper-slide" key={index}>
        <div className="slide-wrapper">
          <div className="slide-heading">
            <h1 className="slide-title">{post.title}</h1>
            <p className="slide-subtitle">{post.excerpt}</p>
          </div>
          <div className="slide-body">
            {post.videoEmbed ? (
              <div className="video-embed slide-background" dangerouslySetInnerHTML={{ __html: post.videoEmbed }}></div>
            ) : (
              <img loading={index !== 0 ? 'lazy' : ''} srcSet={post.srcset ? post.srcset : ''} className="slide-background" src={post.image} alt={post.title} />
            )}
          </div>
          {!post.videoEmbed && post.image ? (
            <div className="slide-footer">
              <div className="file__link-container wp-block-buttons">
                <div className="wp-block-button is-style-fill wp-block-button__clear-style--text-icon">
                  <a href={post.image} download target="_blank" rel="noopener noreferrer" className="wp-block-button__link has-blue-color has-transparent-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button">
                    <span>{__("Download", "gutenberg-blocks")}</span>
                    <img style={{ width: "43px" }} src="/wp-content/plugins/gutenberg-blocks/assets/build/img/icons/download.svg"
                    />
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="43" height="43" rx="21.5" fill="#FFE000" />
                      <path d="M21.5 27L16 22.2857M21.5 27L27 22.2857M21.5 27L21.5 16" stroke="#005DA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
    );
  }

  return (
    <section className="gallery-slider">
      <div className="swiper gallerySwiper">
        <div className="swiper-wrapper">
          {printSlides(contentData)}
        </div>
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
    </section>
  );
}