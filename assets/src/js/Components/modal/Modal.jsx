import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import GalleryModal from "./GalleryModal";

/** 
 * Modal component.
 * 
 * To render a Modal component in frontend you need to add a trigger button in DOM with a unique class that is one of the defined modalAvailableNames.
 */
export default function Modal({ modalName, modalAvailableNames, triggerButtons, contentData = {} }) {

  const [idSelected, setIdSelected] = useState(null);

  useEffect(() => {
    const dialogElement = document.getElementById(modalName);
    cancelModal(dialogElement);
    cancelOnBackgroundClick(dialogElement);
    triggerIndependentModal(triggerButtons, modalName);
  }, []);

  /**
   * Close the modal when the cancel button is clicked.
   */
  const cancelModal = (dialogElement) => {
    const cancelButton = dialogElement && dialogElement.querySelector(".cancelButton");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        dialogElement.close();
        document.body.style.overflowY = "auto";
      });
    }
  }

  /**
   * Close the modal when the background is clicked.
   **/
  const cancelOnBackgroundClick = (dialogElement) => {
    dialogElement.addEventListener('click', function (event) {
      if (event.target === dialogElement) {
        dialogElement.close();
        document.body.style.overflowY = "auto";
      }
    });
  }

  /**
  * Open the modal when the trigger button is clicked.
  * And, open the modal when any other trigger button with the same class is clicked.
  * 
  *  Since the modal is attached only to the first triggerButton found in DOM with the modalName class, other trigger buttons with the same class that may exist in the DOM also needs to trigger the modal. So, this function is for the main one and also for those other trigger buttons.
  */
  const triggerIndependentModal = (triggerButtons, modalName) => {
    triggerButtons.length && triggerButtons.forEach((tb) => {
      let contains = tb.classList.contains(modalName);
      if (contains) {

        tb.addEventListener("click", function () {
          const postID = tb.dataset?.id;
          setIdSelected(postID);
          // find the dialog element by the modalName and show it.
          const dialogElement = document.getElementById(modalName);
          // TODO: if idSelected is not null then change the starting item in the slider of the gallery modal.
          dialogElement && dialogElement.showModal();
          document.body.style.overflowY = "hidden";
        });

      }
    });
  }

  /**
   * If modalName is one of the modalAvailableNames render the modal
   */
  const renderModal = () => {
    if (modalAvailableNames.includes(modalName)) {
      return (
        <dialog className="modals" id={modalName}>
          <div className="modals__content">
            <menu>
              <button className="cancelButton" type="reset">
                <img style={{ width: "18px" }} src="/wp-content/plugins/gutenberg-blocks/assets/build/img/icons/close.svg" />
              </button>
            </menu>
            {modalContent()}
          </div>

        </dialog>
      );
    }

    return null;
  }

  /**
   * Render the modal content based on the modalName.
   * E.g. If modalName is "galleryModal" then render the gallery modal content. Else, any other modal content we want to render.
   */
  const modalContent = () => {
    // Render the gallery modal content.
    if (modalName === "galleryModal" && modalAvailableNames.includes("galleryModal")) {
      return (
        <GalleryModal idSelected={idSelected} contentData={contentData} />
      );
    }

    // Render the info modal content (or other modal to render)
    if (modalName === "infoModal" && modalAvailableNames.includes("infoModal")) {
      return (
        <section>
          <h1>Info Modal</h1>
          <p>Some info about the modal.</p>
        </section>
      );
    }

    return null;
  }

  return (
    <>
      {renderModal()}
    </>
  );
}