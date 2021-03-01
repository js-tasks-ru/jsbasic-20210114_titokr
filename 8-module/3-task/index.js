export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    
    let indexProductInCart = this.cartItems.findIndex(item => item.product.id === product.id );

    if (indexProductInCart > -1) {
      this.cartItems[indexProductInCart].count ++;
    } else {
      this.cartItems.push({product, count: 1});
      indexProductInCart = this.cartItems.length - 1;
    }

    this.onProductUpdate(this.cartItems[indexProductInCart]);
  }

  updateProductCount(productId, amount) {
    // ваш код
    let indexProductInCart = this.cartItems.findIndex(item => item.product.id === productId );
    let cartItem;

    if (indexProductInCart > -1) {
      this.cartItems[indexProductInCart].count += amount;
      cartItem = this.cartItems[indexProductInCart];
      if (this.cartItems[indexProductInCart].count === 0) {
        this.cartItems.splice(indexProductInCart, 1);
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // ваш код
    return (this.cartItems.length === 0) ? true : false;
  }

  getTotalCount() {
    // ваш код
    let count = 0;
    this.cartItems.forEach(item => count += item.count);
    return count;
  }

  getTotalPrice() {
    // ваш код
    let price = 0;
    this.cartItems.forEach(item => price += item.product.price * item.count);
    return price;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

