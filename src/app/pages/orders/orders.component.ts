import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  userData: any;
  orders: any[] = [];
  filteredOrders: any[] = [];
  rangeDates: any;
  states: any[] = ['Todos','entregado','en preparación','cancelado']
  formGroup: FormGroup | undefined;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getUserData();
    this.loadOrders();

    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null),
      selectedState: new FormControl<string>('Todos')
    });

    this.formGroup.valueChanges.subscribe((value) => {
      this.applyFilters(value);
    });
  }

  loadOrders() {
    this.pedidoService.getPedidoByUser(this.userData.id).subscribe(
      (res: any) => {
        this.filteredOrders = this.orders = res;
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
      this.orders[index] = res;
    });
  }

  filterByState(selectedState: string){
    if(selectedState === 'Todos') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(item => item.estado === selectedState);
    }
  }

  filterByDate(dates: Date[]) {
    const [start, end] = dates;
    this.filteredOrders = this.orders.filter(item =>
      new Date(item.fecha_pedido) >= new Date(start) && new Date(item.fecha_pedido) <= new Date(end)
    );
  }

  applyFilters(value: any) {
    let filtered = this.orders;

    if (value.date && value.date[1] !== null) {
      filtered = filtered.filter(item =>
        new Date(item.fecha_pedido) >= new Date(value.date[0]) && new Date(item.fecha_pedido) <= new Date(value.date[1])
      );
    }

    if (value.selectedState !== 'Todos') {
      filtered = filtered.filter(item => item.estado === value.selectedState);
    }

    this.filteredOrders = filtered;
  }

  clearFilters() {
    this.formGroup?.reset({ date: null, selectedState: 'Todos' });
    this.filteredOrders = this.orders;
  }
}
