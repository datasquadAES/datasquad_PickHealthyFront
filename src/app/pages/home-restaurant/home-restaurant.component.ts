import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

interface Order {
  id: number;
  tableNumber: number;
  detalles: OrderItem[];
  estado: 'pendiente' | 'en preparación' | 'listo' | 'completed';
  fecha_pedido: Date;
}

interface OrderItem {
  name: string;
  cantidad: number;
  notes: string;
  plato: Plato
}

interface Plato {
  nombre: string;
  quantity: number;
  precio: number;
  descripcion: string;
}

@Component({
  selector: 'app-home-restaurant',
  templateUrl: './home-restaurant.component.html',
  styleUrl: './home-restaurant.component.scss',
})
export class HomeRestaurantComponent {
  orders: Order[] = [];
  pendingOrders: Order[] = [];
  preparationOrders: Order[] = [];
  readyOrders: Order[] = [];
  completedOrders: Order[] = [];
  selectedOrder: Order | null = null;
  newOrder: Partial<Order> = {
    tableNumber: 0,
    detalles: [],
    estado: 'pendiente',
  };
  newItem: OrderItem = {
    name: '',
    cantidad: 1,
    notes: '',
    plato: {
      nombre: '',
      quantity: 0,
      precio: 0,
      descripcion: ''
    }
  };
  displayDialog: boolean = false;
  statusOptions = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En preparación', value: 'en preparación' },
    { label: 'Listo para recoger', value: 'listo' },
    { label: 'Completado', value: 'completed' },
  ];

  constructor(
    private messageService: MessageService,
    private pedidoService: PedidoService,

  ) {}

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders(){
    this.pedidoService.getPedidos().subscribe(
      (res: any) => {
        this.orders = res
        this.updateFilteredOrders();
        // this.filteredOrders = this.orders = res.filter( (order:any) => order.estado === 'en preparación');
      },
      (error) => {
      }
    );
  }

  showNewOrderDialog(): void {
    this.newOrder = {
      tableNumber: 0,
      detalles: [],
      estado: 'pendiente',
    };
    this.displayDialog = true;
  }

  addItemToNewOrder(): void {
    if (this.newItem.name) {
      this.newOrder.detalles = [
        ...(this.newOrder.detalles || []),
        { ...this.newItem },
      ];
      this.newItem = { name: '', cantidad: 1, notes: '', plato: {
        nombre: '',
        quantity: 0,
        precio: 0,
        descripcion: ''
      } };
    }
  }

  removeItemFromNewOrder(index: number): void {
    if (this.newOrder.detalles) {
      this.newOrder.detalles = this.newOrder.detalles.filter((_, i) => i !== index);
    }
  }

  saveNewOrder(): void {
    if (
      this.newOrder.tableNumber &&
      this.newOrder.detalles &&
      this.newOrder.detalles.length > 0
    ) {
      const newOrder: Order = {
        id:
          this.orders.length > 0
            ? Math.max(...this.orders.map((o) => o.id)) + 1
            : 1,
        tableNumber: this.newOrder.tableNumber,
        detalles: [],
        estado: 'pendiente',
        fecha_pedido: new Date(),
      };
    }
  }

  getOrdersByStatus(status : any): Order[]{

    return this.orders.filter((order:any) => order.estado === status);
  }

  getOrderTotal(order : Order):number{
    let total = 0

    order.detalles.forEach((item: any) => {
        total += item.plato.precio * item.cantidad
    })

    return total
  }

  async updateOrderStatus(index:number, order : any, newStatus : any){
    const updatedOrder = {
      ...order,
      estado: newStatus
    };

    this.pedidoService.updatePedido(order.id, updatedOrder).subscribe((order) => {

      return order
    })

    if(newStatus === 'en preparación'){
      this.pendingOrders.splice(index, 1);
      this.preparationOrders.push(order)
    }
    if(newStatus === 'listo'){
      this.preparationOrders.splice(index, 1);
      this.readyOrders.push(order)
    }
  }

  async updateFilteredOrders(): Promise<void> {
    this.pendingOrders = [...this.getOrdersByStatus('pendiente')];
    this.preparationOrders = [...this.getOrdersByStatus('en preparación')];
    this.readyOrders = [...this.getOrdersByStatus('listo')];
    this.completedOrders = [...this.getOrdersByStatus('completed')];
  }
}
