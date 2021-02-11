import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    let pathImageIcons = '/assets/images/icons/';
    let pathImagesSlide = '/assets/images/carousel/';
    this.elem = document.createElement('div');
    this.elem.className = 'carousel';
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
    this.elem.insertAdjacentHTML('afterbegin', template);

    let slider = this.elem;
    let inner = slider.querySelector('.carousel__inner');
    let btnPrev = slider.querySelector('.carousel__arrow_left');
    let btnNext = slider.querySelector('.carousel__arrow_right');
    let widthSlide;
    let currentNumSlider = 0;
    let countSlides = inner.children.length;

    function setSlide() {
      widthSlide = inner.children[0].offsetWidth;
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
      setSlide();
    });

    btnNext.addEventListener('click', () => {
      //debugger;      
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

    document.addEventListener('product-add', (event) => { // ловим наше кастомное событие и проверяем - то ли мы кладем в корзину )))
      console.log('Custom event - add in cart', event.detail);
    })

    this.elem.onclick = function(event) {
      let target = event.target;
      let targetAddBtn = null;
/* в начале я брал id из слайда который видно сейчас на экране и тест не проходил, пока не заглянул как происходит тест и не изменил код так чтобы id брался именно из слайда в котором произошел клик,
   невзирая на то что этот клик в реальности сделать не получится ибо слайд не видно

      while (target != this) {
        if (target.className === 'carousel__button') {
          target.dispatchEvent(new CustomEvent("product-add", {
              detail: inner.children[currentNumSlider].dataset.id, // Уникальный идентификатора товара берем из слайда который сейчас на экране
              bubbles: true
          }));
          return;
        }
        target = target.parentNode;
      }
*/

/*************************************** */
      while (target != this) {
        if (target.className === 'carousel__button') {
          targetAddBtn = target;
        }
        if (target.className === 'carousel__slide' && targetAddBtn) {
          target.dispatchEvent(new CustomEvent("product-add", {
              detail: target.dataset.id, // Уникальный идентификатора товара берем из слайда в котором произошел клик
              bubbles: true
          }));
          return;
        }
        target = target.parentNode;
      }
/*****************************************/      
    }

  }
}
