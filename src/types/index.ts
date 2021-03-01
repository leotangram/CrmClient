// Orders
import { IClient } from '../interfaces/IClient'

export const SELECT_CLIENT = 'SELECT_CLIENT'
export const SELECT_PRODUCT = 'SELECT_PRODUCT'
export const QUANTITY_OF_PRODUCTS = 'QUANTITY_OF_PRODUCTS'

export type ActionTypeOrders =
  | { type: 'SELECT_CLIENT'; payload: IClient }
  | { type: 'SELECT_PRODUCT' }
  | { type: 'QUANTITY_OF_PRODUCTS' }
