document.addEventListener('DOMContentLoaded', () => {

    // Select elements using their new, prefixed IDs
    const openModalBtnProfilePages = document.getElementById('profile-pages-open-btn');
    const closeModalBtnProfilePages = document.getElementById('profile-pages-close-btn');
    const modalOverlayProfilePages = document.getElementById('profile-pages-modal-overlay');
    const modalContentProfilePages = modalOverlayProfilePages.querySelector('.profile-pages-modal-content');

    // The class added to the body is also prefixed
    const bodyOpenClass = 'profile-pages-modal-open';

    let previouslyFocusedElement;

    const openModal = () => {
      previouslyFocusedElement = document.activeElement;
      modalOverlayProfilePages.style.display = 'flex';

      setTimeout(() => {
        document.body.classList.add(bodyOpenClass);
      }, 10);

      setTimeout(() => {
        closeModalBtnProfilePages.focus();
      }, 100);
    };

    const closeModal = () => {
      document.body.classList.remove(bodyOpenClass);

      modalOverlayProfilePages.addEventListener('transitionend', function onTransitionEnd() {
        modalOverlayProfilePages.style.display = 'none';
        modalOverlayProfilePages.removeEventListener('transitionend', onTransitionEnd);
      });

      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    };

    openModalBtnProfilePages.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });

    closeModalBtnProfilePages.addEventListener('click', closeModal);

    modalOverlayProfilePages.addEventListener('click', (event) => {
      if (event.target === modalOverlayProfilePages) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains(bodyOpenClass)) {
        closeModal();
      }
    });

    modalContentProfilePages.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;

      const focusableElements = modalContentProfilePages.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    });
  });