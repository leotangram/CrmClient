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

  const addProducts = (selectedProducts: IProduct[]) => {
    let newState: IProduct[]
    if (state.products && state.products.length > 0) {
      newState = selectedProducts.map(product => {
        const newObject = state.products?.find(
          productState => productState.id === product.id
        )
        return { ...product, ...newObject }
      })
    } else {
      newState = selectedProducts
    }
    dispatch({
      type: SELECT_PRODUCTS,
      payload: newState
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
