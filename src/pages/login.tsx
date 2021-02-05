import { useFormik } from 'formik'
import * as Yup from 'yup'
import Layout from '../components/Layout'

const login = () => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values: { email, password }
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      console.log({ values })
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email es necesario'),
      password: Yup.string().required('El password es obligatorio')
    })
  })

  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
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
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default login
