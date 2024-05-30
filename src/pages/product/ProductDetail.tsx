import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { imageType } from '~/dummyData/images'
import { getProductDetail } from '~/redux/actions/product.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const numericId = id ? parseInt(id, 10) : NaN
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const productDetail = useSelector((state: RootState) => state.product.productDetail)
  const dispatch = useAppDispatch()
  console.log('detail: ', productDetail)
  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }
  useEffect(() => {
   

      dispatch(getProductDetail(numericId))

    
  }, [dispatch, numericId])

  const handleClick = (button: string) => {
    setActiveButton(button)
  }

  return (
    <>
      {productDetail ? (
      <div className='grid md:grid-cols-2  grid-cols-1 md:mt-9'>
        <div className='md:col-span-1 mt-6'>
          <div className='grid md:grid-cols-7 sm:grid-cols-4 grid-cols-4 md:gap-2 gap-y-2 md:w-[60%] md:h-[64%] md:ml-[220px]'>
            <div className='md:col-span-1.5 md:row-span-1 sm:col-span-1  col-span-2 flex justify-center items-center'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='../src/assets/p1.png' alt='' />
            </div>
            <div className='md:col-span-4 md:row-span-2 col-span-2 sm:col-span-1 flex justify-center items-center'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='../src/assets/p2.png' alt='' />
            </div>
            <div className='md:col-span-1.5 md:row-span-2 col-span-2 sm:col-span-1 flex justify-center items-center'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='../src/assets/p3.png' alt='' />
            </div>
            <div className='md:col-span-4 md:row-span-1 col-span-2 sm:col-span-1 flex justify-center items-center'>
              <img className='md:h-full md:w-full h-[200px] w-[180px]' src='../src/assets/p4.png' alt='' />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className='grid md:grid-cols-3 grid-cols-1'>
          <div className='md:col-span-1 md:flex md:justify-center hidden'>
            <div className='border-l-2 shadow-2xl border-black h-[80%] md:my-[13%]'></div>
          </div>
          <div className='md:col-span-2 md:justify-end md:items-end md:mt-[8%]'>
            <h1 className='flex md:text-2xl md:mt-0 mt-7 md:justify-start  justify-center font-bold mb-2'>
              {productDetail?.name}
            </h1>
            <span className='flex md:justify-start justify-center'>Sản phẩm liên quan</span>
            <div className='border-b-[1px] shadow-2xl border-black w-[100%] md:w-[95%] my-2'></div>
            <div className='flex gap-3 sm:justify-center items-center my-[25px]'>
              {imageType.map((image) => (
                <button className='md:h-20 md:w-20 mr-[1px] h-[64px] w-[64px]' key={image.id}>
                  <img src={image.img} alt='Image color' />
                </button>
              ))}
            </div>

            {/* SIZE ITEM */}
            {/* <div className='flex gap-8 my-[55px]'>
              <button className='h-9 w-9 border border-black shadow-2xl text-center text-2xl'>S</button>
              <button className='h-9 w-9 border border-black shadow-2xl text-center text-2xl'>M</button>
              <button className='h-9 w-9 border border-black shadow-2xl text-center text-2xl'>L</button>
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
                <button className='bg-gray-200 px-4 py-2 rounded-lg'>-</button>
                <span id='quantity' className='text-lg font-medium'>
                  0
                </span>
                <button className='bg-gray-200 px-4 py-2 rounded-lg'>+</button>
              </div>
              <div className='flex items-center md:mb-[50px]'>
                <button className='border-2 p-1.5  bg-black text-white rounded-lg'>Thêm vào giỏ hàng</button>
              </div>
            </div>

            <div className='border-b-[1px] shadow-2xl border-black w-[100%]  md:w-[95%] my-5'></div>
            <div className='flex justify-center mb-[40px]'>
              <h3 className='md:text-2xl text-xl'>Thành tiền: {productDetail?.price !== undefined && formatPriceToVND(productDetail?.price)}</h3>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <h2>fail</h2>
      )}
    </>
  )
}

export default ProductDetail
