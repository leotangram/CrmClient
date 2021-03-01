import { IClient } from './IClient'

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
