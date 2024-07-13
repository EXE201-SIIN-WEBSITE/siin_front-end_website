import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { getProductGift } from '~/redux/actions/product.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { product } from '~/types/product.type'

interface ArrowProps {
  onClick?: () => void
  className?: string
}

const NextArrow: React.FC<ArrowProps> = ({ onClick, className }) => (
  <div
    className={`${className} custom-arrow next-arrow flex  w-12 h-12 md:mt-[140px] absolute 
    bottom-[-1.5rem] md:right-[34%] right-[1%] transform -translate-x-1/2 cursor-pointer z-10`}
    onClick={onClick}
  >
    ➔
  </div>
)

const PrevArrow: React.FC<ArrowProps> = ({ onClick, className }) => (
  <div
    className={`${className} custom-arrow prev-arrow flex md:mt-[140px] w-12 h-12 absolute 
    bottom-[-1.5rem] md:left-[28%] left-[15%] transform -translate-x-1/2 cursor-pointer z-10`}
    onClick={onClick}
  >
    ←
  </div>
)

const ProductGift = () => {
  const productData = useSelector((state: RootState) => state.product.productList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getProductGift({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }


  

  return (
    <div className='w-full'>
     {productData.length > 0 ? (
        <Slider {...settings}>
          {productData.map((item) => (
            <div className='md:p-1' key={item.id}>
              <div className='group flex my-2 md:shadow-lg md:w-[180px] flex-col justify-center items-center'>
                <div className='relative overflow-hidden'>
                  <img
                    className='object-cover w-[180px] h-[180px] transform transition-transform duration-300 group-hover:scale-110'
                    src={item.coverImage}
                    alt={item.name}
                  />
                  <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100'>
                    <div className='grid grid-rows-2'>
                      <Link to={`/productdetail/${item.id}`}>
                        <span className='flex ml-3 text-sm text-white'>{item.name}</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='mt-2 md:hidden'>{item.name}</div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='text-center text-gray-500 text-xl'>Chưa có sản phẩm trong danh mục quà tặng</div>
      )}
    </div>
  )
}

export default ProductGift
