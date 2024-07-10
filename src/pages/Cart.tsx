import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormOrder from '~/components/FormOrder'
import ItemCart from '~/components/ItemCart'
import useKey from '~/hooks/useKey'

import { getAccessoryDetail } from '~/redux/actions/accessory.action'
import { removeItemFromCart } from '~/redux/actions/cartItem.action'
import { getColorDetail } from '~/redux/actions/color.action'
import { getSizeDetail } from '~/redux/actions/size.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { CartItem } from '~/types/product.type'
import '../components/animation/formOrder.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [formOrder, setFormOrder] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.cartItem.cartItemList)
  const accessory = useSelector((state: RootState) => state.accessory.accessory)
  const color = useSelector((state: RootState) => state.color.color)
  const size = useSelector((state: RootState) => state.size.size)
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
  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

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
      const event = new CustomEvent('cartUpdated') // tao event khi cái function này chạy
      window.dispatchEvent(event)
    }
  }

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    dispatch(removeItemFromCart(index))
    const event = new CustomEvent('cartUpdated') // tao event khi cái function này chạy
    window.dispatchEvent(event)
  }

  const showProductDetail = (product: CartItem) => {
    setSelectedProduct(product)
    if (product.accessId !== undefined && product.accessId !== null) {
      dispatch(getAccessoryDetail(product.accessId))
    }
    if (product.colorId !== undefined && product.colorId !== null) {
      dispatch(getColorDetail(product.colorId))
    }
    if (product.sizeId !== undefined && product.sizeId !== null) {
      dispatch(getSizeDetail(product.sizeId))
    }
  }

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.accessId !== undefined && selectedProduct.accessId !== null) {
        dispatch(getAccessoryDetail(selectedProduct.accessId))
      }
      if (selectedProduct.colorId !== undefined && selectedProduct.colorId !== null) {
        dispatch(getColorDetail(selectedProduct.colorId))
      }
      if (selectedProduct.sizeId !== undefined && selectedProduct.sizeId !== null) {
        dispatch(getSizeDetail(selectedProduct.sizeId))
      }
    }
  }, [selectedProduct, dispatch])

  console.log('ACC: ', accessory)
  console.log('COL: ', color)
  console.log('SIZE: ', size)

  return (
    <div className='flex flex-col gap-4 my-11 cart-container h-[60vh]'>
      {cartItems.length > 0 ? (
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
                <div className='flex justify-start md:ml-[210px]'>
                  <button
                    className='px-2 py-1 text-white bg-black rounded-md'
                    onClick={() => showProductDetail(product)}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-end gap-6 mt-4 mr-5'>
            <h1 className='text-xl font-bold'>Tổng cộng: {formatPriceToVND(totalPrice)}</h1>
            <button
              className='px-2 py-1 bg-black text-white rounded-md md:w-[16%] custom-button custom-button:hover'
              onClick={() => handleOrderForm(totalPrice)}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <h1 className='text-xl'>Chưa sản phẩm trong giỏ hàng</h1>
        </div>
      )}

      {selectedProduct && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50'>
          <div className='p-8 bg-white rounded-md'>
            {selectedProduct.accessId
              ? accessory &&
                accessory.image && <img className='w-[250px] rounded-md' src={accessory.image} alt='Accessory' />
              : cart && <></>}
            <div className='mt-[10px] flex justify-center flex-col items-start p-2 border-2 rounded-md'>
              <p>Màu sắc: {color?.name}</p>
              <p>Kích cỡ: {size?.name}</p>
              <p>Số lượng: {selectedProduct.quantity}</p>
            </div>
            <button className='px-4 py-2 mt-4 text-white bg-black rounded-md' onClick={() => setSelectedProduct(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
