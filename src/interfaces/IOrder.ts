import { IClient } from './IClient'
import { IProduct } from './IProduct'

export interface IOrderProduct {
  id?: string
  quantity: number
}

export interface IOrder {
  id?: string
  order: IOrderProduct[]
  total: number
  client: string | IClient | null
  seller?: string
  state?: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  created?: Date
}

export interface IOrderContext {
  order?: IOrder[]
  addClient?: (client: IClient) => void
  addProducts?: (products: IProduct[]) => void
}
