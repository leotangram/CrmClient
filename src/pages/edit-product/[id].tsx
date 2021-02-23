import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const EditProduct = () => {
  const router = useRouter()
  console.log(router.query.id)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
    </Layout>
  )
}

export default EditProduct
