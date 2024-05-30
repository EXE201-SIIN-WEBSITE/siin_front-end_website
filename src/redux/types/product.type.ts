import { product } from "~/types/product.type";


export interface ProductState {
  productList: product[]
  productDetail: product | null
  // editProduct: product | null
  loading: boolean
  currentRequestId: undefined | string
  error: any

}

export const initialProductState: ProductState = {
  productList: [],
  productDetail: null,
  // editProduct: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}