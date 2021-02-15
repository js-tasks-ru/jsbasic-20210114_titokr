import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    let pathImageIcons = '/assets/images/icons/';
    let pathImagesSlide = '/assets/images/carousel/';
    let template = `
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">`;

    for (let slide of slides) {
      template += `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="${pathImagesSlide + slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="${pathImageIcons}plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
    }
    template += `</div>`;
    this.elem = document.createElement('div');
    this.elem.className = 'carousel';
    this.elem.insertAdjacentHTML('afterbegin', template);

    this.slider = this.elem;
    this.inner = this.elem.querySelector('.carousel__inner');
    this.btnPrev = this.elem.querySelector('.carousel__arrow_left');
    this.btnNext = this.elem.querySelector('.carousel__arrow_right');
    this.currentNumSlider = 0;
    this.countSlides = this.inner.children.length;
    this.btnPrev.style.display = 'none';

    this.setBegginerStyle();
    addEventListener('resize', this.resize);
    this.btnNext.addEventListener('click', this.btnNextClick);
    this.btnPrev.addEventListener('click', this.btnPrevClick);
    this.elem.addEventListener('click', this.slideClick);
  }

  // METODS ***************************************************

  setBegginerStyle() {
    for (let elem of this.inner.children) {  // чтобы при ширине окна меньше ширины контейнера - убрать баг "выпирания" картинки за пределы слайда
      elem.style.overflow = 'hidden';
    }
    if (this.countSlides <= 1) {
      this.btnNext.style.display = 'none';
    }
  }

  setSlide() {
    this.widthSlide = this.inner.children[0].offsetWidth;
    this.inner.style.transform = 'translateX(-' + this.currentNumSlider * this.widthSlide + 'px)';
  }

  resize = () => {
    this.setSlide();
  }

  btnNextClick = () => {
    this.currentNumSlider++;
    if (this.currentNumSlider < this.countSlides - 1) {      
      this.btnPrev.style.display = '';
      this.setSlide();
    } else {
      this.btnPrev.style.display = '';
      this.btnNext.style.display = 'none';
      this.setSlide();
    }
  }

  btnPrevClick = () => {
    this.currentNumSlider--;
    if (this.currentNumSlider > 0) {
      this.btnNext.style.display = '';
      this.setSlide();
    } else {
      this.btnNext.style.display = '';
      this.btnPrev.style.display = 'none';
      this.setSlide();
    }
  }

  slideClick = (event) => {
    let targetAddBtn = event.target.closest('.carousel__button');

    if (targetAddBtn) {
      let targetSlide = targetAddBtn.closest('.carousel__slide');
      targetSlide.dispatchEvent(new CustomEvent("product-add", {detail: targetSlide.dataset.id, bubbles: true}));
    }
  }
}
