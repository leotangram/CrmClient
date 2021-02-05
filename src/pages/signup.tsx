import { useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useMutation, gql } from '@apollo/client'
import * as Yup from 'yup'
import Layout from '../components/Layout'

const NEW_ACCOUNT = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      surname
      email
    }
  }
`

const Signup = () => {
  const [message, setMessage] = useState('')

  const [newUser] = useMutation(NEW_ACCOUNT)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: ''
    },
    onSubmit: async ({ name, surname, email, password }) => {
      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              surname,
              email,
              password
            }
          }
        })
        setMessage(`Se creó correctamente el usuario: ${data.newUser.name}`)
        setTimeout(() => {
          setMessage('')
          router.push('/login')
        }, 3000)
      } catch (error) {
        setMessage(error.message)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      surname: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
      password: Yup.string()
        .required('El password es obligatorio')
        .min(6, 'El password debe ser de al menos 6 caractéres')
    })
  })

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values: { name, surname, email, password }
  } = formik

  const showMessage = (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  )

  return (
    <Layout>
      {message && showMessage}
      <h1 className="text-center text-2xl text-white font-light">
        Crear nueva cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                placeholder="Nombre usuario"
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
                placeholder="Apellido usuario"
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
                placeholder="Email usuario"
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
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Password usuario"
                type="password"
                value={password}
              />
              {touched.password && errors.password && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{errors.password}</p>
                </div>
              )}
            </div>
            <button
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              type="submit"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
