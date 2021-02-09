import { useRouter } from 'next/router'
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
  const router = useRouter()
  const { data, loading, client } = useQuery(GET_USER)

  if (loading) return 'Cargando...'
  if (!data.getUser) {
    client.clearStore()
    router.push('/login')
    return null
  }

  const { name, surname }: IUser = data.getUser

  const signup = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {name} {surname}
      </p>
      <button
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        onClick={signup}
        type="button"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Header
