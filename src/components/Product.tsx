import Router from 'next/router'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { IProduct } from '../interfaces/IProduct'

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`

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

const Product = ({ existence, id, name, price }: IProduct) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      const { getProducts }: any = cache.readQuery({
        query: GET_PRODUCTS
      })
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter(
            (currentProduct: IProduct) => currentProduct.id !== id
          )
        }
      })
    }
  })

  const confirmDeleteProduct = () => {
    Swal.fire({
      title: '¿Deseas eliminar este producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteProduct({
            variables: {
              id
            }
          })
          Swal.fire('Producto eliminado', data.deleteProduct, 'success')
        } catch (error) {
          Swal.fire('Error', error.message, 'error')
        }
      }
    })
  }

  const editProduct = () => {
    Router.push({
      pathname: 'edit-product/[id]',
      query: { id }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{existence} Unidades</td>
      <td className="border px-4 py-2">$ {price}</td>
      <td className="border px-4 py-2">
        <button
          className="flex items-center bg-red-800 py-2 px-4 w-full text-white justify-center rounded text-xs uppercase font-bold"
          onClick={confirmDeleteProduct}
          type="button"
        >
          Eliminar{' '}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          className="flex items-center bg-green-600 py-2 px-4 w-full text-white justify-center rounded text-xs uppercase font-bold"
          onClick={editProduct}
          type="button"
        >
          Editar{' '}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default Product
