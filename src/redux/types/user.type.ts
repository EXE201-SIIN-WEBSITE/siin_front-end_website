import { User } from "~/types/user.type"


export interface UserState {
  user: User | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialUserState: UserState = {
  user: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
