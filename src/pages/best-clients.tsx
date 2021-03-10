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

const BEST_CLIENTS = gql`
  query bestClients {
    bestClients {
      client {
        name
        company
      }
      total
    }
  }
`

const BestClients = () => {
  const { data, loading, startPolling, stopPolling } = useQuery(BEST_CLIENTS)

  useEffect(() => {
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])

  if (loading) return <span>Cargando...</span>

  const bestClients: any[] | undefined = []

  data.bestClients.forEach((bestClient: any) => {
    bestClients.push({
      ...bestClient.client[0],
      total: bestClient.total
    })
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores clients</h1>
      <ResponsiveContainer width="99%" height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={bestClients}
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

export default BestClients
