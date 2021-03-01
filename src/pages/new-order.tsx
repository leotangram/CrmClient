import { useContext } from 'react'
import Layout from '@/components/Layout'
import OrderContext from '@/context/orders/OrderContext'
import AsignClient from '../components/orders/AsignClient'

const NewOrder = () => {
  const orderConstext = useContext(OrderContext)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">NewOrder</h1>
      <AsignClient />
    </Layout>
  )
}

export default NewOrder
