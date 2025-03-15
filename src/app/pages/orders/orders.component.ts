import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  userData: any;
  orders: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getUserData();
    this.loadOrders();
  }

  loadOrders() {
    this.pedidoService.getPedidoByUser(this.userData.id).subscribe(
      (res: any) => {

        this.orders = res;
      },
      (error) => {
      }
    );
  }

  getUserData() {
    let user = sessionStorage.getItem('user');

    this.userData = user = user ? JSON.parse(user) : {};
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return undefined;
    }
  }

  cancelOrder(order: any, index: number) {

    this.pedidoService.updatePedido(order?.id, { estado: 'cancelado' }).subscribe((res) => {

      this.orders[index] = res

    })
  }
}
