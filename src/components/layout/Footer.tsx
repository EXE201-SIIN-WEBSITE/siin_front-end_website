import React from 'react'
import Logo from '../Logo'

const Footer: React.FC = () => {
  return (
    <footer className='w-full p-6 text-white bg-black'>
      <div className='grid items-start justify-around grid-flow-col'>
        <div className='md:hidden lg:block'>
          <Logo />
        </div>

        <div className='flex flex-col gap-3'>
          <h1>Liên hệ</h1>
          <div className='flex items-center gap-2'>
            <i className='fa-solid fa-envelope'></i>
            siinstore@gmail.com
          </div>
          <div className='flex items-center gap-2'>
            <i className='fa-solid fa-phone'></i>
            +84 666 888 999
          </div>
          <div className='flex grid items-center grid-cols-4 gap-2'>
            <i className='fa-brands fa-facebook'></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-tiktok'></i>
            <i className='fa-brands fa-youtube'></i>
          </div>
        </div>

        <div className='flex flex-col justify-end gap-3 lg:w-80 sm:w-auto'>
          <h1>Địa chỉ</h1>
          <div className='flex items-center justify-start break-words gap-x-2'>
            <i className='fa-solid fa-location-dot'></i>
            <span>Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
