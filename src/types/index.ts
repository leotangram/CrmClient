// Orders
import { IClient } from '../interfaces/IClient'
import { IProduct } from '../interfaces/IProduct'

export const SELECT_CLIENT = 'SELECT_CLIENT'
export const SELECT_PRODUCTS = 'SELECT_PRODUCTS'
export const QUANTITY_OF_PRODUCTS = 'QUANTITY_OF_PRODUCTS'

export type ActionTypeOrders =
  | { type: 'SELECT_CLIENT'; payload: IClient }
  | { type: 'SELECT_PRODUCTS'; payload: IProduct[] }
  | { type: 'QUANTITY_OF_PRODUCTS'; payload: IProduct }
