import { useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import Swal from 'sweetalert2'
import Layout from '@/components/Layout'
import { IProduct } from '../../interfaces/IProduct'

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      price
      existence
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      existence
      price
    }
  }
`

const EditProduct = () => {
  const [message, setMessage] = useState('')

  const router = useRouter()
  const {
    query: { id }
  } = router

  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: { id }
  })

  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  const showMessage = (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  )

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre del producto es obligatorio'),
    existence: Yup.number()
      .required('Agrega la cantidad disponible')
      .positive('No se aceptan numeros negativos')
      .integer('La existencia deben ser números enteros'),
    price: Yup.number()
      .required('El precio es obligatorio')
      .positive('No se aceptan numeros negativos')
  })

  if (loading) return <span>Cargando...</span>
  if (!data) return <span>Acción no permitida</span>

  const updateInfoProduct = async ({ name, existence, price }: IProduct) => {
    try {
      await updateProduct({
        variables: {
          id,
          input: {
            name,
            existence,
            price
          }
        }
      })
      router.push('/products')
      Swal.fire('Correcto', 'El producto se actualizó correctamente', 'success')
    } catch (error) {
      setMessage(error.message)
    }
  }

  const { getProduct } = data

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
      {message && showMessage}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            enableReinitialize
            initialValues={getProduct}
            validationSchema={validationSchema}
            onSubmit={values => updateInfoProduct(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
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
                    placeholder="Nombre producto"
                    type="text"
                    value={values?.name}
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
                    htmlFor="existence"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Cantidad disponible
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="existence"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Cantidad disponible"
                    type="number"
                    value={values?.existence}
                  />
                  {touched.existence && errors.existence && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.existence}</p>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Precio
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Precio producto"
                    type="number"
                    value={values?.price}
                  />
                  {touched.price && errors.price && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.price}</p>
                    </div>
                  )}
                </div>
                <button
                  className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                  type="submit"
                >
                  Agregar nuevo producto
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default EditProduct
