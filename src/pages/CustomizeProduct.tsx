import { useEffect, useRef, useState } from 'react'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import swal from 'sweetalert'

import { useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getAccessories } from '~/redux/actions/accessory.action'
import { createCartItem } from '~/redux/actions/cartItem.action'
import { getColors } from '~/redux/actions/color.action'
import { getProductDetail } from '~/redux/actions/product.action'
import { getSizes } from '~/redux/actions/size.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { addCartItem } from '~/types/cartItem.type'
import { CartItem } from '~/types/product.type'

import image from '../../public/assets/cusdefault.jpg'

export default function CustomizeProduct() {
  const color = useSelector((state: RootState) => state.color.colorList)
  const size = useSelector((state: RootState) => state.size.sizeList)
  const accessoryData = useSelector((state: RootState) => state.accessory.accessoryList)
  const productDetail = useSelector((state: RootState) => state.product.productDetail)
  const dispatch = useAppDispatch()
  const swiperRef = useRef<SwiperCore | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedAccess, setSelectedAccess] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [colorPrice, setColorPrice] = useState(0)
  const [priceSum, setPriceSum] = useState(0)
  const [sizePrice, setSizePrice] = useState(0)
  const [accessoryPrice, setAccessoryPrice] = useState(0)
  const [activeSize, setActiveSize] = useState<number | null>(null)
  const [activeColor, setActiveColor] = useState<number | null>(null)
  const userData = useSelector((state: RootState) => state.user.user)
  const userId = userData?.id

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [product] = useState({
    id: 0,
    name: 'Custom product',
    price: 0,
    coverImage: image
  })
  const [cartInfo, setCartInfo] = useState<addCartItem>({
    colorId: 0,
    sizeId: 0,
    accessoryId: 0,
    quantity: 0
  })
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getAccessories({ signal }))
    dispatch(getColors({ signal }))
    dispatch(getSizes({ signal }))
    dispatch(getProductDetail(1))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  // console.log('Accessories List: ', accessoryData)
  // console.log('Colors List: ', color)
  // console.log('Sizes List: ', size)
  // console.log('Product price: ', productDetail)
  console.log('ID NE: ', userData?.id)

  const handleColorSelect = (colorId: number) => {
    setSelectedColor(colorId)
    setActiveColor(colorId)
  }

  const handleSizeSelect = (sizeId: number) => {
    setSelectedSize(sizeId)
    setActiveSize(sizeId)
  }

  const handleAccessSelect = (id: number, index: number) => {
    setSelectedAccess(id)
    swiperRef.current?.slideTo(index)
  }

  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

  useEffect(() => {
    if (selectedColor !== null && selectedSize !== null && selectedAccess !== null) {
      setCartInfo({
        colorId: selectedColor,
        sizeId: selectedSize,
        accessoryId: selectedAccess,
        quantity: quantity
      })

      const selectedAccessory = accessoryData.find((accesspry) => accesspry.id === selectedAccess)
      const selectedColorData = color.find((color) => color.id === selectedColor)
      const selectedSizeData = size.find((size) => size.id === selectedSize)

      const accessoryPrice = selectedAccessory ? selectedAccessory.price : 0
      const colorPrice = selectedColorData ? selectedColorData.price : 0
      const sizePrice = selectedSizeData ? selectedSizeData.price : 0

      setAccessoryPrice(accessoryPrice ?? 0)
      setColorPrice(colorPrice ?? 0)
      setSizePrice(sizePrice ?? 0)
    }
  }, [selectedColor, selectedSize, selectedAccess, accessoryData, color, size, quantity])

  useEffect(() => {
    // const productPrice = productDetail?.price || 0
    // const calculatedTotalPrice = productPrice + colorPrice + sizePrice + accessoryPrice
    const calculatedTotalPrice = colorPrice + sizePrice + accessoryPrice
    setPriceSum(calculatedTotalPrice)
    setTotalPrice(calculatedTotalPrice)
  }, [productDetail, colorPrice, sizePrice, accessoryPrice])

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  useEffect(() => {
    const newTotalPrice = quantity * priceSum
    setTotalPrice(newTotalPrice)
  }, [quantity, priceSum])

  useEffect(() => {
    if (selectedColor !== null && selectedSize !== null && selectedAccess !== null) {
      setCartInfo({
        colorId: selectedColor,
        sizeId: selectedSize,
        accessoryId: selectedAccess,
        quantity: quantity
      })
    }
  }, [selectedColor, selectedSize, selectedAccess, quantity])

  const addToCart = (): Omit<CartItem, 'quantity'> | null => {
    if (product) {
      const productInCart = {
        id: product.id,
        name: product.name,
        price: priceSum || 0,
        image: image
      }

      return productInCart
    }
    return null
  }

  console.log('Cart info: ', cartInfo)

  const handleAddToCart = () => {
    if (activeColor === null || activeSize === null || selectedAccess === null) {
      return
    }
    const productInCart = addToCart()
    if (!productInCart) {
      return
    }

    const newCartItemForStore = {
      cartItem: cartInfo,
      ...(userId && { userId: userId }),
      ...(product.id && { id: product.id })
    }
    dispatch(createCartItem(newCartItemForStore))

    // eslint-disable-next-line prefer-const
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')

    const newLocalStorageCartItem = {
      ...productInCart,
      quantity: cartInfo.quantity,
      sizeId: cartInfo.sizeId,
      colorId: cartInfo.colorId,
      accessId: cartInfo.accessoryId
    }

    const existingProductIndex = cartItems.findIndex(
      (item: addCartItem) =>
        // item.productId === newLocalStorageCartItem.id &&
        item.sizeId === newLocalStorageCartItem.sizeId &&
        item.colorId === newLocalStorageCartItem.colorId &&
        item.accessoryId === newLocalStorageCartItem.accessId
    )

    // const existingProductIndex = cartItems.findIndex((item: CartItem) => item.id === newLocalStorageCartItem.id);

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += newLocalStorageCartItem.quantity
    } else {
      cartItems.push(newLocalStorageCartItem)
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    const event = new CustomEvent('cartUpdated') // tao event khi cái function này chạy
    window.dispatchEvent(event)
    swal({
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      text: '',
      icon: 'success'
    })
  }

  console.log('PRICE: ', totalPrice)

  return (
    <div className='flex flex-col lg:flex-row min-h-screen px-[1%]'>
      <div className='slider-container basis-[55%] grid grid-rows-6 '>
        <div className='row-span-2'></div>
        <Swiper
          speed={500}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className='h-[80%] w-full relative row-span-4'
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 0,
            modifier: 1,
            scale: 0.8,
            slideShadows: false
          }}
          breakpoints={{
            640: {},
            768: {},
            1024: {}
          }}
          navigation={{ nextEl: '.next-slide-controller', prevEl: '.back-slide-controller' }}
          modules={[EffectCoverflow, Navigation]}
        >
          {accessoryData.map((accessories, index) => (
            <SwiperSlide key={index} className='w-[50%] h-full'>
              <img className='object-contain w-full h-full mx-8 ' src={accessories.image} alt={accessories.name} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='flex justify-around row-span-2 slider-controler py-[2%]'>
          <svg
            className='p-2 bg-black rounded-full cursor-pointer back-slide-controller'
            xmlns='http://www.w3.org/2000/svg'
            height='48px'
            viewBox='0 -960 960 960'
            width='48px'
            fill='#e8eaed'
          >
            <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
          </svg>
          <svg
            className='p-2 bg-black rounded-full cursor-pointer next-slide-controller'
            xmlns='http://www.w3.org/2000/svg'
            height='48px'
            viewBox='0 -960 960 960'
            width='48px'
            fill='#e8eaed'
          >
            <path d='M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z' />
          </svg>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center  customize basis-[45%] gap-2 my-3'>
        <div className='border-solid border-black w-[90%]  h-[80%] border-2 py-[2%]'>
          <div className='flex flex-col w-full h-full gap-10 text-center justify-evenly item-center'>
            <div className='w-1/2 relative after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] text-4xl font-bold mx-auto after:lg:w-96 after:sm:w-40'>
              Customize
            </div>
            <div className='w-3/4 relative flex flex-col gap-3 colors after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] mx-auto after:lg:w-96 after:sm:w-40'>
              <label className='text-2xl text-left'>Màu sắc:</label>
              <div className='flex justify-around gap-2 colorbutton'>
                {color.map((color, index) => (
                  <button
                    key={index}
                    className={`border-2 border-[#E5E7E9] w-6 h-6 lg:w-8 lg:h-8  ${activeColor === color.id ? 'text-[#D5DBDB]' : 'text-black'}`}
                    style={{ backgroundColor: color.name }}
                    // onClick={() => handleColorSelect(index)}
                    onClick={() => handleColorSelect(color.id!)}
                  >
                    {activeColor === color.id ? '✓' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div className='w-3/4 relative flex flex-col gap-3 colors after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] mx-auto after:lg:w-96 after:sm:w-40'>
              <label className='mb-1 text-2xl text-left'>Phụ kiện:</label>
              <div className='grid grid-cols-6 gap-6 colorbutton'>
                {accessoryData.map((item, index) => (
                  <button key={item.id} onClick={() => handleAccessSelect(item.id, index)}>
                    <img
                      className='w-10 h-10 lg:w-16 lg:h-16 bg-gray-50 rounded-[10%]'
                      src={item.image}
                      alt={item.name}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className='flex items-center justify-evenly mt-[30px]'>
              <div className='flex gap-4 size '>
                {size.map((size, index) => (
                  <button
                    key={index}
                    className={`border-2 border-black md:shadow-2xl w-6 h-6 bg-black-300 lg:w-8 lg:h-8 ${
                      activeSize === size.id ? 'bg-black text-white' : ' bg-white text-black'
                    } `}
                    onClick={() => handleSizeSelect(size.id!)}
                  >
                    {size.name!}
                  </button>
                ))}
              </div>

              <div className='text-3xl'>|</div>

              <div className='relative flex items-center max-w-[8rem]'>
                <button
                  type='button'
                  id='decrement-button'
                  onClick={decrementQuantity}
                  data-input-counter-decrement='quantity-input'
                  className='p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
                >
                  <svg
                    className='w-3 h-3 text-gray-900 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 2'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M1 1h16'
                    />
                  </svg>
                </button>
                <input
                  type='text'
                  id='quantity-input'
                  value={quantity}
                  data-input-counter
                  aria-describedby='helper-text-explanation'
                  className='bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='999'
                  required
                />
                <button
                  type='button'
                  id='increment-button'
                  onClick={incrementQuantity}
                  data-input-counter-increment='quantity-input'
                  className='p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
                >
                  <svg
                    className='w-3 h-3 text-gray-900 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M9 1v16M1 9h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex mt-2'>
          <h3 className='text-xl md:text-2xl md:mt-2'>Thành tiền: {formatPriceToVND(totalPrice)}</h3>
          <button
            onClick={handleAddToCart}
            className={`px-2 py-3 text-white bg-black lg:mx-9 lg:self-end addtocart ${activeColor === null || activeSize === null || selectedAccess === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  )
}
