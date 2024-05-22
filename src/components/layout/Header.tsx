import Logo from '../Logo'

export const Header = () => {
  return (
    <header className='w-full text-white bg-black'>
      <div className='container flex items-center justify-around mx-auto'>
        <div className='flex justify-start basis-2/12'>
          <Logo />
        </div>

        <nav className='flex items-center justify-end basis-8/12'>
          <ul className='flex items-center w-full justify-evenly'>
            <li>
              <a href='/' className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px]'>
                Trang chủ
              </a>
            </li>
            <li>
              <a href='/products' className='text-white hover:text-gray-400 sm:text-[20px] lg:text-[24px]'>
                Sản phẩm
              </a>
            </li>
            <li>
              <a href='/contact' className='text-white hover:text-gray-400 sm:text-[20px] lg:text-[24px]'>
                Customize
              </a>
            </li>
          </ul>
        </nav>

        <div className='flex gap-4 sm:justify-around lg:justify-evenly basis-2/12'>
          <a href='/cart' className='text-white hover:text-gray-400 sm:text-[20px] text-[24px]'>
            <i className='fa-solid fa-cart-shopping'></i>
          </a>
          <a href='/account' className='text-white hover:text-gray-400 sm:text-[20px] text-[24px]'>
            <i className='fa-solid fa-circle-user'></i>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
