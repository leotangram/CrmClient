import Head from 'next/head'
import { FC } from 'react'
import Sidebar from './Sidebar'

const Layout: FC = ({ children }) => (
  <>
    <Head>
      <title>CRM - Administración de clientes</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
        crossOrigin="anonymous"
      />
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
    </Head>
    <Sidebar />
    {children}
  </>
)

export default Layout
