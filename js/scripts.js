document.addEventListener('DOMContentLoaded', function() {
  const caroussel = document.querySelector('.imageCaroussel');
  const carousselFS = document.querySelector('.imageCaroussel.FS');
  const container = document.querySelector('.carouselContainer');
  const containerFS = document.querySelector('.carouselContainer.FS');
  const leftArrow = document.querySelector('.leftArrow');
  const rightArrow = document.querySelector('.rightArrow');

  const scrollAmount = document.querySelector('.gameImg').clientWidth + 20;

  leftArrow.addEventListener('click', () => {
    caroussel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    caroussel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  const checkScroll = () => {
    const maxScrollLeft = caroussel.scrollWidth - caroussel.clientWidth;
    if (caroussel.scrollLeft > 0) {
      container.classList.add('scrollable-left');
      leftArrow.classList.add('scrollable');
    } else {
      container.classList.remove('scrollable-left');
      leftArrow.classList.remove('scrollable');
    }
    if (caroussel.scrollLeft < maxScrollLeft) {
      container.classList.add('scrollable-right');
      rightArrow.classList.add('scrollable');
    } else {
      container.classList.remove('scrollable-right');
      rightArrow.classList.remove('scrollable');
    }
  };

  checkScroll();
  
  caroussel.addEventListener('scroll', checkScroll);

  const imageOverlay = document.querySelector('.imageOverlay');
  const closeOverlay = document.querySelector('.closeOverlay');

  function openOverlay(startIndex) {
    imageOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    carousselFS.setAttribute('tabindex', '0');
    carousselFS.focus();

    const imageWidth = carousselFS.querySelector('.gameImg').offsetWidth + 20;
    const imageOffset = imageWidth * startIndex;
    const halfImageWidth = imageWidth / 2;
    const scrollTo = imageOffset - (containerFS.clientWidth / 2) + halfImageWidth;

    carousselFS.scrollLeft = scrollTo;

    scrollAmountFS = imageWidth;
  }

  function closeOverlayFunc() {
    imageOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  document.querySelectorAll('.gameImg').forEach(img => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      if (imageOverlay.style.display === 'flex') return;

      openOverlay(this.getAttribute('data-index'));
    });
  });

  closeOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    closeOverlayFunc();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      if (imageOverlay.style.display === 'flex') {
        closeOverlayFunc();
      }
    }
  });

  carousselFS.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      carousselFS.scrollBy({ left: scrollAmountFS, behavior: 'smooth' });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      carousselFS.scrollBy({ left: -scrollAmountFS, behavior: 'smooth' });
    }
  });

  const leftArrowFS = document.querySelector('.imageOverlay .leftArrow');
  const rightArrowFS = document.querySelector('.imageOverlay .rightArrow');

  let scrollAmountFS = document.querySelector('.imageOverlay .gameImg').clientWidth;

  leftArrowFS.addEventListener('click', (e) => {
    carousselFS.scrollBy({ left: -scrollAmountFS, behavior: 'smooth' });
    carousselFS.setAttribute('tabindex', '0');
    carousselFS.focus();
  });

  rightArrowFS.addEventListener('click', (e) => {
    carousselFS.scrollBy({ left: scrollAmountFS, behavior: 'smooth' });
    carousselFS.setAttribute('tabindex', '0');
    carousselFS.focus();
  });

  const checkScrollFS = () => {
    const maxScrollLeft = carousselFS.scrollWidth - carousselFS.clientWidth;
    if (carousselFS.scrollLeft > 0) leftArrowFS.classList.add('scrollable');
    else leftArrowFS.classList.remove('scrollable');

    if (carousselFS.scrollLeft < maxScrollLeft) rightArrowFS.classList.add('scrollable');
    else rightArrowFS.classList.remove('scrollable');
  };

  checkScrollFS();
  
  carousselFS.addEventListener('scroll', checkScrollFS);
});