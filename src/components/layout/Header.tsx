import { NavLink } from 'react-router-dom'
import Logo from '../Logo'

export const Header = () => {
  return (
    <header className='w-full text-white bg-black'>
      <div className='container flex items-center justify-around mx-auto'>
        <div className='flex justify-center basis-2/12'>
          <Logo />
        </div>

        <nav className='flex items-center justify-end basis-8/12'>
          <ul className='flex items-center w-full justify-evenly'>
            <NavLink
              to={'/'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Trang chủ
            </NavLink>
            <NavLink
              to={'products'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Sản Phẩm
            </NavLink>
            <NavLink
              to={'customize'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Customize
            </NavLink>
          </ul>
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
