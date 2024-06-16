import { PaymentPayOS } from '~/types/payment.type'

export interface PaymentPayOSState {
  payment: PaymentPayOS | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialPaymentPayOS: PaymentPayOSState = {
  payment: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
