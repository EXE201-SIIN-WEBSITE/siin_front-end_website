import { accessory } from '~/types/accessory.type'

export interface AccessoryState {
  accessoryList: accessory[]
  accessory: accessory | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialAccessoryState: AccessoryState = {
  accessoryList: [],
  accessory: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
