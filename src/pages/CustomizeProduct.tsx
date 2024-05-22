import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { products } from '~/dummyData/product'
import { log } from 'console'

export default function CustomizeProduct() {
  const swiperRef = useRef<SwiperCore | null>(null)
  const colors = [
    '#ffffff',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ffffff',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00'
  ] // Array of colors

  const [quantity, setQuantity] = useState(1)

  const handleColorSelect = (index: number) => {
    if (swiperRef.current) {
      const swiper = swiperRef.current // Get Swiper instance
      const newProgress = index / (colors.length - 1) // Calculate progress based on color index
      //0 to 1
      swiper.setProgress(newProgress, 500) // 500ms speed for transition
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10)
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen px-[1%]'>
      <div className='slider-container basis-[55%] bg-slate-600 grid grid-rows-6 '>
        <div className='row-span-2'></div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className='swiper-container h-[80%] w-full relative row-span-4'
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
          }}
          pagination={{ el: '', clickable: true }}
          navigation={{ nextEl: '.next-slide-controller', prevEl: '.back-slide-controller' }}
          modules={[EffectCoverflow, Pagination, Navigation]}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className='w-[50%] h-full'>
              <img className='object-contain w-full h-full' src={product.img} alt={product.name} />
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

      <div className='flex flex-col items-center justify-center bg-gray-800 customize basis-[45%] gap-2'>
        <div className='border-solid border-red-800 w-[90%] bg-zinc-500 h-[80%] border-2 py-[2%]'>
          <div className='flex flex-col w-full h-full gap-10 text-center justify-evenly item-center'>
            <div className='w-1/2 relative after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] text-4xl font-bold mx-auto after:lg:w-96 after:sm:w-40'>
              Customize
            </div>
            <div className='w-3/4 relative flex flex-col gap-3 colors after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] mx-auto after:lg:w-96 after:sm:w-40'>
              <label className='text-2xl text-left'>Color:</label>
              <div className='flex justify-center gap-8 colorbutton'>
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className='w-8 h-8'
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(index)}
                  ></button>
                ))}
              </div>
            </div>
            <div className='w-3/4 relative flex flex-col gap-3 colors after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] mx-auto after:lg:w-96 after:sm:w-40'>
              <label className='text-2xl text-left'>Item:</label>
              <div className='flex justify-center gap-8 colorbutton'>
                <img className='w-16 h-16 bg-white' alt='' />
                <img className='w-16 h-16 bg-white' alt='' />
                <img className='w-16 h-16 bg-white' alt='' />
              </div>
            </div>
            <div className='flex items-center justify-evenly'>
              <div className='flex gap-10 size'>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
              </div>
              <div className='text-3xl'>|</div>

              <div className='flex quantity justify-evenly gap-9'>
                <button onClick={decrementQuantity}>-</button>
                <input type='number' className='w-8 h-8 bg-white' value={quantity} onChange={handleQuantityChange} />
                <button onClick={incrementQuantity}>+</button>
              </div>
            </div>
          </div>
        </div>
        <button className='p-4 addtocart bg-zinc-700'>Them vao gio hàng</button>
      </div>
    </div>
  )
}
