import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { gql, useQuery } from '@apollo/client'
import Layout from '@/components/Layout'
import { useEffect } from 'react'

const BEST_SELLERS = gql`
  query bestSellers {
    bestSellers {
      seller {
        name
        email
      }
      total
    }
  }
`

const BestSellers = () => {
  const { data, loading, startPolling, stopPolling } = useQuery(BEST_SELLERS)

  useEffect(() => {
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])

  if (loading) return <span>Cargando...</span>

  const bestSellers: any[] | undefined = []

  data.bestSellers.forEach((bestSeller: any) => {
    bestSellers.push({
      ...bestSeller.seller[0],
      total: bestSeller.total
    })
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores vendedores</h1>
      <ResponsiveContainer width="99%" height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={bestSellers}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  )
}

export default BestSellers
