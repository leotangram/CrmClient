import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { IClient } from '../interfaces/IClient'
import Layout from '../components/Layout'
import Client from '../components/Client'

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

const Home = () => {
  const router = useRouter()
  const { data, loading, client } = useQuery(GET_CLIENTS_SELLER)

  if (loading) return 'Cargando...'
  if (!data.getClientsSeller) {
    client.clearStore()
    router.push('/login')
    return null
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link href="new-client">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
          Nuevo cliente
        </a>
      </Link>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.getClientsSeller?.map((userClient: IClient) => (
            <Client key={userClient.id} {...userClient} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Home
