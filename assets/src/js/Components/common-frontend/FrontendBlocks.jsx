import { render, Suspense } from "@wordpress/element";
import { createRoot } from "react-dom/client";

/**
 * Dynamically renders the block view in frontend based on the block name.
 * 
 * @param {string} blockName The name of the block to render.
 */
export default function FrontendBlocks(blockName) {
  import(`../${blockName}/Component`).then((module) => {
    const Component = module.default;
    const containers = document.querySelectorAll(`.wp-block-gutenberg-blocks-${blockName}`);

    if (containers.length > 0) {
      containers.forEach((container) => {
        const attributes = { ...container.dataset };

        const RenderBlock = (attributes) => {
          return (
            <Suspense fallback={<div className="wp-block-placeholder" />}>
              <Component
                attributes={attributes}
                is_edit_mode={false}
              />
            </Suspense>
          );
        };

        if (typeof createRoot !== "undefined") {
          const root = createRoot(container);
          root.render(<RenderBlock {...attributes} />);
        } else {
          render(<RenderBlock {...attributes} />, container);
        }
      })
    }
  });
}