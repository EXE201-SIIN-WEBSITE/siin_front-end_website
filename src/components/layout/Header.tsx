import { Link, NavLink } from 'react-router-dom'
import Logo from '../Logo'
import { useState } from 'react'

const Header = () => {
  const [isProductsHovered, setIsProductsHovered] = useState(false)

  return (
    <header className='w-full text-white bg-black'>
      <div className='container flex items-center justify-around mx-auto'>
        <div className='flex justify-center basis-2/12'>
          <Logo />
        </div>

        <nav className='relative flex items-center justify-end basis-8/12'>
          <div className='flex items-center w-full justify-evenly'>
            <NavLink
              to={'/'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Trang chủ
            </NavLink>
            <NavLink
              onMouseEnter={() => setIsProductsHovered(true)}
              onMouseLeave={() => setIsProductsHovered(false)}
              to={'products'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap relative'
            >
              Sản Phẩm
              {isProductsHovered && (
                <div className='absolute left-0 z-10 py-2 text-white bg-black rounded-md min-w-fit top-full'>
                  <Link to='/products/sell' className='block px-4 py-2 hover:bg-gray-200'>
                    Sell
                  </Link>
                  <Link to='/products/buy' className='block px-4 py-2 hover:bg-gray-200'>
                    BUY
                  </Link>
                </div>
              )}
            </NavLink>

            <NavLink
              to={'customize'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Customize
            </NavLink>
          </div>
        </nav>

        <div className='flex gap-4 sm:justify-around lg:justify-evenly basis-2/12'>
          <NavLink className='text-white hover:text-gray-400 sm:text-[20px] text-[24px]' to={'cart'}>
            <i className='fa-solid fa-cart-shopping hover:text-gray-400 sm:text-[20px] text-[24px]'></i>
          </NavLink>
          <a href='/account' className='text-white hover:text-gray-400 sm:text-[20px] text-[24px]'>
            <i className='fa-solid fa-circle-user'></i>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
