export default function VideoCover({ videoThumbnail, imgAlt }) {
  return (
    <div className="video-thumbnail">
      <img loading="lazy" width="350" height="197" src={videoThumbnail} className="attachment-large size-large wp-post-image" alt={imgAlt} />
      {/* Play Icon */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="43.2469" rx="21.6234" fill="#FFE000" />
        <path d="M18.6167 16.0084C17.8775 15.5791 16.85 16.0639 16.85 17.0082V26.2387C16.85 27.183 17.8775 27.6677 18.6166 27.2385C18.6166 27.2385 18.6167 27.2385 18.6167 27.2385L26.5701 22.6237C26.5702 22.6236 26.5703 22.6235 26.5704 22.6235C26.7465 22.5226 26.8928 22.3771 26.9945 22.2015C27.0964 22.0259 27.15 21.8265 27.15 21.6234C27.15 21.4204 27.0964 21.221 26.9945 21.0454C26.8928 20.8699 26.7465 20.7243 26.5705 20.6235C26.5704 20.6234 26.5702 20.6233 26.5701 20.6232L18.6167 16.0084ZM18.6167 16.0084L18.5413 16.1381L18.6166 16.0084L18.6167 16.0084ZM18.4001 25.572V17.6749L25.2066 21.6234L18.4001 25.572Z" fill="#005DA1" stroke="#005DA1" strokeWidth="0.3" />
      </svg>
    </div>
  );
}