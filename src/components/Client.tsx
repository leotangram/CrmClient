import React from 'react'
import Swal from 'sweetalert2'
import { IClient } from '../interfaces/IClient'

const Client = ({ id, name, surname, company, email }: IClient) => {
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
    }).then(result => {
      if (result.isConfirmed) {
        console.log('Eliminando...', id)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
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
