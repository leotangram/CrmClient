import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import { IProduct } from '../interfaces/IProduct'
import Product from '../components/Product'

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

const Products = () => {
  const { data, loading } = useQuery(GET_PRODUCTS)

  if (loading) return <span>Cargando...</span>

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Existencia</th>
            <th className="w-1/5 py-2">Precio</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.getProducts?.map((product: IProduct) => (
            <Product key={product.id} {...product} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Products
