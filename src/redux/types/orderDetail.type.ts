import { orderDetail } from '~/types/orderDetail.type'

export interface OrderDetailState {
  orderDetailList: orderDetail[]
  orderDetail: orderDetail | null
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
