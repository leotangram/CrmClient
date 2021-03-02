import { IOrder } from '@/interfaces/IOrder'
import {
  ActionTypeOrders,
  QUANTITY_OF_PRODUCTS,
  SELECT_CLIENT,
  SELECT_PRODUCTS
} from '../../types'

export default (state: IOrder, action: ActionTypeOrders) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      }
    case SELECT_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case QUANTITY_OF_PRODUCTS:
      return {
        ...state,
        products: state.products?.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      }
    default:
      return state
  }
}
