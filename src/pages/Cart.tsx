import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormOrder from '~/components/FormOrder'
import ItemCart from '~/components/ItemCart'
import useKey from '~/hooks/useKey'
import { RootState } from '~/redux/containers/store'
import { CartItem } from '~/types/product.type'

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [formOrder, setFormOrder] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const cart = useSelector((state: RootState) => state.cartItem.cartItemList)
  console.log("DACCAACC: ", cart);
  
  // console.log("DAAAAAAAAAAAAAAAA", cartItems);
  
  const toggleFormOrder = () => {
    setFormOrder(!formOrder)
  }

  const handleOrderForm = (totalPrice: number) => {
    setOrderTotal(totalPrice);
    toggleFormOrder();
  }
  useKey('Escape', toggleFormOrder)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCartItems(items)
  }, [])

  const updateQuantity = (index: number, quantity: number) => {
    const updatedItems = cartItems
      .map((item, i) => (i === index ? { ...item, quantity: item.quantity + quantity } : item))
      .filter((item) => item.quantity > 0)
    setCartItems(updatedItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedItems))
  }

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedItems))
  }

  return (
    <div className='flex flex-col gap-4 my-11 cart-container'>
      <div>
        <div className='flex flex-col justify-start gap-4 overflow-y-auto max-h-96'>
          {formOrder && <FormOrder toggleFormOrder={toggleFormOrder} totalPrice={orderTotal} cartItemsFromProps={cartItems}  />}
          {cartItems.map((product, index) => (
            <ItemCart
              key={index}
              item={product}
              onIncrease={() => updateQuantity(index, 1)}
              onDecrease={() => updateQuantity(index, -1)}
              onRemove={() => removeItem(index)}
            />
          ))}
        </div>
        <div>
            {cart.map((product) => (
              <h1 key={product.productMaterialId}>{product.colorName}</h1>
            ))}
        </div>
        <div className='flex justify-end gap-6 mt-4 mr-5'>
        <h1 className='text-xl font-bold'>Tổng cộng: {totalPrice.toLocaleString()} ₫</h1>


        {/* <button className='px-2 py-1 text-xl text-white bg-black rounded-md lg:w-[20%] self-end' onClick={toggleFormOrder}>
          Đặt hàng
        </button> */}



        <button className='px-2 py-1 bg-black text-white rounded-md md:w-[16%]' onClick={() => handleOrderForm(totalPrice)}>
          Đặt hàng
        </button>
      </div>
      </div>

  
    </div>
  )
}

export default Cart
