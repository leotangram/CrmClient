import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import { IClient } from '../interfaces/IClient'
import client from '../config/apollo'

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
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER)

  if (loading) return 'Cargando...'

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.getClientsSeller.map(
            ({ company, email, id, name, surname }: IClient) => (
              <tr key={id}>
                <td className="border px-4 px-4 py-2">
                  {name} {surname}
                </td>
                <td className="border px-4 px-4 py-2">{company}</td>
                <td className="border px-4 px-4 py-2">{email}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Layout>
  )
}

export default Home
