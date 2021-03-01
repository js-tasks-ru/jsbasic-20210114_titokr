import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    let pathImageIcons = '/assets/images/icons/';
    let template = `    
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="${pathImageIcons}angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">`;
    for (let menuItem of categories) {
      template += `<a href="#" class="ribbon__item" data-id="${menuItem.id}">${menuItem.name}</a>`;
    }
    template += `    
      </nav>
      <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="${pathImageIcons}angle-icon.svg" alt="icon">
        </button>
      </div>`;
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';
    this.elem.insertAdjacentHTML('afterbegin', template);
    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
    //this.value = this.elem.querySelector('.ribbon__item_active').getAttribute('data-id');

    this.inner = this.elem.querySelector('.ribbon__inner');
    this.btnRight = this.elem.querySelector('.ribbon__arrow_right');
    this.btnLeft = this.elem.querySelector('.ribbon__arrow_left');

    this.btnLeft.addEventListener('click', this.btnLeftClick);
    this.btnRight.addEventListener('click', this.btnRightClick);
    this.inner.addEventListener('scroll', this.scroll);

    this.elem.addEventListener('click', this.menuClick);

  }
  btnLeftClick = () => {
//    console.log('move left');
    this.inner.scrollBy(-350, 0);
    this.btnRight.classList.add('ribbon__arrow_visible');
  }

  btnRightClick = () => {
//    console.log('move right');
    this.inner.scrollBy(350, 0);
    this.btnLeft.classList.add('ribbon__arrow_visible');
  }

  scroll = () => {
    if (this.inner.scrollLeft === 0) {
      this.btnLeft.classList.remove('ribbon__arrow_visible');
    }

    let isRightBtnHidden = this.inner.scrollWidth - this.inner.scrollLeft - this.inner.clientWidth <= 0;

    if (isRightBtnHidden) {

      this.btnRight.classList.remove('ribbon__arrow_visible');

    }    
  }

  menuClick = (event) => {
    let targetMenuItem = event.target.closest('.ribbon__item');
    if (targetMenuItem) {

      targetMenuItem.dispatchEvent(new CustomEvent('ribbon-select', {detail: targetMenuItem.dataset.id, bubbles: true}));
//      console.log('event custom');      
    }
  }
}
