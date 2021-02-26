import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.pathImageIcons = '/assets/images/icons/';
    this.titleElem = null;
    this.bodyElem = null;
    this.elem = document.createElement('div');
    this.elem.className = 'modal';
    this.template = `
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="${this.pathImageIcons}cross-icon.svg" alt="close-icon" />
            </button>

          </div>

        </div>

      </div>`;
    this.elem.insertAdjacentHTML('afterbegin', this.template);
    this.elem.addEventListener('click', this.modalClick);
  }

  setTitle(title) {
    //debugger;
    if (this.titleElem) {
      this.titleElem.innerHTML = title;
    } else {
      this.titleElem = document.createElement('div');
      this.titleElem.className = 'modal__title';
      this.titleElem.insertAdjacentHTML('afterbegin', title);
    }
    this.elem.querySelector('.modal__header').append(this.titleElem);
  }

  setBody(body) {
    if (this.bodyElem) {
      this.bodyElem.innerHTML = '';
    } else {
      this.bodyElem = document.createElement('div');
      this.bodyElem.className = 'modal__body';
    }
    this.bodyElem.append(body);
    this.elem.querySelector('.modal__inner').append(this.bodyElem);
  }

  open() {
    let body = document.querySelector('body');
    body.classList.add('is-modal-open');
    body.append(this.elem);
    document.addEventListener('keydown', this.keyDown);
  }

  close() {
    let body = document.querySelector('body');
    body.classList.remove('is-modal-open');  
    this.elem.remove();
    document.removeEventListener('keydown', this.keyDown);
  }

  modalClick = (event) => {
    let target = event.target;

    if (target.closest('.modal__close') || target.closest('.modal__overlay')) {
      this.close();
    }
  }

  keyDown = (event) => {
    if (event.code === 'Escape') {
      this.close();      
    }
  }
}
