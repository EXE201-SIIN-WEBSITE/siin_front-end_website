import React, { useEffect, useRef, useState } from 'react'
import '../components/animation/formOrder.css'
import { orderDetail } from '~/types/orderDetail.type'
import { useAppDispatch } from '~/redux/containers/store'
import { createOrderDetail } from '~/redux/actions/orderDetail.action'
import { orderItem } from '~/types/orderItem.type'
import { CartItem } from '~/types/product.type'
import { createOrderItem } from '~/redux/actions/orderItem.action'

interface FormOrderProps {
  toggleFormOrder: () => void
  totalPrice: number
}

const FormOrder: React.FC<FormOrderProps> = ({ toggleFormOrder, totalPrice }) => {
  const elModal = useRef<HTMLDivElement>(null)
  const [isOrderForm, setIsOrderForm] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isThankYou, setIsThankYou] = useState(false)
  const dispatch = useAppDispatch()

  const [orderDetail, setOrderDetail] = useState<Omit<orderDetail, 'id'>>({
    total: totalPrice,
    orderStatus: 'Xác nhận đơn hàng',
    status: true,
    nameCustomer: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    email: '',
    note: '',
    userId: 0
  })

  const getData = (e: any) => {
    setOrderDetail({ ...orderDetail, [e.target.name]: e.target.value })
  }

  console.log('data inserted: ', orderDetail)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   dispatch(createOrderDetail(orderDetail))
  //   setIsOrderForm(false)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const action = await dispatch(createOrderDetail(orderDetail));
      if (createOrderDetail.fulfilled.match(action)) {
        const createdOrderDetail = action.payload;
        console.log('PAYLOAD: ', action.payload);
        
        const orderDetailId = createdOrderDetail.id;
        console.log('IDIDIDID: ', orderDetailId);


        // Retrieve cart items from localStorage
        const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

        // Create order items for each item in the cart
        for (const item of cartItems) {
          const orderItemData: orderItem = {
            id: 0,
            quantity: item.quantity,
            price: item.price,
            productId: item.id,
            orderDetailId: orderDetailId,
            status: true
          };
          await dispatch(createOrderItem(orderItemData));
        }
        
        setIsOrderForm(false);
      } else {
        console.error('Failed to create order detail:', action.payload);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handlePaymentSubmit = () => {
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
                      className={`border-2 px-3 ${paymentMethod === 'online' ? 'bg-black border-black text-white' : 'border-black text-black'}`}
                    >
                      <button type='button' onClick={() => handlePaymentMethodChange('online')}>
                        THANH TOÁN ONLINE
                      </button>
                    </div>
                    <div
                      className={`border-2 px-3 ${paymentMethod === 'cod' ? 'bg-black border-black text-white' : 'border-black text-black'}`}
                    >
                      <button type='button' onClick={() => handlePaymentMethodChange('cod')}>
                        THANH TOÁN KHI NHẬN HÀNG
                      </button>
                    </div>
                  </div>

                  <div className='flex justify-around'>
                    <div>
                      {paymentMethod === 'online' && (
                        <div>
                          <img src='/assets/qr.png' alt='QR Code' className='w-32 h-32' />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className='flex justify-end mb-4'>GIÁ TRỊ</h2>
                      <h3 className='flex justify-end mb-4'>76.000 VND</h3>
                      <h3 className='flex justify-end mb-4'>Thành tiền: 76.000 VND</h3>
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
