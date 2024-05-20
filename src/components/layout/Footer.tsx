import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='bg-black text-white p-4  w-full h-[200px]'>
      <div className='grid justify-between grid-flow-col'>
        <div>
          <h1 className='text-[30px]'>SIIN</h1>
        </div>
        <div className='ml-[200px]'>
          <h1>Liên hệ</h1>
          <div>
            <i className='my-3 mr-3 fa-solid fa-envelope'></i>
            siinstore@gmail.com
          </div>
          <div>
            <i className='my-3 mr-3 fa-solid fa-phone'></i>
            +84 666 888 999
          </div>
          <div className='grid grid-cols-4 my-3'>
            <i className='fa-brands fa-facebook'></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-tiktok'></i>
            <i className='fa-brands fa-youtube'></i>
          </div>
        </div>
        <div>
          <h1>Địa chỉ</h1>
          <div className='my-3 mr-3 break-words'>
            <i className='my-3 mr-3 fa-solid fa-location-dot'></i>
            Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
