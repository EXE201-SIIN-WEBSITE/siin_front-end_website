import { subImage } from '~/types/subImage.type'

export interface subImageState {
  subImageList: subImage[]
  subImageDetail: subImage | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialSubImagetState: subImageState = {
  subImageList: [],
  subImageDetail: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
