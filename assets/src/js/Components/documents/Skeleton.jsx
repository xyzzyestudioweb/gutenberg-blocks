import { __ } from "@wordpress/i18n";

export default function Skeleton() {
  return (
    <div className="single-file-container single-file-container--skeleton skeleton-component">
      <div className="single-file-container__heading">
        <span className="file-icon skeleton__content"></span>
        <div className="file-text-container">
          <span className="skeleton__content"></span>
        </div>
      </div>
      <div className="file__link-container wp-block-buttons">
        <div className="wp-block-button is-style-fill wp-block-button__clear-style--text-icon">
          <span className="wp-block-button__link has-blue-color has-transparent-background-color has-text-color has-background has-link-color has-text-align-left wp-element-button">
            <span className="skeleton__content">{__("Download", "gutenberg-blocks")}</span>
            <span className="skeleton__content skeleton__content--icon"></span>
          </span>
        </div>
      </div>
    </div>
  )
}