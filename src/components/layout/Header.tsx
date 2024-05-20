import React from 'react'

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className='bg-black text-white p-4 w-full'>
      <div className='container mx-auto flex justify-between  items-center'>
        <h1 className='text-[30px] md:text-left ml-[120px]'>{title}</h1>
        <nav className='flex items-center space-x-8 mr-[140px]'>
          <ul className='flex flex-col md:flex-row md:space-x-40 mr-[180px]'>
            <li>
              <a href='/' className='text-white hover:text-gray-400 size-7 text-[20px]'>
                Trang chủ
              </a>
            </li>
            <li>
              <a href='/about' className='text-white hover:text-gray-400 text-[20px]'>
                Sản phẩm
              </a>
            </li>
            <li>
              <a href='/contact' className='text-white hover:text-gray-400 text-[20px]'>
                Customize
              </a>
            </li>
          </ul>

          <div className='flex flex-col md:flex-row md:space-x-10'>
            <a href='/cart' className='text-white hover:text-gray-400 text-[20px]'>
              <i className='fa-solid fa-cart-shopping'></i>
            </a>
            <a href='/account' className='text-white hover:text-gray-400 text-[20px]'>
              <i className='fa-solid fa-circle-user'></i>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
