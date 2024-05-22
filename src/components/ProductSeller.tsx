import { products } from '~/dummyData/product'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const NextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} custom-arrow next-arrow flex items-center justify-center w-8 h-8 bg-black bg-opacity-50 text-white rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      ➔
    </div>
  )
}

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} custom-arrow prev-arrow flex items-left bg-black justify-center w-8 h-8  bg-opacity-50 text-white rounded-full absolute left-[-20px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      ←
    </div>
  )
}

const ProductSeller = () => {
  const settings = {
    dots: true,
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
    <div className='w-full mx-auto overflow-hidden'>
      <Slider {...settings}>
        {products.map((item) => (
          <div className='p-1' key={item.id}>
            <div className='mt-2  shadow-lg w-[200px] h-[250px]'>
              <img className='object-cover w-[200px] h-[250px]' src={item.img} alt={item.name} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductSeller
