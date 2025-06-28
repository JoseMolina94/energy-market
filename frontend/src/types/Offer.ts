

export interface Offer {
  availableFrom: string
  availableTo: string
  createdAt?: string
  isSold: boolean
  kWh: number
  pricePerKWh: number
  sellerId: string
  updatedAt?: string
  _id: string
}

export interface OfferInput {
  kWh: number
  pricePerKWh: number
  availableFrom: string,
  availableTo: string,
}