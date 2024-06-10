export interface addCartItem {
  colorId?: number
  sizeId?: number
  accessoryId?: number
  quantity?: number
  productId?: number
  userId?: number
}


export interface cartItem {
  quantity: number
  sizeName?: string
  colorName?: string
  accessoryName?: string
  productId?: number
  productMaterialId?: number
  accessoryId?: number
}


