import { IClient } from './IClient'
import { IProduct } from './IProduct'

export interface IOrderProduct {
  id?: string
  quantity: number
}

export interface IOrder {
  id?: string
  order?: IOrderProduct[]
  products?: IProduct[]
  total?: number
  client?: IClient | null
  seller?: string
  state?: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  created?: Date
}

export interface IOrderContext {
  addClient?: (client: IClient) => void
  client?: IClient | null
  products?: IProduct[]
  addProducts?: (products: IProduct[]) => void
  quantityProducts?: (newProduct: IProduct) => void
  total?: number
  updateTotal?: () => void
}
