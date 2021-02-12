import React from 'react'
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import { IClient } from '../interfaces/IClient'

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
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

const Client = ({ id, name, surname, company, email }: IClient) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { getClientsSeller } = cache.readQuery({
        query: GET_CLIENTS_SELLER
      })
      cache.writeQuery({
        query: GET_CLIENTS_SELLER,
        data: {
          getClientsSeller: getClientsSeller.filter(
            (currentClient: { id: string }) => currentClient.id !== id
          )
        }
      })
    }
  })

  const confirmDeleteClient = () => {
    Swal.fire({
      title: '¿Deseas eliminar este cliente?',
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
          const { data } = await deleteClient({
            variables: {
              id
            }
          })
          Swal.fire('Eliminar', data.deleteClient, 'success')
        } catch (error) {
          Swal.fire('Eliminar', error.message, 'error')
        }
      }
    })
  }

  return (
    <tr>
      <td className="border px-4 px-4 py-2">
        {name} {surname}
      </td>
      <td className="border px-4 px-4 py-2">{company}</td>
      <td className="border px-4 px-4 py-2">{email}</td>
      <td className="border px-4 px-4 py-2">
        <button
          className="flex items-center bg-red-800 py-2 px-4 w-full text-white justify-center rounded text-xs uppercase font-bold"
          onClick={confirmDeleteClient}
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
    </tr>
  )
}

export default Client
