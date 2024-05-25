import React, { useState } from 'react'
import FormOrder from '~/components/FormOrder'

const Cart = () => {
  const [formOrder, setFormOrder] = useState(false)

  const toggleFormOrder = () => {
    setFormOrder(!formOrder)
  }

  return (
    <div>
      {/* {formOrder ? <FormOrder toggleFormOrder={toggleFormOrder} /> : ''} */}
      {formOrder && <FormOrder toggleFormOrder={toggleFormOrder} />}
      <h1>Cart</h1>
      <button className='bg-black text-white text-xl px-2 py-1 m-[100px]' onClick={toggleFormOrder}>Đặt hàng</button>
    </div>
  )
}

export default Cart
