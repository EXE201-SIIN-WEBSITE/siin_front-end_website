import { auth } from '~/types/auth.type'

export interface credentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: auth
  token: string
}

interface AuthState {
  user: auth | null
  token: string | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
