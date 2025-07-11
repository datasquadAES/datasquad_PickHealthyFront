import { Component, CUSTOM_ELEMENTS_SCHEMA, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart/cart.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { UsersService } from 'src/app/services/users/users.service';
import { firstValueFrom, Subscription, Observable } from 'rxjs';
import { PagoService } from 'src/app/services/pago/pago.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Product } from 'src/app/models/product.model';
import { CreateOrderDto } from 'src/app/models/dto/createOrder.dto';


@Component({
  selector: 'cart-sidebar',
  standalone: false,
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent implements OnInit, OnChanges, OnDestroy {
  sidebarVisible: boolean = false;
  addedProducts: Product[] = [];
  activeStep: number = 0
  sortOptions!: any[];
  sortOrder!: number;
  sortField!: string;
  cities: any[] | undefined;
  selectedCity: any | undefined;
  personalDataForm!: FormGroup;
  user: any;
  total: any;
  loading : boolean = false;

  private storageSubscription: Subscription;


  constructor(
    private cartService: CartService,
    private userService: UsersService,
    private pedidoService: PedidoService,
    private PagoService: PagoService,
    private toastService : ToastService
  ) {
    this.storageSubscription = new Subscription();
  }

  ngOnInit(): void {

    this.cartService.isMenuVisible$.subscribe((isOpen: boolean) => {
      this.sidebarVisible = isOpen;
      this.activeStep = 0;
    });

    this.cartService.cart$.subscribe((items: Product[]) => {
      this.addedProducts = items;
      if(items){
        this.getTotal();
      }
    });

    this.personalDataForm = new FormGroup({
      observation: new FormControl<string | null>(null),
      direccion: new FormControl<string | null>(null),
      telefono: new FormControl<string | null>(null),
    });

    this.userService.currentUser.subscribe((user: any) => {
      let currentUser:any = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.user = currentUser;
      this.setUserData(currentUser.direccion, currentUser.telefono, '');
    })

    this.cities = [
      { name: 'Nequi', code: 'pse' },
      { name: 'Daviplata', code: 'pse' },
      { name: 'Tarjeta credito', code: 'tarjeta' },
      { name: 'Tarjeta débito', code: 'tarjeta' },
      { name: 'Efectivo', code: 'efectivo' },
    ];


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTotal();
  }

  ngOnDestroy(): void {
    this.storageSubscription.unsubscribe();
     this.resetStepper()
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  setUserData(direccion: string, telefono: string, observation: string) {
    this.personalDataForm.patchValue({
      direccion: direccion || null,
      telefono: telefono || null,
      observation: observation || null,
    });
  }

  async confirmOrder() {
    this.loading = true
    try {
      const pedido = await this.createOrder();
      if (pedido) {
        this.handlePayment(pedido);
      }
    } catch (error) {
      console.error('Error in confirmOrder:', error);
    }
  }

  getTotal(): number {
    let total = 0;
    for (let item of this.addedProducts) {
      total += item.price * item.units;
    }
    this.total = total;
    return total;
  }

  async createOrder() {
    let pedido;

    const orderData: CreateOrderDto = {
      orderData: {
        user_id: this.user?.id,
        store_id: 0,
        dealer_id: 0,
        address: this.personalDataForm.value.direccion || '',
        total_amount: this.getTotal(),
      },
      items: this.addedProducts.map((product : Product) => {
        return {
          product_id: product.id,
          quantity: product.units,
          unit_price: product.price
        };
      }),
      payment_method: this.selectedCity?.code
    };

    try {
      pedido = await firstValueFrom(this.pedidoService.createPedido(orderData));
    } catch (error) {
      console.error('Error creating order', error);
      throw error;
    }

    return pedido;
  }

  handlePayment(pedido: any) {
    const paymentData = {
      order_id: pedido.id,
      user_id: this.user?.id,
      amount: this.getTotal(),
      payment_method: this.selectedCity?.code,
      status: 'pendiente'

    };

    this.PagoService.createPago(paymentData).subscribe((payment: any) => {
      if (payment) {
        this.cartService.clearCart();
        this.cartService.hideCart();
        this.setUserData('', '', '');
        this.loading = false

        this.toastService.show('success', 'Muy bien!', 'Pedido realizado con éxito');
      }
    });
  }

  onHide(){
    this.activeStep = 0; // Vuelve al primer paso
    this.cartService.hideCart();
  }

  setActiveStep(index: number) {
    this.activeStep = index;
  }

  resetStepper() {
    this.activeStep = 0; // Vuelve al primer paso
    // setTimeout(() => {
    //   this.stepperPanels.forEach((panel) => panel.reset()); // Resetea cada panel
    // }, 0);
  }
}
