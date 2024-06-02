import { material } from "~/types/material.type"


export interface MaterialState {
  materialList: material[]
  material: material | null
  loading: boolean
  currentRequestId: undefined | string
  error: unknown
}

export const initialMaterialState: MaterialState = {
  materialList: [],
  material: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
