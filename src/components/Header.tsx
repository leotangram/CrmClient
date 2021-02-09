import { gql, useQuery } from '@apollo/client'
import { IUser } from '../interfaces/IUser'

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      surname
    }
  }
`

const Header = () => {
  const { data, loading, error } = useQuery(GET_USER)

  if (loading) return null

  const { name, surname }: IUser = data.getUser

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {name} {surname}
      </p>
      <button type="button">Cerrar sesión</button>
    </div>
  )
}

export default Header
