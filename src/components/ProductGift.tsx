import Slider from "react-slick"
import { products } from "~/dummyData/product"

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
        {products.map((item) => (
          <div className='md:p-1' key={item.id}>
            {/* <div className='flex md:mt-2 shadow-lg  md:w-[200px] flex-col justify-center s '>
            <img className='object-cover w-[180px] h-[180px]' src={item.img} alt={item.name} />
          </div> */}
            <div className='flex my-2 md:shadow-lg md:w-[180px] flex-col justify-center items-center'>
              <div className='flex md:mt-2 shadow-lg  md:w-[180px] items-center justify-center'>
                <img className='object-cover w-[180px] h-[180px]' src={item.img} alt={item.name} />
              </div>
              <div className='md:hidden'>{item.name}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductGift
