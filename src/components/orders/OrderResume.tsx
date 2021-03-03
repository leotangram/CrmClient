import { useContext } from 'react'
import OrderContext from '@/context/orders/OrderContext'
import ProductResume from './ProductResume'

const OrderResume = () => {
  const orderContext = useContext(OrderContext)
  const { products } = orderContext

  console.log('products', products)

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Ajusta las cantidades del producto
      </p>
      {products && products.length > 0 ? (
        <>
          {products.map(product => (
            <ProductResume key={product.id} product={product} />
          ))}
        </>
      ) : (
        <>
          <p className="mt-5 text-sm">Aún no hay productos</p>
        </>
      )}
    </>
  )
}

export default OrderResume