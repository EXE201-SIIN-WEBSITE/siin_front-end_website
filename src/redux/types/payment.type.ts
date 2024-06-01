import { payment } from '~/types/payment.type'

export interface PaymentState {
  paymentList: payment[]
  payment: payment | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialPaymentState: PaymentState = {
  paymentList: [],
  payment: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
