import { IOrder } from '@/interfaces/IOrder'
import { ActionTypeOrders, SELECT_CLIENT, SELECT_PRODUCTS } from '../../types'

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
        order: action.payload
      }
    default:
      return state
  }
}
