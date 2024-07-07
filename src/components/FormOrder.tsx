/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { payment } from '~/types/payment.type'
import '../components/animation/formOrder.css'

import { unwrapResult } from '@reduxjs/toolkit'
import { Controller, useForm } from 'react-hook-form'
import { clearCart } from '~/redux/actions/cartItem.action'
import { createOrderDetail } from '~/redux/actions/orderDetail.action'
import { createPaymentPayOS } from '~/redux/actions/paymentPayOS.action'
import { cartItem } from '~/types/cartItem.type'
import { district } from '~/types/district.type'
import { OrderDetail } from '~/types/orderDetail.type'
import { orderItem } from '~/types/orderItem.type'
import { province } from '~/types/province.type'
import { ResponseData } from '~/types/respone.type'
import { ward } from '~/types/ward.type'
import { ghnApi } from '~/utils/http'

interface FormOrderProps {
  toggleFormOrder: () => void
  totalPrice: number
  cartItemsFromProps: cartItem[]
}

const FormOrder: React.FC<FormOrderProps> = ({ toggleFormOrder, totalPrice, cartItemsFromProps }) => {
  const { control, handleSubmit, reset } = useForm()
  const elModal = useRef<HTMLDivElement>(null)
  const [isOrderForm, setIsOrderForm] = useState(true)
  const [isThankYou, setIsThankYou] = useState(false)
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.cartItem.cartItemList)
  const [provinces, setProvinces] = useState<province[]>([])
  const [districts, setDistricts] = useState<district[]>([])
  const [wards, setWards] = useState<ward[]>([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const payos = useSelector((state: RootState) => state.payos)
  const [, setSelectedWard] = useState('')

  const orderDetailProps = useSelector((state: RootState) => state.orderDetail)
  const userData = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    // get tinh dau tien
    const fetchProvinces = async () => {
      try {
        const response = await ghnApi.get<ResponseData<province[]>>('/province')
        setProvinces(response.data.data)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      // get tiep district khi co tinh
      const fetchDistricts = async () => {
        try {
          const response = await ghnApi.get<ResponseData<district[]>>(`/district`, {
            params: { province_id: selectedProvince }
          })
          setDistricts(response.data.data)
          setWards([]) // xoa ward khi chon tinh khac con district thi duoc thay boi cai moi
        } catch (error) {
          console.error('Error fetching districts:', error)
        }
      }

      fetchDistricts()
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      setWards(() => [])
      // get ward khi co district
      const fetchWards = async () => {
        try {
          const response = await ghnApi.get<ResponseData<ward[]>>(`/ward`, {
            params: { district_id: selectedDistrict }
          })
          console.log('Wards response:', response.data.data)
          setWards(response.data.data)
        } catch (error) {
          console.error('Error fetching wards:', error)
        }
      }

      fetchWards()
    }
  }, [selectedDistrict, selectedProvince])
  // useEffect(() => {
  //   console.log('Selected District:', selectedDistrict)
  //   console.log('Wards:', wards)
  // }, [selectedDistrict, wards])

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const provinceId = selectedOption.getAttribute('data-id')
    setSelectedProvince(provinceId || '')
    setSelectedDistrict('')
    setSelectedWard('')
    setWards([])
    getData(e)
  }

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const districtId = selectedOption.getAttribute('district-id')
    setSelectedDistrict(districtId || '')
    getData(e)
  }

  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

  // console.log('ITEM PASS: ', cartItemsFromProps)
  // console.log('CÂCCAC: ', cart)

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setOrderItem] = useState<orderItem>({
    quantity: 0,
    price: totalPrice,
    productMaterialId: 0,
    orderDetailId: 0,
    status: true
  })

  // console.log('O ITEM: ', orderItem)

  useEffect(() => {
    if (cartItemsFromProps.length > 0) {
      const updatedCartItems = cart.map((item) => ({
        productId: item.productId,
        productMaterialId: item.productMaterialId,
        sizeName: item.sizeName || '',
        colorName: item.colorName || '',
        accessoryName: item.accessoryName || ''
      }))

      const mergedCartItems = updatedCartItems
        .map((item, index) => ({
          ...item,
          quantity: cartItemsFromProps[index]?.quantity || 0
        }))
        .filter((item) => item.quantity > 0)

      setOrderDetail((prevState) => ({
        ...prevState,
        cartItems: mergedCartItems
      }))
    }
  }, [cart, cartItemsFromProps])

  useEffect(() => {
    const filteredCartItems = orderDetail.cartItems.filter((item) => item.quantity > 0)

    if (filteredCartItems.length > 0) {
      const firstItem = filteredCartItems[0]
      setOrderItem((prevOrderItem) => ({
        ...prevOrderItem,
        quantity: firstItem.quantity,
        productMaterialId: firstItem.productMaterialId,
        orderDetailId: 0
      }))
    } else {
      setOrderItem({
        quantity: 0,
        price: totalPrice,
        productMaterialId: 0,
        orderDetailId: 0,
        status: true
      })
    }
  }, [orderDetail.cartItems, totalPrice])

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
  // console.log('data inserted: ', payment)

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

  // const onSubmit = async (data: any) => {
  //   const filteredOrderDetail = {
  //     ...orderDetail,
  //     orderDetailRequestDTO: data,
  //     cartItems: orderDetail.cartItems.filter((item) => item.quantity > 0)
  //   }
  //   dispatch(createOrderDetail({ data: filteredOrderDetail, userId: userData?.id }))
  //   localStorage.removeItem('cartItems')
  //   setOrderDetail(initialOrderDetail)
  //   reset()
  //   setIsOrderForm(false)
  // }

  const onSubmit = async (data: any) => {
    const orderDetailRequestDTO = { ...data };
    const filteredOrderDetail = {
      ...orderDetail,
      orderDetailRequestDTO,
      cartItems: orderDetail.cartItems.filter((item) => item.quantity > 0)
    };
  
    if (userData?.id) {
      dispatch(createOrderDetail({ data: { orderDetailRequestDTO }, userId: userData.id }));
    } else {
      dispatch(createOrderDetail({ data: filteredOrderDetail }));
    }
  
    localStorage.removeItem('cartItems');
    setOrderDetail(initialOrderDetail);
    reset();
    setIsOrderForm(false);
  };
  
  

  console.log('order: ', orderDetail)
  console.log('PRICE: ', totalPrice)

  const validatePhoneNumber = (value: string) => {
    const phoneNumberRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/
    if (!value) return 'Vui lòng điền số điện thoại'
    if (!phoneNumberRegex.test(value)) return 'Số điện thoại không có thật'
    return true
  }

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return 'Vui lòng điền email'
    if (!emailRegex.test(value)) return 'Email không có thật'
    return true
  }

  const handlePaymentSubmit = async () => {
    try {
      const abort = new AbortController()
      const signal = abort.signal
      const res = await dispatch(createPaymentPayOS({ id: orderDetailProps.orderDetail?.id || 0, signal }))
      const paymentData = unwrapResult(res)
      if (paymentData.checkoutUrl) {
        window.open(paymentData.checkoutUrl, '_blank')
        setIsThankYou(true)
        dispatch(clearCart())
      } else {
        console.error('No checkoutUrl found in response')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
    }
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
          <form
            className='w-[230px] h-[400px] md:w-[600px] md:h-auto overflow-y-auto'
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  <div className='grid items-center grid-cols-1 m-2 mb-4 md:grid-cols-4'>
                    <div className='md:col-span-1'>
                      <label htmlFor='name' className='mb-2 font-bold text-gray-700'>
                        Họ và tên
                      </label>
                    </div>
                    <div className='md:col-span-3'>
                      <Controller
                        name='nameCustomer'
                        control={control}
                        rules={{ required: 'Bạn vui lòng nhập họ và tên' }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              type='text'
                              id='nameCustomer'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                getData(e)
                              }}
                              className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            />
                            {error && <span className='ml-1 italic text-red-400'>{error.message}</span>}
                          </>
                        )}
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
                      <Controller
                        name='email'
                        control={control}
                        rules={{ validate: validateEmail }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              type='text'
                              id='email'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                getData(e)
                              }}
                              className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            />
                            {error && <span className='ml-1 italic text-red-400'>{error.message}</span>}
                          </>
                        )}
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
                      <Controller
                        name='phone'
                        control={control}
                        rules={{ validate: validatePhoneNumber }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              type='text'
                              id='phone'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                getData(e)
                              }}
                              className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            />
                            {error && <span className='ml-1 italic text-red-400'>{error.message}</span>}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-3'>
                    <div className='items-center m-2 mb-4'>
                      <Controller
                        name='province'
                        control={control}
                        defaultValue=''
                        rules={{ required: 'Vui lòng chọn tỉnh' }}
                        render={({ field, fieldState }) => (
                          <>
                            <select
                              id='province'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                handleProvinceChange(e)
                              }}
                              className='w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            >
                              <option value='' data-id=''>
                                Chọn Tỉnh
                              </option>
                              {provinces.map((province) => (
                                <option
                                  key={province.ProvinceID}
                                  value={province.ProvinceName}
                                  data-id={province.ProvinceID}
                                >
                                  {province.ProvinceName}
                                </option>
                              ))}
                            </select>
                            {fieldState.error && (
                              <span className='ml-1 italic text-red-400'>{fieldState.error.message}</span>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className='items-center m-2 mb-4'>
                      <Controller
                        name='district'
                        control={control}
                        defaultValue=''
                        rules={{ required: 'Vui lòng chọn quận/huyện' }}
                        render={({ field, fieldState }) => (
                          <>
                            <select
                              id='district'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                handleDistrictChange(e)
                              }}
                              disabled={!selectedProvince}
                              className='w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            >
                              <option value=''>Chọn Quận/Huyện</option>
                              {districts.map((district) => (
                                <option
                                  key={district.DistrictID}
                                  value={district.DistrictName}
                                  district-id={district.DistrictID}
                                >
                                  {district.DistrictName}
                                </option>
                              ))}
                            </select>
                            {fieldState.error && (
                              <span className='ml-1 italic text-red-400'>{fieldState.error.message}</span>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className='items-center m-2 mb-4'>
                      <Controller
                        name='ward'
                        control={control}
                        defaultValue=''
                        rules={{ required: 'Vui lòng chọn phường/xã' }}
                        render={({ field, fieldState }) => (
                          <>
                            <select
                              id='ward'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setSelectedWard(e.target.value)
                              }}
                              disabled={!selectedDistrict}
                              className='w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            >
                              <option value=''>Chọn Phường/Xã</option>
                              {wards.map((ward) => (
                                <option key={ward.DistrictID} value={ward.WardName}>
                                  {ward.WardName}
                                </option>
                              ))}
                            </select>
                            {fieldState.error && (
                              <span className='ml-1 italic text-red-400'>{fieldState.error.message}</span>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid items-center m-2 mb-4 md:grid-cols-4'>
                    <div className='col-span-1'>
                      <label htmlFor='address' className='mb-2 font-bold text-gray-700'>
                        Địa chỉ
                      </label>
                    </div>
                    <div className='col-span-3'>
                      <Controller
                        name='address'
                        control={control}
                        rules={{ required: 'Bạn vui lòng nhập địa chỉ (tên đường/số nhà)' }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              type='text'
                              id='address'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                getData(e)
                              }}
                              className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            />
                            {error && <span className='ml-1 italic text-red-400'>{error.message}</span>}
                          </>
                        )}
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
                      <Controller
                        name='note'
                        control={control}
                        // rules={{ required: 'Bạn vui lòng nhập địa chỉ (tên đường/số nhà)' }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              type='text'
                              id='note'
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                getData(e)
                              }}
                              className='md:w-full px-3 py-2 border border-gray-300 bg-[#AAAAAA] rounded-md'
                            />
                            {error && <span className='ml-1 italic text-red-400'>{error.message}</span>}
                          </>
                        )}
                      />
                      {/* <input
                        type='text'
                        id='note'
                        name='note'
                        onChange={getData}
                        className='md:w-full px-3 py-2 border border-gray-300  bg-[#AAAAAA] rounded-md'
                      /> */}
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
                      className={` border-2 px-3 ${payment.typePayment === 'Thanh toán online' ? 'bg-black border-black text-white' : 'border-black text-black'}`}
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
                          <img src='/assets/qr.png' alt='QR Code' className='md:w-32 md:h-32 w-28' />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className='flex justify-end mb-4'>GIÁ TRỊ</h2>
                      <h3 className='flex justify-end mb-4'>
                        {payment.total !== undefined && formatPriceToVND(payment.total)}
                      </h3>
                      <h3 className='flex justify-end mb-4 mt-[30px] ml-[50px]'>
                        Thành tiền: {payment.total !== undefined && formatPriceToVND(payment.total)}
                      </h3>
                    </div>
                  </div>

                  <div className='flex justify-center m-2'>
                    {!payos.loading ? (
                      <button
                        type='button'
                        className='px-4 py-2 text-white bg-black rounded-md custom-button custom-button:hover'
                        onClick={handlePaymentSubmit}
                      >
                        Thanh toán
                      </button>
                    ) : (
                      <div role='status'>
                        <svg
                          aria-hidden='true'
                          className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    )}
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
