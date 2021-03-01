import { IOrder } from '@/interfaces/IOrder'
import { ActionTypeOrders, SELECT_CLIENT } from '../../types'

export default (state: IOrder, action: ActionTypeOrders) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      }
    default:
      return state
  }
}
