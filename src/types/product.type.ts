export interface product {
  id: number
  name?: string
  coverImage?: string
  price?: number
  status?: boolean
  quantity?: number
  categoryId?: number
  accessoryId?: number
  materialId?: number
  
}

export interface CartItem {
  id: number
  name?: string
  price?: number
  quantity: number
  image?: string
  productMaterialId?: number
  productId?: number
  sizeName?: string
  colorName?: string
  accessoryName?: string
  accessoryId?: number
  sizeId?: number
  colorId?: number
  accessId?: number
}
