import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { useState } from 'react'
import Layout from '../components/Layout'

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      surname
      company
      email
      phone
    }
  }
`

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

const NewClient = () => {
  const [message, setMessage] = useState('')

  const router = useRouter()
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data }) {
      const { getClientsSeller }: any = cache.readQuery({
        query: GET_CLIENTS_SELLER
      })
      cache.writeQuery({
        query: GET_CLIENTS_SELLER,
        data: {
          getClientsSeller: [...getClientsSeller, data.newClient]
        }
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      company: '',
      email: '',
      phone: ''
    },
    onSubmit: async ({ name, surname, company, email, phone }) => {
      try {
        await newClient({
          variables: {
            input: {
              name,
              surname,
              company,
              email,
              phone
            }
          }
        })
        router.push('/')
      } catch (error) {
        setMessage(error.message)
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre del cliente es obligatorio'),
      surname: Yup.string().required('El apellido del cliente es obligatorio'),
      company: Yup.string().required('La empresa del cliente es obligatoria'),
      email: Yup.string()
        .email('El email no es válido')
        .required('El email es necesario')
    })
  })

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values: { name, surname, company, email, phone }
  } = formik

  const showMessage = (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  )

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Client</h1>
      {message && showMessage}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Nombre cliente"
                type="text"
                value={name}
              />
              {touched.name && errors.name && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{errors.name}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="surname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="surname"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Apellido cliente"
                type="text"
                value={surname}
              />
              {touched.surname && errors.surname && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{errors.surname}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Empresa
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="company"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Empresa cliente"
                type="text"
                value={company}
              />
              {touched.company && errors.company && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{errors.company}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Email cliente"
                type="email"
                value={email}
              />
              {touched.email && errors.email && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{errors.email}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Teléfono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Teléfono cliente"
                type="tel"
                value={phone}
              />
            </div>
            <button
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              type="submit"
            >
              Registrar cliente
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewClient
