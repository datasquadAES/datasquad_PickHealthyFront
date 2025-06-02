import { OrderDataDto } from "./orderDataDto";
import { OrderItemDto } from "./orderItemDto";

export type PaymentMethod = 'tarjeta' | 'efectivo' | 'transferencia';

export interface CreateOrderDto {
  orderData: OrderDataDto;
  items: OrderItemDto[];
  payment_method: PaymentMethod;
}
