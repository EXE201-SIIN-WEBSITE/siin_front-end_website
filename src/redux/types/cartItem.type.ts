import { cartItem } from '~/types/cartItem.type'

export interface CartItemState {
  cartItemList: cartItem[]
  cartItem: cartItem | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialCartItemState: CartItemState = {
  cartItemList: [],
  cartItem: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
