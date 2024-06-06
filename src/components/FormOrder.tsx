import React, { useEffect, useRef, useState } from 'react'

import '../components/animation/formOrder.css'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { payment } from '~/types/payment.type'
import { createPayment } from '~/redux/actions/payment.action'
import { useSelector } from 'react-redux'

import { createOrderDetail } from '~/redux/actions/orderDetail.action'
import { OrderDetail } from '~/types/orderDetail.type'
import { cartItem } from '~/types/cartItem.type'
import { clearCart } from '~/redux/actions/cartItem.action'
import { orderItem } from '~/types/orderItem.type'
import { createOrderItem } from '~/redux/actions/orderItem.action'

interface FormOrderProps {
  toggleFormOrder: () => void
  totalPrice: number
  cartItemsFromProps: cartItem[]
}

const FormOrder: React.FC<FormOrderProps> = ({ toggleFormOrder, totalPrice, cartItemsFromProps }) => {
  const elModal = useRef<HTMLDivElement>(null)
  const [isOrderForm, setIsOrderForm] = useState(true)
  const [isThankYou, setIsThankYou] = useState(false)
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.cartItem.cartItemList)

  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

  console.log('CÂCCAC: ', cartItemsFromProps)
  console.log('CÂCCAC: ', cart)

  const initialOrderDetail = {
    cartItems: [],
    orderDetailRequestDTO: {
      nameCustomer: '',
      phone: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      email: '',
      note: ''
    }
  }

  const [orderDetail, setOrderDetail] = useState<OrderDetail>(initialOrderDetail)

  const [orderItem, setOrderItem] = useState<orderItem>({
    quantity: 0,
    price: totalPrice,
    productMaterialId: 0,
    orderDetailId: 0,
    status: true
  })

  console.log("O ITEM: ", orderItem);
  
 
  

  useEffect(() => {
    if (cartItemsFromProps.length > 0) {
      const updatedCartItems = cart.map((item) => ({
        productId: item.productId,
        productMaterialId: item.productMaterialId,
        sizeName: item.sizeName || '',
        colorName: item.colorName || '',
        accessoryName: item.accessoryName || ''
      }))

      const mergedCartItems = updatedCartItems.map((item, index) => ({
        ...item,
        quantity: cartItemsFromProps[index]?.quantity || 0
      }))


      setOrderDetail((prevState) => ({
        ...prevState,
        cartItems: mergedCartItems
      }))
    }
  }, [cart, cartItemsFromProps])

  useEffect(() => {
    if (orderDetail.cartItems.length > 0) {
      const firstItem = orderDetail.cartItems[0] 
      setOrderItem((prevOrderItem) => ({
        ...prevOrderItem,
        quantity: firstItem.quantity,
        productMaterialId: firstItem.productMaterialId,
        orderDetailId: 0 
      }))
    }
  }, [orderDetail])

  console.log('Updated orderDetail: ', orderDetail)

  const [payment, setPayment] = useState<payment>({
    id: 0,
    status: true,
    typePayment: '',
    total: totalPrice,
    orderDetailId: 0
  })

  const getData = (e: any) => {
    const { name, value } = e.target
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      orderDetailRequestDTO: {
        ...prevOrderDetail.orderDetailRequestDTO,
        [name]: value
      }
    }))
  }

  const getDataPayment = (value: string) => {
    setPayment((prevPayment) => ({
      ...prevPayment,
      typePayment: value
    }))
  }
  console.log('data inserted: ', payment)

  const handleClickOutside = (e: MouseEvent) => {
    if (elModal.current && !elModal.current.contains(e.target as Node)) {
      toggleFormOrder()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
    
      const resultAction = await dispatch(createOrderDetail(orderDetail));
      if (createOrderDetail.fulfilled.match(resultAction)) {
        const orderDetailId = resultAction.payload.id;
        const updatedOrderItem = {
          ...orderItem,
          orderDetailId: orderDetailId,
        
        };
        await dispatch(createOrderItem(updatedOrderItem));
        setPayment((prevPayment) => ({
          ...prevPayment,
          orderDetailId: orderDetailId,
        }));
  
        setIsOrderForm(false);

        const updatedCartItems = orderDetail.cartItems.map((item) => ({
          ...item,
          productId: 0,
          productMaterialId: 0,
        }));
  
        setOrderDetail((prevState) => ({
          ...prevState,
          cartItems: updatedCartItems,
        }));
  
        localStorage.removeItem('cartItems');
        setOrderDetail(initialOrderDetail);
  
        dispatch(clearCart());
      } else {
        console.error('Failed to create order detail:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error occurred during order submission:', error);
    }
  };
  

  const handlePaymentSubmit = () => {
    dispatch(createPayment(payment))
    setIsThankYou(true)
  }

  return (
    <div className='overlay'>
      <div className='animate-slide-in' ref={elModal}>
        {isThankYou ? (
          <div className='w-[600px] h-auto'>
            <div className='flex justify-between'>
              <img className='md:w-[58px] md:h-48px]' src='./assets/logoform.png' alt='' />
              <div>
                <i
                  className='flex items-center px-3 py-1 text-white bg-black rounded-md fa-solid fa-xmark md:mt-1 custom-button custom-button:hover'
                  onClick={toggleFormOrder}
                ></i>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center p-4'>
              <h2 className='mb-4 text-2xl font-bold'>Hoàn thành - Cảm ơn!</h2>
              <p className='mb-4'>
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
              </p>
              <div className='p-2 m-4 text-white bg-black rounded-md custom-button custom-button:hover'>
                <a>Xem lại đơn đặt hàng của bạn</a>
              </div>
              <button
                className='px-4 py-2 text-white bg-black rounded-md custom-button custom-button:hover'
                onClick={toggleFormOrder}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <form className='w-[600px] h-auto' onSubmit={handleSubmit}>
            {isOrderForm ? (
              <>
                <div className='flex justify-between'>
                  <img className='md:w-[58px] md:h-48px]' src='./assets/logoform.png' alt='' />
                  <div>
                    <i
                      className='flex items-center px-3 py-1 text-white bg-black rounded-md fa-solid fa-xmark md:mt-1 custom-button custom-button:hover'
                      onClick={toggleFormOrder}
                    ></i>
                  </div>
                </div>
                <div>
                  <div className='grid items-center m-2 mb-4 md:grid-cols-4'>
                    <div className='col-span-1'>
                      <label htmlFor='name' className='mb-2 font-bold text-gray-700'>
                        Họ và tên
                      </label>
                    </div>
                    <div className='col-span-3'>
                      <input
                        type='text'
                        id='name'
                        name='nameCustomer'
                        onChange={getData}
                        className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA]  rounded-md'
                      />
                    </div>
                  </div>

                  <div className='grid items-center m-2 mb-4 md:grid-cols-4'>
                    <div className='col-span-1'>
                      <label htmlFor='email' className='mb-2 font-bold text-gray-700'>
                        Email
                      </label>
                    </div>
                    <div className='col-span-3'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={getData}
                        className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                      />
                    </div>
                  </div>

                  <div className='grid items-center m-2 mb-4 md:grid-cols-4'>
                    <div className='col-span-1'>
                      <label htmlFor='phone' className='mb-2 font-bold text-gray-700'>
                        Số điện thoại
                      </label>
                    </div>
                    <div className='col-span-3'>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        onChange={getData}
                        className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-3'>
                    <div className='items-center m-2 mb-4'>
                      <select
                        id='province'
                        name='province'
                        onChange={getData}
                        className='w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                      >
                        <option value='location1'>Tỉnh/Thành</option>
                        <option value='location2'>Địa chỉ 2</option>
                        <option value='location3'>Địa chỉ 3</option>
                      </select>
                    </div>
                    <div className='items-center m-2 mb-4'>
                      <select
                        id='district'
                        name='district'
                        onChange={getData}
                        className='w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                      >
                        <option value='location1'>Quận/Huyện</option>
                        <option value='location2'>Địa chỉ 2</option>
                        <option value='location3'>Địa chỉ 3</option>
                      </select>
                    </div>
                    <div className='items-center m-2 mb-4'>
                      <select
                        id='ward'
                        name='ward'
                        onChange={getData}
                        className='w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                      >
                        <option value='location1'>Phường/Xã</option>
                        <option value='location2'>Địa chỉ 2</option>
                        <option value='location3'>Địa chỉ 3</option>
                      </select>
                    </div>
                  </div>

                  <div className='grid items-center m-2 mb-4 md:grid-cols-4'>
                    <div className='col-span-1'>
                      <label htmlFor='address' className='mb-2 font-bold text-gray-700'>
                        Địa chỉ
                      </label>
                    </div>
                    <div className='col-span-3'>
                      <input
                        type='text'
                        id='address'
                        name='address'
                        onChange={getData}
                        className='md:w-full px-3 py-2 border border-gray-300 rounded-md bg-[#AAAAAA]'
                      />
                    </div>
                  </div>

                  <div className='grid items-center m-2 mb-4 md:grid-cols-4'>
                    <div className='col-span-1'>
                      <label htmlFor='note' className='mb-2 font-bold text-gray-700'>
                        Ghi chú
                      </label>
                    </div>
                    <div className='col-span-3'>
                      <input
                        type='text'
                        id='note'
                        name='note'
                        onChange={getData}
                        className='md:w-full px-3 py-2 border border-gray-300  bg-[#AAAAAA] rounded-md'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex justify-end m-2'>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-black rounded-md custom-button custom-button:hover'
                  >
                    Xác nhận
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='flex justify-between'>
                  <img className='md:w-[58px] md:h-48px]' src='./assets/logoform.png' alt='' />
                  <div>
                    <i
                      className='flex items-center px-3 py-1 text-white bg-black rounded-md fa-solid fa-xmark md:mt-1 custom-button custom-button:hover'
                      onClick={toggleFormOrder}
                    ></i>
                  </div>
                </div>
                <div className='m-2'>
                  <h2 className='flex justify-center mb-4 text-xl font-bolds'>Phương Thức Thanh Toán</h2>
                  <div className='flex m-4 md:justify-evenly'>
                    <div
                      className={`border-2 px-3 ${payment.typePayment === 'Thanh toán online' ? 'bg-black border-black text-white' : 'border-black text-black'}`}
                    >
                      <button type='button' onClick={() => getDataPayment('Thanh toán online')}>
                        THANH TOÁN ONLINE
                      </button>
                    </div>
                    <div
                      className={`border-2 px-3 ${payment.typePayment === 'Thanh toán khi nhận hàng' ? 'bg-black border-black text-white' : 'border-black text-black'}`}
                    >
                      <button type='button' onClick={() => getDataPayment('Thanh toán khi nhận hàng')}>
                        THANH TOÁN KHI NHẬN HÀNG
                      </button>
                    </div>
                  </div>

                  <div className='flex justify-around'>
                    <div>
                      {payment.typePayment === 'Thanh toán online' && (
                        <div>
                          <img src='/assets/qr.png' alt='QR Code' className='w-32 h-32' />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className='flex justify-end mb-4'>GIÁ TRỊ</h2>
                      <h3 className='flex justify-end mb-4'>
                        {payment.total !== undefined && formatPriceToVND(payment.total)}
                      </h3>
                      <h3 className='flex justify-end mb-4'>
                        Thành tiền: {payment.total !== undefined && formatPriceToVND(payment.total)}
                      </h3>
                    </div>
                  </div>

                  <div className='flex justify-center m-2'>
                    <button
                      type='button'
                      className='px-4 py-2 text-white bg-black rounded-md custom-button custom-button:hover'
                      onClick={handlePaymentSubmit}
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default FormOrder
