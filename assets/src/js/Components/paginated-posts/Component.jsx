import { useEffect, useState, useRef } from "react";
import { __ } from "@wordpress/i18n";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";
import GalleryModal from "../modal/GalleryModal";
import { getThumbnailFromVideo } from "../../Services/CommonBlockFunctions";
import VideoCover from "../common-frontend/VideoCover";

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

  const postItem = (post, index) => {
    const media = (post) => {
      if (post.videoEmbed) {
        const videoThumbnail = getThumbnailFromVideo(post.videoEmbed);
        return (
          <VideoCover videoThumbnail={videoThumbnail} imgAlt={post.title} />
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
    if (!hasGalleryStyle || !textForShowGalleryButton || !response?.posts?.length) return null;

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