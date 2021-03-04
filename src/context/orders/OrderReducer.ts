import { IOrder } from '@/interfaces/IOrder'
import {
  ActionTypeOrders,
  QUANTITY_OF_PRODUCTS,
  SELECT_CLIENT,
  SELECT_PRODUCTS,
  UPDATE_TOTAL
} from '../../types'

const OrderReducer = (state: IOrder, action: ActionTypeOrders) => {
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
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products?.reduce(
          (newTotal, article) =>
            article.quantity
              ? (newTotal + article.quantity) * article.price
              : 0,
          0
        )
      }
    default:
      return state
  }
}

export default OrderReducer
