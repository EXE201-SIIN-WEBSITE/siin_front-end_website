// cartItem.type.ts

import { cartItem } from "./cartItem.type";
export interface OrderDetail {
  id?: number;
  cartItems: cartItem[];
  orderDetailRequestDTO: OrderDetailRequestDTO;
}

export interface OrderDetailRequestDTO {
  nameCustomer: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  email: string;
  note: string;
}


export interface orderD {
  id: number;
  total?: number;
  orderStatus?: string;
  status?: boolean;
  nameCustomer?: string;
  phone?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  email?: string;
  note?: string;
  userId?: number

}

