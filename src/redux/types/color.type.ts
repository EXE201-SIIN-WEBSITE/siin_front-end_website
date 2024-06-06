import { color } from '~/types/color.type'

export interface ColorState {
  colorList: color[]
  color: color | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialColorState: ColorState = {
  colorList: [],
  color: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
