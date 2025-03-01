import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();
  private isCartVisibleSubject = new BehaviorSubject<boolean>(false);
  isMenuVisible$ = this.isCartVisibleSubject.asObservable();

  constructor() { }

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.units = (existingProduct.units || 1) + 1;
    } else {
      product.units = 1;
      this.cartItems.push(product);
    }
    this.cartSubject.next(this.cartItems);
  }

  getCart() {
    return this.cart$;
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  showCart() {
    this.isCartVisibleSubject.next(true);
  }

  hideCart() {
    this.isCartVisibleSubject.next(false);
  }
}
