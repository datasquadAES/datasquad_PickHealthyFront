import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input() item : Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image_url: '',
    units: 0,
    category_id: 0,
    store_id: 0,
    stock: 0,
    available: false
  }
  @Input() first : boolean = true;



}
