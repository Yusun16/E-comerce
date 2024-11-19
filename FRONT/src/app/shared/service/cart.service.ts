import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Products } from 'src/app/core/models/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Products[] = [];
  cartUpdated$ = new Subject<void>();
  itemAddedToCart$ = new Subject<void>()


  constructor() {
    this.loadCartItems();
  }

  addToCart(product: Products) {
    const exists = this.cartItems.some(item => item.id == product.id);
    if (!exists) {
      this.cartItems.push(product);
      this.saveCartItems();
      this.cartUpdated$.next();
      this.itemAddedToCart$.next();

    }
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(product: Products) {
    const index = this.cartItems.findIndex((item) => item === product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }

  updateProductQuantity(productId: number, quantity: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      product.cantidad = quantity;
      this.saveCartItems();

    }
  }


  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartItems();
  }
}
