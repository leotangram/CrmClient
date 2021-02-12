import React from 'react'
import { useRouter } from 'next/router'

const EditClient = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router

  return <h1>Desde editar</h1>
}

export default EditClient
