import { OrderDetail } from '~/types/orderDetail.type'

export interface OrderDetailState {
  orderDetailList: OrderDetail[]
  orderDetail: OrderDetail | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialOrderDetailState: OrderDetailState = {
  orderDetailList: [],
  orderDetail: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
