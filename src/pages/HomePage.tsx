import React from 'react'

import banner from '../assets/banner.png'

const HomePage = () => {
  return (
    <div>
    <div className='flex justify-center my-[60px]'>
      <img className='w-full h-auto' src={banner} alt="Banner" />

    </div>
    <div className='grid grid-cols-2'>

    <div>Sản phẩm mới</div>
    <div>Sản phẩm bán chạy</div>
    </div>
    </div>
  )
}

export default HomePage
