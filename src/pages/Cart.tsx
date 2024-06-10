import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormOrder from '~/components/FormOrder'
import ItemCart from '~/components/ItemCart'
import useKey from '~/hooks/useKey'
import { getAccessoryDetail } from '~/redux/actions/accessory.action'
import { clearCart, removeItemFromCart } from '~/redux/actions/cartItem.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { CartItem } from '~/types/product.type'

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [formOrder, setFormOrder] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.cartItem.cartItemList)
  const accessory = useSelector((state: RootState) => state.accessory.accessory)
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null)



  console.log('access in CART', cart)

  const toggleFormOrder = () => {
    setFormOrder(!formOrder)
  }

  const handleOrderForm = (totalPrice: number) => {
    setOrderTotal(totalPrice)
    toggleFormOrder()
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

    if (quantity === -1 && updatedItems.length !== cartItems.length) {
      dispatch(removeItemFromCart(index))
    }
  }

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    dispatch(removeItemFromCart(index))
  }

  // const showProductDetail = (product: CartItem) => {
  //   setSelectedProduct(product);
  //   if (product.accessId !== undefined) {
  //     dispatch(getAccessoryDetail(product.accessId));
  //     // console.log("VIEW: ", product.accessId);
  //   }
    
  // };
  
  const showProductDetail = (product: CartItem) => {
    setSelectedProduct(product);
    if (product.accessId !== undefined && product.accessId !== null) {
      dispatch(getAccessoryDetail(product.accessId));
    }
  };

  useEffect(() => {
    if (selectedProduct && selectedProduct.accessId !== undefined && selectedProduct.accessId !== null) {
      dispatch(getAccessoryDetail(selectedProduct.accessId));
    }
  }, [selectedProduct]);
  
  
console.log("ACC: ", accessory);

  return (
    <div className='flex flex-col gap-4 my-11 cart-container'>
      <div>
        <div className='flex flex-col justify-start gap-4 overflow-y-auto max-h-96'>
          {formOrder && (
            <FormOrder toggleFormOrder={toggleFormOrder} totalPrice={orderTotal} cartItemsFromProps={cartItems} />
          )}
          {cartItems.map((product, index) => (
            <div key={index}>
              <ItemCart
                item={product}
                onIncrease={() => updateQuantity(index, 1)}
                onDecrease={() => updateQuantity(index, -1)}
                onRemove={() => removeItem(index)}
              />
              <button onClick={() => showProductDetail(product)}>Chi tiết</button>
            </div>

          ))}
        </div>
        <div className='flex justify-end gap-6 mt-4 mr-5'>
          <h1 className='text-xl font-bold'>Tổng cộng: {totalPrice.toLocaleString()} ₫</h1>
          <button
            className='px-2 py-1 bg-black text-white rounded-md md:w-[16%]'
            onClick={() => handleOrderForm(totalPrice)}
          >
            Đặt hàng
          </button>
        </div>
      </div>

      {selectedProduct && (
  <div className='fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
    <div className='bg-white p-8 rounded-md'>
      {/* <h2 className='text-xl font-semibold'>{selectedProduct.accessoryName}</h2> */}
      {accessory && accessory.image && <img className='w-[250px]' src={accessory.image} alt="" />}
      <p>Color: {selectedProduct.colorId}</p>
      <p>Size: {selectedProduct.sizeId}</p>
      <p>Quantity: {selectedProduct.quantity}</p>
      {/* Thêm các thông tin khác tại đây */}
      <button
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
        onClick={() => setSelectedProduct(null)}
      >
        Đóng
      </button>
    </div>
  </div>
)}

    </div>
  )
}

export default Cart
