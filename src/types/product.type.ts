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
  id: number;
  name?: string;
  price: number;
  quantity: number;
  image?: string
}
