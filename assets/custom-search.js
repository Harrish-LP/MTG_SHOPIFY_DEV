document.addEventListener('DOMContentLoaded', function() {
  // Select all the necessary elements from the DOM
  const track = document.querySelector('.course-tags-track');
  const prevBtn = document.querySelector('.nav-button.prev');
  const nextBtn = document.querySelector('.nav-button.next');

  // If any element is missing, exit to prevent errors
  if (!track || !prevBtn || !nextBtn || track.children.length === 0) {
    // Hide nav controls if carousel isn't needed or is broken
    if (prevBtn && nextBtn) {
        prevBtn.parentElement.style.display = 'none';
    }
    return;
  }
  
  // --- CONFIGURATION & STATE ---
  const totalItems = track.children.length;
  let currentIndex = 0;
  let itemsToShow = getItemsToShow();
  let maxIndex = totalItems - itemsToShow;
  
  // --- FUNCTIONS ---
  
  /**
   * Reads the --visible-items CSS variable to make JS responsive.
   * @returns {number} The number of items visible at the current screen size.
   */
  function getItemsToShow() {
    const rootStyles = getComputedStyle(document.documentElement);
    return parseInt(rootStyles.getPropertyValue('--visible-items'), 10);
  }

  /**
   * Updates the carousel's position and button states.
   */
  function updateCarousel() {
    // This logic works because offsetWidth correctly reads the
    // new fluid width of the item from the DOM.
    const itemWidth = track.firstElementChild.offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap, 10);
    const offset = currentIndex * (itemWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
    
    // Disable/enable buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  /**
   * Recalculates layout values on screen resize.
   */
  function handleResize() {
    itemsToShow = getItemsToShow();
    maxIndex = totalItems - itemsToShow;

    // Hide nav controls if all items are visible
    if(totalItems <= itemsToShow) {
        prevBtn.parentElement.style.display = 'none';
    } else {
        prevBtn.parentElement.style.display = 'block';
    }

    // If current index is out of bounds after resize, clamp it
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    updateCarousel();
  }

  // --- EVENT LISTENERS ---
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  window.addEventListener('resize', handleResize);

  // --- INITIALIZATION ---
  handleResize(); // Initial setup call
});