import { FC, useReducer } from 'react'
import { IClient } from '../../interfaces/IClient'
import { IOrder } from '../../interfaces/IOrder'
import { SELECT_CLIENT } from '../../types/index'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'

const OrderState: FC = ({ children }) => {
  const initialState: IOrder = {
    client: null,
    order: [],
    total: 0
  }

  const [state, dispatch] = useReducer(OrderReducer, initialState)

  const addClient = (client: IClient) => {
    console.log({ client })

    dispatch({
      type: SELECT_CLIENT,
      payload: client
    })
  }

  return (
    <OrderContext.Provider value={{ addClient }}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderState
