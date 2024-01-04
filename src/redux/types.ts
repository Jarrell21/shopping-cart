export type Product = {
  added: boolean
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type CartProduct = {
  productId: number
  quantity: number
  selected: boolean
}

export type CartData = {
  id: number
  userId: number
  date: string
  products: CartProduct[]
  __v: number
}

export type Order = {
  orderNumber: string
  productId: number
  quantity: number
  selected: boolean
  status: "To Ship" | "To Receive" | "Completed"
}
