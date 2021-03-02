import { useContext, useEffect, useState } from 'react'
import OrderContext from '@/context/orders/OrderContext'
import { IProduct } from '../../interfaces/IProduct'

const ProductResume = ({ product }: { product: IProduct }) => {
  const { name, price } = product

  const orderContext = useContext(OrderContext)
  const { quantityProducts } = orderContext

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    updateQuantity()
  }, [quantity])

  if (!quantityProducts) return null

  const updateQuantity = () => {
    const newProduct = { ...product, quantity }
    quantityProducts(newProduct)
  }

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>$ {price}</p>
      </div>
      <input
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={event => setQuantity(Number(event.target.value))}
        placeholder="Cantidad"
        type="number"
        value={quantity}
      />
    </div>
  )
}

export default ProductResume
