
export interface Transaction {
  _id: string
  kWh: number
  pricePerKWh: number
  totalPrice: number
  createdAt: string
  buyerId: string
  sellerId: string
}

export interface DecodedToken {
  userId: string
  role: "buyer" | "seller"
  exp: number
}