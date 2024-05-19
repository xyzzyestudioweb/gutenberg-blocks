import { render, Suspense } from "@wordpress/element";
import { createRoot } from "react-dom/client";
import Modal from "../Components/modal/Modal";

/**
 * Dynamically renders a modal component in frontend based on the trigger button which has a class with one of the valid modal names (add more names in the modalAvailableNames variable).
 * If exist one or more of those trigger buttons in DOM this will automatically create a modalContainer element next to it, and append one and only one modal to the DOM inside of its modalContainer. It will work also for Component that fetches data from the server and has pagination and needs to render a modal with that data.
 * 
 * USAGE: To create a button that triggers a modal, you only need to add to the button a class with one of the available modal names stored in the modalAvailableNames variable (e.g. "galleryModal"). And this function needs to be imported where the button is and called in a useEffect hook, just like we did in wp-content/plugins/gutenberg-blocks/app/includes/CustomBlocks/src/paged-posts/Component.jsx.
 */
export default function InitModals(contentData = {}) {
  // This must be the classes of the trigger buttons of all the modal types, then will be automatically added as the id of the modal if its defined here.
  const modalAvailableNames = ["galleryModal", "infoModal"];
  // Get all the trigger buttons of all the modal types.
  const triggerButtons = modalAvailableNames.flatMap((modalName) => Array.from(document.querySelectorAll(`.${modalName}`)));
  // Keep a set of rendered modals to avoid rendering the same modal multiple times.
  const renderedModals = new Set();
  const classForModalContainer = "modalContainer";

  /**
   * Initialize trigger buttons and close buttons for all Modal types (in modalAvailableNames).
   * Append modals to the DOM next to its trigger button for all Modal types.
   */
  const triggerModals = (contentData) => {
    let modalName = "";
    triggerButtons.length && triggerButtons.forEach((triggerButton, index) => {
      // If triggerButton exists and has class one of the modalAvailableNames (e.g. "sliderModal") then select the modalName in a const to later append the modal to the DOM next to the trigger button:
      const containsClass = triggerButton && modalAvailableNames.some((mName) => {
        let contains = triggerButton.classList.contains(mName);
        if (contains) {
          modalName = mName;
        }
        return contains;
      });

      const modalExistsInDOM = document.getElementById(modalName);
      if (modalExistsInDOM && index !== 0) {
        return;
      }

      // if there is no other modal with the modalName as id in the DOM then render the modal component.
      if (containsClass && !renderedModals.has(modalName)) {
        // Create an div element, assign it to modalContainer and append modalContainer next to triggerButton.
        clearContainers(triggerButton, classForModalContainer);
        let modalContainer = document.createElement("div");
        modalContainer.classList.add(classForModalContainer);
        triggerButton.insertAdjacentElement("afterend", modalContainer);
        modalContainer = triggerButton.parentElement.querySelector(".modalContainer");

        // Render the modal component inside the modalContainer and init the trigger and cancel events.
        renderModal(modalName, modalContainer, modalAvailableNames, triggerButtons, contentData);
        renderedModals.add(modalName);
      }
    });
  }

  /**
   * Clear all the modal containers next to the trigger button before rendering a new modal.
   */
  const clearContainers = (triggerButton, classForModalContainer) => {
    const modalContainers = Array.from(triggerButton.parentElement.querySelectorAll(`.${classForModalContainer}`));
    modalContainers.length && modalContainers.forEach((modalContainer) => {
      modalContainer.remove();
    });
  }

  /**
   * Create the Modal element and attach it to the container which is inside the trigger button.
   */
  const renderModal = (modalName, modalContainer, modalAvailableNames, triggerButtons, contentData) => {

    const RenderComponent = ({ modalName, modalAvailableNames, triggerButtons, contentData = {} }) => {
      return (
        <Suspense fallback={<div className="wp-block-placeholder" />}>
          <Modal modalName={modalName} modalAvailableNames={modalAvailableNames} triggerButtons={triggerButtons} contentData={contentData} />
        </Suspense>
      );
    };

    if (modalContainer && modalContainer instanceof Element) {
      if (typeof createRoot !== "undefined") {
        const root = createRoot(modalContainer);
        root.render(<RenderComponent modalName={modalName} modalAvailableNames={modalAvailableNames} triggerButtons={triggerButtons} contentData={contentData} />);
      } else {
        render(<RenderComponent modalName={modalName} modalAvailableNames={modalAvailableNames} triggerButtons={triggerButtons} contentData={contentData} />, modalContainer);
      }
    } else {
      console.error('modalContainer is not a valid DOM element');
    }
  }

  return triggerModals(contentData);
}