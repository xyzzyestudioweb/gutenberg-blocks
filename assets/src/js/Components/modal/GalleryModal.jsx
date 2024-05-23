import { useEffect, useRef } from "react";
import { __ } from "@wordpress/i18n";
import { getThumbnailFromVideo } from "../../Services/CommonBlockFunctions";
import VideoCover from "../common-frontend/VideoCover";

/** 
 * Render the modal and its content (the slider) for Gallery Modal.
*/
export default function GalleryModal({ idSelected, contentData = [], handleCloseModal }) {

  const dialogRef = useRef();
  const sliderRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const dialogElement = dialogRef.current;
    dialogElement.showModal();
    initSwiper(sliderRef.current, thumbRef.current);
  });

  const initSwiper = (slider, thumbs) => {

    const swiperThumbs = new Swiper(thumbs, {
      spaceBetween: 16,
      slidesPerView: 3,
      loop: false,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      grabCursor: true,
    });

    const swiper = new Swiper(slider, {
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });

    contentData.forEach((item, i) => {
      if (item.id === idSelected) {
        swiper.slideToLoop(i, 0);
        return;
      }
    }
    );
  }

  const printSlides = (isThumbs = false) => {
    const media = (post, index) => {
      if (post.videoEmbed) {
        if (isThumbs) {
          const videoThumbnail = getThumbnailFromVideo(post.videoEmbed);
          return (
            <VideoCover videoThumbnail={videoThumbnail} imgAlt={post.title} />
          )
        } else {
          return <div className="video-embed slide-background" dangerouslySetInnerHTML={{ __html: post.videoEmbed }}></div>
        }
      }

      if (post.image) {
        return (
          <img loading={index !== 0 ? 'lazy' : ''} srcSet={post.srcset ? post.srcset : ''} className="slide-background" src={post.image} alt={post.title} />
        )
      }

      return (
        <span>
          <span className="skeleton__content"></span>
        </span>
      )
    };

    return contentData.map((post, index) => (
      <div data-id={post.id} className="swiper-slide" key={index}>
        <div className="slide-wrapper">
          {!isThumbs ? (
            <div className="slide-heading">
              <h5 className="slide-title">{post.title}</h5>
              <p className="slide-subtitle">{post.excerpt}</p>
            </div>
          ) : null}
          <div className="slide-body">
            {media(post, index)}
          </div>
          {!post.videoEmbed && post.image && !isThumbs ? (
            <div className="slide-footer">
              <div className="file__link-container wp-block-buttons">
                <div className="wp-block-button is-style-fill wp-block-button__clear-style--text-icon">
                  <a href={post.image} download={post.title} target="_blank" rel="noopener noreferrer" className="wp-block-button__link has-blue-color has-transparent-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button">
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
    ));
  }

  const modalContent = () => {
    return (
      <section className="gallery-slider">
        <div ref={sliderRef} className="gallerySwiper swiper">
          <div className="swiper-wrapper">
            {printSlides()}
          </div>
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
        </div>
        <div ref={thumbRef} className="swiper gallerySwiperThumbs">
          <div className="swiper-wrapper">
            {printSlides(true)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <dialog ref={dialogRef} className="modals galleryModal">
      <div className="modals__content">
        <menu>
          <button className="cancelButton" type="reset" onClick={handleCloseModal}>
            <img style={{ width: "18px" }} src="/wp-content/plugins/gutenberg-blocks/assets/build/img/icons/close.svg" />
          </button>
        </menu>
        {modalContent()}
      </div>
    </dialog>
  );
}