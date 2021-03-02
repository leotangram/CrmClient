import { useContext } from 'react'
import Layout from '@/components/Layout'
import OrderContext from '@/context/orders/OrderContext'
import AsignClient from '../components/orders/AsignClient'
import AsignProducts from '../components/orders/AsignProducts'
import OrderResume from '../components/orders/OrderResume'
import Total from '../components/orders/Total'

const NewOrder = () => {
  const orderConstext = useContext(OrderContext)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">NewOrder</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignClient />
          <AsignProducts />
          <OrderResume />
          <Total />
          <button
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
            type="button"
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default NewOrder
