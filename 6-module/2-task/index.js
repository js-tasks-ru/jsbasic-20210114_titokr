import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {  
  constructor(product) {
    let pathImageProduct = '/assets/images/products/';
    this.elem = document.createElement('div');
    this.elem.className = 'card';
    let template = `
        <div class="card">
            <div class="card__top">
                <img src="${pathImageProduct+product.image}" class="card__image" alt="product">
                <span class="card__price">€${product.price.toFixed(2)}</span>
            </div>
            <div class="card__body">
                <div class="card__title">${product.name}</div>
                <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
        </div>`;
        
    this.elem.insertAdjacentHTML('afterbegin', template);

    let eventClickAddBtn = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: product.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });

    this.elem.onclick = function(event) {
      let target = event.target;

      while (target != this) {
        if (target.className === 'card__button') {
          target.dispatchEvent(eventClickAddBtn);
          return;
        }
        target = target.parentNode;
      }
    }

  }
}
