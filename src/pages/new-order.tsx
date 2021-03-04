import { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Layout from '@/components/Layout'
import OrderContext from '@/context/orders/OrderContext'
import AsignClient from '../components/orders/AsignClient'
import AsignProducts from '../components/orders/AsignProducts'
import OrderResume from '../components/orders/OrderResume'
import Total from '../components/orders/Total'

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`

const NewOrder = () => {
  const router = useRouter()

  const [message, setMessage] = useState('')

  const orderConstext = useContext(OrderContext)
  const { client, products, total } = orderConstext

  const [newOrder] = useMutation(NEW_ORDER)

  const validateOrder =
    !products?.every(product => product.quantity && product.quantity > 0) ||
    total === 0 ||
    !client
      ? 'opacity-50 cursor-not-allowed'
      : ''

  const createNewOrder = async () => {
    const order = products?.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity
    }))

    try {
      await newOrder({
        variables: {
          input: {
            client: client?.id,
            order,
            total
          }
        }
      })
      router.push('orders')
      Swal.fire('Correcto', 'El pedido se registró correctamente', 'success')
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }

  const showMessage = (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  )

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">NewOrder</h1>
      {message && showMessage}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignClient />
          <AsignProducts />
          <OrderResume />
          <Total />
          <button
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder}`}
            onClick={createNewOrder}
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
