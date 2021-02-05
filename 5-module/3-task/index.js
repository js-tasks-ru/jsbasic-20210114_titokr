function initCarousel() {
  // ваш код...
  let slider = document.querySelector('.carousel'),
      inner = slider.querySelector('.carousel__inner'),
      btnPrev = slider.querySelector('.carousel__arrow_left'),
      btnNext = slider.querySelector('.carousel__arrow_right'),
      widthSlide = inner.children[0].offsetWidth,
      currentNumSlider = 0,
      countSlides = inner.children.length;

  function setSlide() {
    inner.style.transform = 'translateX(-' + currentNumSlider * widthSlide + 'px)';
  }

  btnPrev.style.display = 'none';
  for (let elem of inner.children) {  // чтобы при ширине окна меньше ширины контейнера - убрать баг "выпирания" картинки за пределы слайда
    elem.style.overflow = 'hidden';
  }
  if (countSlides <= 1) {
    btnNext.style.display = 'none';
  }

  window.addEventListener('resize', () => {
    widthSlide = inner.children[0].offsetWidth;
    setSlide();
  });

  btnNext.addEventListener('click', () => {
    currentNumSlider++;
    if (currentNumSlider < countSlides - 1) {      
      btnPrev.style.display = '';
      setSlide();
    } else {
      btnPrev.style.display = '';
      btnNext.style.display = 'none';
      setSlide();
    }
  });

  btnPrev.addEventListener('click', () => {
    currentNumSlider--;
    if (currentNumSlider > 0) {
      btnNext.style.display = '';
      setSlide();
    } else {
      btnNext.style.display = '';
      btnPrev.style.display = 'none';
      setSlide();
    }
  });
}
