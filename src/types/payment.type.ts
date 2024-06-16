export interface payment {
  id: number
  status?: boolean
  typePayment?: string
  total?: number
  orderDetailId?: number
}

export interface PaymentPayOS {
  bin: string
  checkoutUrl: string
  accountNumber: string
  accountName: string
  amount: number
  description: string
  orderCode: number
  qrCode: string
}
