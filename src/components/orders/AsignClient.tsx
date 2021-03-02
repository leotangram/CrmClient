import { useContext, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Select, { ValueType } from 'react-select'
import { IClient } from '../../interfaces/IClient'
import OrderContext from '../../context/orders/OrderContext'

const GET_CLIENTS_SELLER = gql`
  query getClientsSeller {
    getClientsSeller {
      id
      name
      surname
      company
      email
    }
  }
`

const AsignClient = () => {
  const [currentClient, setCurrentClient] = useState<IClient | null>(null)

  const orderContext = useContext(OrderContext)
  const { addClient } = orderContext

  const { data, loading } = useQuery(GET_CLIENTS_SELLER)

  useEffect(() => {
    if (addClient && currentClient) {
      addClient(currentClient)
    }
  }, [currentClient])

  const selectClient = (selectedClient: ValueType<IClient, false>) => {
    setCurrentClient(selectedClient)
  }

  if (loading) return null

  const { getClientsSeller }: { getClientsSeller: IClient[] } = data

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asigna un cliente al pedido
      </p>
      <Select
        className="mt-3"
        getOptionLabel={({ name }): string => name}
        getOptionValue={({ id }): string => id ?? ''}
        noOptionsMessage={() => 'No hay resultados'}
        onChange={selectClient}
        options={getClientsSeller}
        placeholder="Busque o seleccione el cliente"
        value={currentClient}
      />
    </>
  )
}

export default AsignClient
