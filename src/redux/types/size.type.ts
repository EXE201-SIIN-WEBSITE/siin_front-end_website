import { size } from '~/types/size.type'

export interface SizeState {
  sizeList: size[]
  size: size | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialSizeState: SizeState = {
  sizeList: [],
  size: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
