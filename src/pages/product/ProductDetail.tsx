import { useState } from 'react'
import { imageType } from '~/dummyData/images'

const ProductDetail = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (button: string) => {
    setActiveButton(button)
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 md:mt-9'>
        <div className='mt-6 md:col-span-1'>
          <div className='grid md:grid-cols-7 sm:grid-cols-4 grid-cols-4 md:gap-2 gap-y-2 md:w-[60%] md:h-[64%] md:ml-[220px]'>
            <div className='md:col-span-1.5 md:row-span-1 sm:col-span-1  col-span-2 flex justify-center items-center'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='./assets/p1.png' alt='' />
            </div>
            <div className='flex items-center justify-center col-span-2 md:col-span-4 md:row-span-2 sm:col-span-1'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='./assets/p2.png' alt='' />
            </div>
            <div className='md:col-span-1.5 md:row-span-2 col-span-2 sm:col-span-1 flex justify-center items-center'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='./assets/p3.png' alt='' />
            </div>
            <div className='flex items-center justify-center col-span-2 md:col-span-4 md:row-span-1 sm:col-span-1'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='./assets/p4.png' alt='' />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className='grid grid-cols-1 md:grid-cols-3'>
          <div className='hidden md:col-span-1 md:flex md:justify-center'>
            <div className='border-l-2 shadow-2xl border-black h-[80%] md:my-[13%]'></div>
          </div>
          <div className='md:col-span-2 md:justify-end md:items-end md:mt-[8%]'>
            <h1 className='flex justify-center mb-2 font-bold md:text-2xl md:mt-0 mt-7 md:justify-start'>
              Vòng tay SUMMER NG.UESTOLIAS 020901
            </h1>
            <span className='flex justify-center md:justify-start'>Sản phẩm liên quan</span>
            <div className='border-b-[1px] shadow-2xl border-black w-[100%] md:w-[95%] my-2'></div>
            <div className='flex gap-3 sm:justify-center items-center my-[25px]'>
              {imageType.map((image) => (
                <button className='md:h-20 md:w-20 mr-[1px] h-[64px] w-[64px]  ' key={image.id}>
                  <img src={image.img} alt='Image color' />
                </button>
              ))}
            </div>

            {/* SIZE ITEM */}
            {/* <div className='flex gap-8 my-[55px]'>
              <button className='text-2xl text-center border border-black shadow-2xl h-9 w-9'>S</button>
              <button className='text-2xl text-center border border-black shadow-2xl h-9 w-9'>M</button>
              <button className='text-2xl text-center border border-black shadow-2xl h-9 w-9'>L</button>
            </div> */}
            <div className='flex md:gap-8 justify-center  md:justify-start gap-2 my-[55px]'>
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleClick(size)}
                  className={`h-9 w-9 border border-black md:shadow-2xl text-center md:text-2xl ${
                    activeButton === size ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className='flex md:justify-start justify-center md:gap-11 gap-x-[10px]'>
              <div className='flex items-center gap-2 md:gap-[40px] md:mb-[50px]'>
                <button className='px-4 py-2 bg-gray-200 rounded-lg'>-</button>
                <span id='quantity' className='text-lg font-medium'>
                  0
                </span>
                <button className='px-4 py-2 bg-gray-200 rounded-lg'>+</button>
              </div>
              <div className='flex items-center md:mb-[50px]'>
                <button className='border-2 p-1.5  bg-black text-white rounded-lg'>Thêm vào giỏ hàng</button>
              </div>
            </div>

            <div className='border-b-[1px] shadow-2xl border-black w-[100%]  md:w-[95%] my-5'></div>
            <div className='flex justify-center mb-[40px]'>
              <h3 className='text-xl md:text-2xl'>Thành tiền: 250.000đ</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
