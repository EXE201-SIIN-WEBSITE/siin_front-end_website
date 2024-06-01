import { orderItem } from "~/types/orderItem.type"


export interface OrderItemState {
  orderItemList: orderItem[]
  orderItem: orderItem | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialOrderItemState: OrderItemState = {
  orderItemList: [],
  orderItem: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
