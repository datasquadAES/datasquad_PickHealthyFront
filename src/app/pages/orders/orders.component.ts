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
  states: any[] | undefined;
  formGroup: FormGroup | undefined;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.states = [
      {name: 'Todos', code: 'Todos'},
      {name: 'pendiente', code: 'pendiente'},
      {name: 'pagado', code: 'pagado'},
      {name: 'en camino' , code: 'en camino'},
      {name: 'en preparación' , code: 'en preparación'},
      {name: 'cancelado', code: 'cancelado'},
      {name: 'Lista para pago', code: 'lista_para_pago'}
    ]
    this.getUserData();
    this.loadOrders();

    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null),
      selectedState: new FormControl<any>({name: 'Todos', code: 'Todos'})
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
    this.pedidoService.updatePedido(order?.id, { status: 'cancelado' }).subscribe((res) => {
      this.orders[index] = res;
    });
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

    if (value.selectedState?.code !== 'Todos') {
      filtered = filtered.filter(item => item.status === value.selectedState?.code);
    }

    this.filteredOrders = filtered;
  }

  clearFilters() {
    this.formGroup?.reset({ date: null, selectedState: {name: 'Todos', code: 'Todos'} });
    this.filteredOrders = this.orders;
  }
}
