import { products } from '~/dummyData/product'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { useEffect } from 'react'
import { getProducts } from '~/redux/actions/product.action'
import { useSelector } from 'react-redux'
import { product } from '~/types/product.type'
import { Link } from 'react-router-dom'

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

const TopSeller = () => {
  const productData = useSelector((state: RootState) => state.product.productList)
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const promise = dispatch(getProduct)
  // }, [dispatch])
  // console.log('data: ', productData)

  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getProducts({ signal }))

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
      <Slider {...settings}>
        {productData.map((item: product) => (
          <div className='md:p-1' key={item.id}>
            <div className='group flex my-2 md:shadow-lg md:w-[180px] flex-col justify-center items-center'>
              <div className='relative overflow-hidden'>
                <img
                  className='object-cover w-[180px] h-[180px] transform transition-transform duration-300 group-hover:scale-110'
                  src={item.coverImage}
                  alt={item.name}
                />
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <div className='grid grid-rows-2'>
                    <Link to={`/productdetail/${item.id}`}>
                    <span className='flex text-white text-lg justify-center items-center'>{item.name}</span>
                    </Link>
                    <span className='flex text-white text-lg justify-center items-center'>
                      {item.price !== undefined && formatPriceToVND(item.price)}
                    </span>
                  </div>
                </div>
              </div>
              <div className='md:hidden mt-2'>{item.name}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TopSeller
