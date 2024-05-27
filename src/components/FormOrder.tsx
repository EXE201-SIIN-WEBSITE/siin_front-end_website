import React, { useEffect, useRef, useState } from 'react'
import '../components/animation/formOrder.css'

interface FormOrderProps {
  toggleFormOrder: () => void
}

const FormOrder: React.FC<FormOrderProps> = ({ toggleFormOrder }) => {
  const elModal = useRef<HTMLDivElement>(null)
  const [isOrderForm, setIsOrderForm] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isThankYou, setIsThankYou] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOrderForm(false)
  }
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
                        name='name'
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
                        className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-3'>
                    <div className='items-center m-2 mb-4'>
                      <select
                        id='province'
                        name='province'
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
