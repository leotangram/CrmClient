import { useFormik } from 'formik'
import * as Yup from 'yup'
import Layout from '../components/Layout'

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: ''
    },
    onSubmit: values => {
      console.log({ values })
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      surname: Yup.string().required('El apellido es obligatorio')
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

  return (
    <Layout>
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
