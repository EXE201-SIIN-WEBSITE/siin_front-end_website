import { product } from '~/types/product.type'

export interface ProductState {
  productList: product[]
  productDetail: product | null
  currentPage: number
  totalPage: number
  // editProduct: product | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialProductState: ProductState = {
  productList: [],
  productDetail: null,
  // editProduct: null,
  currentPage: 1,
  totalPage: 1,
  loading: false,
  currentRequestId: undefined,
  error: null
}
