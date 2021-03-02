import { useContext } from 'react'
import Layout from '@/components/Layout'
import OrderContext from '@/context/orders/OrderContext'
import AsignClient from '../components/orders/AsignClient'
import AsignProducts from '../components/orders/AsignProducts'

const NewOrder = () => {
  const orderConstext = useContext(OrderContext)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">NewOrder</h1>
      <AsignClient />
      <AsignProducts />
    </Layout>
  )
}

export default NewOrder
