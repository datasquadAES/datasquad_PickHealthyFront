import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-home-dealer',
  templateUrl: './home-dealer.component.html',
  styleUrl: './home-dealer.component.scss'
})
export class HomeDealerComponent implements OnInit {

  orders: any[] = [];
  filteredOrders: any[] = [];
  userData: any;
  selectedOrders: any[] = [];


  center: google.maps.LatLngLiteral = {lat: 4.7110, lng: -74.0721}; // Bogotá, Colombia
  zoom = 12;
  markers: any[] = [];

  constructor(
    private pedidoService : PedidoService
  ) {}



  ngOnInit(): void {
    this.getUserData();
    if (this.userData) {
      this.loadOrders();
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markers.push({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        label: {
          color: 'red',
          text: 'Marcador ' + (this.markers.length + 1)
        },
        title: 'Marcador ' + (this.markers.length + 1),
        options: { animation: google.maps.Animation.BOUNCE }
      });
    }
  }

  loadOrders() {
    this.pedidoService.getPedidos().subscribe(
      (res: any) => {
        this.selectedOrders = res.filter( (order:any) => order.dealer_id == this.userData?.id)
        this.filteredOrders = this.orders = res.filter( (order:any) => order.estado === 'en preparación');
      },
      (error) => {
      }
    );
  }

  async getUserData() {
    let user = sessionStorage.getItem('user');
    this.userData = user = user ? JSON.parse(user) : {};
  }

  selectOrder(order:any){

    this.filteredOrders = this.filteredOrders.filter((o:any) => o.id !== order.id);

    const updatedOrder = {
      ...order,
      dealer_id: this.userData.id,
      estado: 'transito'
    }

    this.selectedOrders.push(updatedOrder);
    this.updateOrder(updatedOrder);
  }

  changeStatusOrder(index: number, order: any, status: 'recogido' | 'entregado' | 'cancelado') {
    const updatedOrder = {
      ...order,
      estado: status
    };
    if (status === 'cancelado' && order.estado === 'transito') {
      this.selectedOrders.splice(index, 1);
      updatedOrder.estado = 'en preparación';
      updatedOrder.dealer_id = null

      this.selectedOrders.splice(index, 1);
      this.filteredOrders.push(updatedOrder);
    } else {

      this.selectedOrders[index] = updatedOrder;
    }
      this.updateOrder(updatedOrder);
  }

  updateOrder(updatedOrder: any){
    this.pedidoService.updatePedido(updatedOrder.id, updatedOrder).subscribe((order) => {
      return order
    })
  }
}
