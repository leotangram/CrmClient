import { useContext, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Select, { ValueType } from 'react-select'
import { IProduct } from '../../interfaces/IProduct'
import OrderContext from '../../context/orders/OrderContext'

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      existence
      price
    }
  }
`

const AsignProducts = () => {
  const [currentProducts, setCurrentProducts] = useState<
    readonly IProduct[] | null
  >(null)

  const orderContext = useContext(OrderContext)
  const { addProducts } = orderContext

  const { data, loading } = useQuery(GET_PRODUCTS)

  useEffect(() => {
    if (addProducts && currentProducts) {
      addProducts(currentProducts as IProduct[])
    }
  }, [currentProducts])

  const selectProducts = (selectedProducts: ValueType<IProduct, true>) => {
    setCurrentProducts(selectedProducts)
  }

  if (loading) return null

  const { getProducts }: { getProducts: IProduct[] } = data

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Selecciona o busca los productos
      </p>
      <Select
        className="mt-3"
        getOptionLabel={({ name, existence }): string =>
          `${name} - ${existence} dispobibles`
        }
        getOptionValue={({ id }): string => id ?? ''}
        isMulti
        noOptionsMessage={() => 'No hay resultados'}
        onChange={selectProducts}
        options={getProducts}
        placeholder="Busque o seleccione el producto"
        value={currentProducts}
      />
    </>
  )
}

export default AsignProducts
