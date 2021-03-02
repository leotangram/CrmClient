import { createContext } from 'react'
import { IOrderContext } from '../../interfaces/IOrder'

const OrderContext = createContext<IOrderContext>({})

export default OrderContext
