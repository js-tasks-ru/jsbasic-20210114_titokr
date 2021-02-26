import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {  
  constructor(product) {
    let pathImageProduct = '/assets/images/products/';
    this.elem = document.createElement('div');
    this.elem.className = 'card';
    this.id = product.id;
    let template = `
            <div class="card__top">
                <img src="${pathImageProduct+product.image}" class="card__image" alt="product">
                <span class="card__price">€${product.price.toFixed(2)}</span>
            </div>
            <div class="card__body">
                <div class="card__title">${product.name}</div>
                <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>`;
        
    this.elem.insertAdjacentHTML('afterbegin', template);

    this.elem.addEventListener('click', this.onClick)

  }

  onClick = (event) => {
    let target = event.target;
    let eventClickAddBtn = new CustomEvent("product-add", {detail: this.id, bubbles: true});

    let btnAdd = target.closest('.card__button');

    if (btnAdd !== null) {
      btnAdd.dispatchEvent(eventClickAddBtn);      
    }
  } 
}
