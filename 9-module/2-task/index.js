import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    let carouselElement = document.body.querySelector('[data-carousel-holder]');
    carouselElement.append(this.carousel.elem);

    this.cartIcon = new CartIcon();
    let cartIconElem = document.querySelector('[data-cart-icon-holder]');
    cartIconElem.append(this.cartIcon.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonElem = document.querySelector('[data-ribbon-holder]');
    ribbonElem.append(this.ribbonMenu.elem);

    this.cart = new Cart(this.cartIcon);

  }

  async render() {
    // ... ваш код
    await fetch('products.json').then(response => {
      return response.json();
    }).then(json => {
      this.products = json;
      this.initialize();
    }).catch((err) => {
      console.log('Fetch problem: ' + err.message);
    });
  }

  initialize() {
    this.addSlider();
    this.productGrid = new ProductGrid(this.products);
    let productsGridElem = document.querySelector('[data-products-grid-holder]');
    productsGridElem.innerHTML = '';
    productsGridElem.append(this.productGrid.elem);
    this.productGrid.updateFilter({});    
    let bodyElem = document.querySelector('body');
    bodyElem.addEventListener('product-add', this.eventAdd);
    bodyElem.addEventListener('slider-change', this.eventChangeSlider);
    bodyElem.addEventListener('ribbon-select', this.eventRibbonSelect);
    bodyElem.querySelector('.filters').addEventListener('change', this.eventCheckboxChange);
  }
  addSlider() { // ищем в товарах блюдо с максимальным кол-вом специй и калибруем слайдер
    let maxSpiciness = 0;
    this.products.forEach(item => {
      maxSpiciness = (item.spiciness > maxSpiciness) ? item.spiciness : maxSpiciness;
    });
    this.stepSlider = new StepSlider({
      steps: maxSpiciness + 1,
      value: maxSpiciness
    });
    let stepSliderElem = document.querySelector('[data-slider-holder]');
    stepSliderElem.append(this.stepSlider.elem);
  }
  eventAdd = (event) => {
    let product = this.products.find(item => item.id === event.detail);
    this.cart.addProduct(product);
  }
  eventChangeSlider = (event) => {
    let maxSpiciness = event.detail;
    //debugger;

    this.productGrid.updateFilter({
      maxSpiciness: maxSpiciness
    });
  }
  eventRibbonSelect = (event) => {
    //debugger;
    this.ribbonMenu.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
    this.ribbonMenu.elem.querySelector(`[data-id="${event.detail}"]`).classList.add('ribbon__item_active');
    this.ribbonMenu.value = event.detail;
    this.productGrid.updateFilter({
      category: event.detail
    }, this.products);
  }
  eventCheckboxChange = (event) => {
    let noNutsTarget = event.target.closest('input[type="checkbox"]#nuts-checkbox');
    let vegeterianOnlyTarget = event.target.closest('input[type="checkbox"]#vegeterian-checkbox');
    //debugger;
    if (noNutsTarget) {
      this.productGrid.updateFilter({
        noNuts: noNutsTarget.checked,
      });
    }    
    if (vegeterianOnlyTarget) {
      this.productGrid.updateFilter({
        vegeterianOnly: vegeterianOnlyTarget.checked,
      });
    }    
  }
}