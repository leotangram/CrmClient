import { FC, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { IOrder } from '@/interfaces/IOrder'

const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      state
    }
  }
`

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`

const GET_ORDERS_SELLER = gql`
  query getOrdersSeller {
    getOrdersSeller {
      id
    }
  }
`

const ORDER_STATES = [
  { key: 'COMPLETED', value: 'Completado' },
  { key: 'PENDING', value: 'Pendiente' },
  { key: 'CANCELLED', value: 'Cancelado' }
]

const Order: FC<IOrder> = ({ client, id, order, state, total }) => {
  const [orderState, setOrderState] = useState(state)
  const [style, setStyle] = useState('')

  const [updateOrder] = useMutation(UPDATE_ORDER)
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersSeller }: any = cache.readQuery({
        query: GET_ORDERS_SELLER
      })
      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrdersSeller: getOrdersSeller.filter(
            (currentOrder: { id: string | undefined }) => currentOrder.id !== id
          )
        }
      })
    }
  })

  useEffect(() => {
    if (orderState) {
      setOrderState(orderState)
    }
    switch (orderState) {
      case ORDER_STATES[0].key:
        setStyle('border-green-500')
        break
      case ORDER_STATES[1].key:
        setStyle('border-yellow-500')
        break
      case ORDER_STATES[2].key:
        setStyle('border-red-800')
        break

      default:
        break
    }
  }, [orderState])

  const changeOrderState = async (e: { target: { value: string } }) => {
    const newState = e.target.value
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            state: newState,
            client: client?.id
          }
        }
      })
      setOrderState(data.updateOrder.state)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const confirmDeleteOrder = () => {
    Swal.fire({
      title: '¿Deseas eliminar este pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteOrder({
            variables: {
              id
            }
          })
          Swal.fire('Eliminado', data.deleteOrder, 'success')
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    })
  }

  return (
    <div
      className={`${style} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {client?.name} {client?.surname}
        </p>
        {client?.email && (
          <p className="flex items-center my-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {client.email}
          </p>
        )}
        {client?.phone && (
          <p className="flex items-center my-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {client.phone}
          </p>
        )}
        <h2 className="text-gray-800 font-bold mt-10">Estado pedido: </h2>
        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          onChange={changeOrderState}
          value={orderState}
        >
          {ORDER_STATES.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del pedido</h2>
        {order.map(({ name, quantity }) => (
          <div key={id} className="mt-4 ">
            <p className="text-sm text-gray-600">Producto: {name}</p>
            <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total a pagar: <span className="font-light">$ {total}</span>
        </p>
        <button
          type="button"
          className="uppercase text-xs font-bold flex flex-item mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
          onClick={confirmDeleteOrder}
        >
          Eliminar pedido
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Order
