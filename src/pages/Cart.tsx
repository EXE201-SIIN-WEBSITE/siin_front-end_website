import { useEffect, useState } from 'react'
import FormOrder from '~/components/FormOrder'
import ItemCart from '~/components/ItemCart'
import { products } from '~/dummyData/product'
import useKey from '~/hooks/useKey'

const Cart = () => {
  const [formOrder, setFormOrder] = useState(false)

  const totalPrice = products.reduce((total, product) => total + product.price, 0)

  const toggleFormOrder = () => {
    setFormOrder(!formOrder)
  }
  useKey('Escape', toggleFormOrder)

  useEffect(() => {})

  return (
    <div className='flex flex-col gap-4 my-11 cart-container'>
      <div className='flex flex-col justify-start gap-4 overflow-y-auto max-h-96'>
        {formOrder && <FormOrder toggleFormOrder={toggleFormOrder} />}

        {products.map((product) => (
          <ItemCart key={product.id} item={product} />
        ))}
      </div>

      <div className='flex items-center justify-end gap-6'>
        <h1 className='text-xl'>Tổng cộng: {totalPrice}</h1>
        <button className='px-2 py-1 text-xl text-white bg-black w-[40%] lg:w-[20%] self-end' onClick={toggleFormOrder}>
          Đặt hàng
        </button>
      </div>
    </div>
  )
}

export default Cart
