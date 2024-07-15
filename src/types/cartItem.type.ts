export interface addCartItem {
  colorId?: number
  productMaterialId?: number
  sizeId?: number
  accessoryId?: number
  quantity?: number
  productId?: number
  userId?: number
}

export interface cartItem {
  id?: number
  quantity: number
  sizeName?: string
  colorName?: string
  accessoryName?: string
  productId?: number
  productMaterialId?: number
  accessoryId?: number
}
