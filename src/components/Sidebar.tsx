import { useRouter } from 'next/router'
import Link from 'next/link'

const Sidebar = () => {
  const router = useRouter()

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={`text-white block p-2 ${
            router.pathname === '/' && 'bg-blue-800'
          }`}
        >
          <Link href="/">Clientes</Link>
        </li>
        <li
          className={`text-white block p-2 ${
            router.pathname === '/orders' && 'bg-blue-800'
          }`}
        >
          <Link href="/orders">Pedidos</Link>
        </li>
        <li
          className={`text-white block p-2 ${
            router.pathname === '/products' && 'bg-blue-800'
          }`}
        >
          <Link href="/products">Productos</Link>
        </li>
      </nav>
    </aside>
  )
}

export default Sidebar
