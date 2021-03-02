import { FC, useReducer } from 'react'
import { IClient } from '../../interfaces/IClient'
import { IOrder } from '../../interfaces/IOrder'
import {
  QUANTITY_OF_PRODUCTS,
  SELECT_CLIENT,
  SELECT_PRODUCTS
} from '../../types/index'
import { IProduct } from '../../interfaces/IProduct'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'

const OrderState: FC = ({ children }) => {
  const initialState: IOrder = {
    client: null,
    products: [],
    total: 0
  }

  const [state, dispatch] = useReducer(OrderReducer, initialState)

  const addClient = (client: IClient) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client
    })
  }

  const addProducts = (products: IProduct[]) => {
    dispatch({
      type: SELECT_PRODUCTS,
      payload: products
    })
  }

  const quantityProducts = (newProduct: IProduct) => {
    dispatch({
      type: QUANTITY_OF_PRODUCTS,
      payload: newProduct
    })
  }

  return (
    <OrderContext.Provider
      value={{
        addClient,
        addProducts,
        products: state.products,
        quantityProducts
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderState
