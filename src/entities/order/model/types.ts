export type CargoType = "documents" | "fragile" | "regular";

export type OrderStatus = "created" | "in_progress" | "delivered";

export interface OrderSender {
  senderName: string;
  senderPhone: string;
  senderCity: string;
}

export interface OrderRecipient {
  recipientName: string;
  recipientCity: string;
}

export interface OrderCargo {
  cargoType: CargoType;
  weight: number;
}

export interface Order
  extends OrderSender,
    OrderRecipient,
    OrderCargo {
  id: string;
  createdAt: string;
  status: OrderStatus;
}

export type OrderFormStep1 = OrderSender;

export interface OrderFormStep2 extends OrderRecipient, OrderCargo {}

