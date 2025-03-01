import { Component, Input } from '@angular/core';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input() item : any = {}
  @Input() first : boolean = true;



}
