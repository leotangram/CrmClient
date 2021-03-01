import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import OrderState from '../context/orders/OrderState'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  )
}
