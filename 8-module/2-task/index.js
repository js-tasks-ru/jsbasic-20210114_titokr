import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.className = 'products-grid';
    let template = `<div class="products-grid__inner">
    </div>`;
    this.elem.innerHTML = template;
    this.elemInner = this.elem.querySelector('.products-grid__inner');
    this.filteringProducts = products.slice();
    this.createGridItems(this.filteringProducts);
    //debugger;
  }
  createGridItems = (products) => {
    for (let item of products) {
      let card = new ProductCard(item);
      this.elemInner.append(card.elem);
    }
    //console.log('показано ', this.elemInner.querySelectorAll('.card').length);
    
  }
  updateFilter(filters) {
    this.filters = Object.assign({}, this.filters, filters);
    let filteringProducts = this.products.slice();
    let tempArr;

    if (this.filters.category !== undefined && this.filters.category !== '') {
      tempArr = filteringProducts.filter(item => item.category === this.filters.category);
      filteringProducts.length = 0;
      filteringProducts = tempArr.slice();
      tempArr.length = 0;
    }

    if (this.filters.noNuts === true) {
      tempArr = filteringProducts.filter(item => item.nuts == undefined || item.nuts === false);
      filteringProducts.length = 0;
      filteringProducts = tempArr.slice();
      tempArr.length = 0;
    }

    if (this.filters.vegeterianOnly === true) {
      tempArr = filteringProducts.filter(item => item.vegeterian === true);
      filteringProducts.length = 0;
      filteringProducts = tempArr.slice();
      tempArr.length = 0;
    }

    if (this.filters.maxSpiciness !== undefined) {
      tempArr = filteringProducts.filter(item => item.spiciness <= this.filters.maxSpiciness);
      filteringProducts.length = 0;
      filteringProducts = tempArr.slice();
    }
    
    this.elemInner.innerHTML = '';
    this.filteringProducts.length = 0;
    this.filteringProducts = filteringProducts.slice();
    this.createGridItems(this.filteringProducts);
    //return filteringProducts;
  } 
}
