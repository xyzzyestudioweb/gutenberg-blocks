import { useEffect, useState, useRef } from "react";
import { __ } from "@wordpress/i18n";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";
import GalleryModal from "../modal/GalleryModal";

export default function Component({ attributes, is_edit_mode, blockProps }) {
  const { cpt, perPage, className, textForShowGalleryButton } = attributes;

  const [response, setResponse] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const scrollToRef = useRef();

  const useEffectProps = is_edit_mode ? [cpt, perPage] : [pageNum];
  useEffect(() => {
    const timeoutId = setTimeout(() => fetchData(), 300);
    return () => clearTimeout(timeoutId);
  }, useEffectProps)

  const hasGalleryStyle = (!is_edit_mode && className === 'is-style-custom-cpt') || (is_edit_mode && blockProps.className?.includes('is-style-custom-cpt'));

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const currentLang = getCurrentPageLanguageFromPolylang();

      // Fetch the posts from the given cpt and page.
      const apiUrl = `${customBlocks.api.root}/posts/`;
      const params = new URLSearchParams();
      if (cpt) params.append('post_type', cpt);
      if (perPage) params.append('per_page', perPage);
      if (pageNum) params.append('page', pageNum);
      if (currentLang) params.append('lang', currentLang);
      const postsResponse = await fetch(`${apiUrl}?${params.toString()}`);

      if (!postsResponse?.ok) {
        throw new Error("Failed to fetch posts");
      }
      const fetchedData = await postsResponse?.json();
      setResponse(fetchedData.details);
    } catch (error) {
      setResponse([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentPageLanguageFromPolylang = () => {
    let currentLang = '';
    if (is_edit_mode) {
      // get the language of the current page where this block is being used
      currentLang = document.querySelector("#post_lang_choice option[selected=selected]")?.getAttribute("lang");
    } else {
      currentLang = document.querySelector("html").getAttribute("lang");
    }
    if (!currentLang) {
      return "";
    }

    // Get the first part of the language code (e.g. 'en-US' -> 'en' or 'en_US' -> 'es')
    currentLang = currentLang.split(/[-_]/).shift();

    return currentLang;
  }

  const handlePostClick = (e) => {
    if (!hasGalleryStyle || is_edit_mode) {
      return;
    }

    setModalData({
      idSelected: e.currentTarget.dataset.postId ? parseInt(e.currentTarget.dataset.postId) : 0,
      contentData: response.posts,
      handleCloseModal: () => setModalData(null)
    });
  }

  const getThumbnailFromVideo = (youtubeVideo) => {
    const videoId = youtubeVideo.split('embed/')[1].split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  const postItem = (post, index) => {
    const media = (post) => {
      if (post.videoEmbed) {
        const videoThumbnail = getThumbnailFromVideo(post.videoEmbed);
        return (
          <div class="video-thumbnail">
            <img loading="lazy" width="350" height="197" src={videoThumbnail} className="attachment-large size-large wp-post-image" alt={post.title} />
            {/* Play Icon */}
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="43.2469" rx="21.6234" fill="#FFE000" />
              <path d="M18.6167 16.0084C17.8775 15.5791 16.85 16.0639 16.85 17.0082V26.2387C16.85 27.183 17.8775 27.6677 18.6166 27.2385C18.6166 27.2385 18.6167 27.2385 18.6167 27.2385L26.5701 22.6237C26.5702 22.6236 26.5703 22.6235 26.5704 22.6235C26.7465 22.5226 26.8928 22.3771 26.9945 22.2015C27.0964 22.0259 27.15 21.8265 27.15 21.6234C27.15 21.4204 27.0964 21.221 26.9945 21.0454C26.8928 20.8699 26.7465 20.7243 26.5705 20.6235C26.5704 20.6234 26.5702 20.6233 26.5701 20.6232L18.6167 16.0084ZM18.6167 16.0084L18.5413 16.1381L18.6166 16.0084L18.6167 16.0084ZM18.4001 25.572V17.6749L25.2066 21.6234L18.4001 25.572Z" fill="#005DA1" stroke="#005DA1" strokeWidth="0.3" />
            </svg>
          </div>
        )
      }

      if (post.image) {
        return (
          <img loading="lazy" width="350" height="197" srcSet={post.srcset ? post.srcset : ''} src={post.image} className="attachment-large size-large wp-post-image" alt={post.title} />
        )
      }

      return (
        <span href="#" className="">
          <span className="skeleton__content"></span>
        </span>
      )
    };

    // if block has the gallery block style, then the post.url will be # and will add the class galleryModal to the li which will create and open the modal on click.
    const postURL = hasGalleryStyle ? null : post.url;

    return (
      <li key={index} data-post-id={post.id} className="single-post-container" onClick={handlePostClick}>
        <div className={`wp-block-latest-posts__featured-image`}>
          <a href={postURL} aria-label={post.title} target="_self" rel="noopener noreferrer">
            {media(post)}
          </a>
        </div>
        <a className="wp-block-latest-posts__post-title" href={postURL} target="_self" rel="noopener noreferrer" >
          {post.title}
        </a>
        <time dateTime={post.date} className="wp-block-latest-posts__post-date">
          {post.date}
        </time>
        <div className="wp-block-latest-posts__post-excerpt">
          {post.excerpt}
        </div>
        <div className="wp-block-buttons">
          <div className="wp-block-button is-style-fill wp-block-button__clear-style--text-icon">
            <a className="wp-block-button__link has-blue-color has-transparent-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button" href={postURL} target="_self" rel="noopener noreferrer" >
              <span>{__("More information", "gutenberg-blocks")}</span>
              <img decoding="async" style={{ width: "43px" }} src="/wp-content/plugins/gutenberg-blocks/assets/build/img/icons/Plus-blue-1.svg" />
              <svg viewBox="0 0 43 43" width="43" height="43" fill="none" xmlns="http://www.w3.org/2000/svg" ><rect width="43" height="43" rx="21.5" fill="#FFE000"></rect>
                <path d="M22.5 16V20.5H27V22.5H22.5V27H20.5V22.5H16V20.5H20.5V16H22.5Z" fill="#005DA1" ></path>
              </svg>
            </a>
          </div>
        </div>
      </li>
    )
  }

  const renderData = () => {
    if (isLoading) {
      return (
        new Array(parseInt(perPage)).fill(null).map((_, index) => {
          return (<Skeleton key={index} />)
        })
      );
    }

    if (!response?.posts?.length && is_edit_mode) {
      return (
        <div className="single-post-container single-post-container--empty">
          <div className="single-post-container__heading">
            <span>⚠️</span>
            <div className="post-text-container">
              <p>{__('No posts found for the selected arguments. Please change the "CPT" or the "Posts per page" field from the right panel', "gutenberg-blocks")}</p>
            </div>
          </div>
        </div>
      );
    }

    if (!response?.posts?.length) {
      return null;
    }

    return response?.posts.map((post, index) => (
      postItem(post, index)
    ))
  }

  const renderPagination = () => {
    if (isLoading || !response || response.total_posts <= perPage) {
      return;
    }
    return (
      <Pagination perPage={perPage} page={pageNum} totalPosts={response?.total_posts} totalPages={response?.total_pages} isEditMode={is_edit_mode} setPage={setPageNum} scrollToRef={scrollToRef} />
    )
  }

  const renderButton = () => {
    if (!hasGalleryStyle || !textForShowGalleryButton) return null;

    return (

      <div className="wp-block-buttons wp-block-buttons--show-gallery">
        <div className="wp-block-button is-style-outline wp-block-button__outline-style--text">
          <button className="wp-block-button__link has-blue-color has-text-color has-link-color has-text-align-left wp-element-button" onClick={handlePostClick}>{textForShowGalleryButton}</button>
        </div>
      </div>

    )
  }


  return (
    <>
      {renderButton()}
      <ul className="wp-block-latest-posts__list is-grid columns-3 has-dates alignwide wp-block-latest-posts" ref={scrollToRef}>
        {renderData()}
      </ul>
      {renderPagination()}
      {modalData && (<GalleryModal {...modalData} />)}
    </>
  )
}