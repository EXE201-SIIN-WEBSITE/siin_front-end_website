import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const IntroPoduct: React.FC = () => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='md:col-span-1 md:m-[46px]'>
          <img
            className='hidden md:inline'
            src='/assets/bannerLeft.png'
          />
        </div>
        <div className='col-span-1 mt-4 md:col-span-2 md:grid-rows-3'>
          <div className='md:grid md:grid-cols-3 md:row-span-2 md:m-[46px] '>
            <div className='md:col-span-1 text-[46px] hidden md:block'>SIIN</div>
            <nav className='md:col-span-2'>
              <ul className='flex justify-center space-x-5 md:items-center md:justify-start md:text-justify'>
                {/* <li className='text-[26px] md:w-auto md:inline-block bg-black text-white p-[7px]'>TOP SELLER</li> */}
                <NavLink
                  className={({ isActive }) =>
                    !isActive
                      ? ' items-start text-[14px] md:text-[26px]'
                      : 'text-[14px] md:text-[26px] active_tag_product md:p-2 p-1'
                  }
                  to={'topSeller'}
                >
                  TOP SELLER
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    !isActive
                      ? 'items-start text-[14px] md:text-[26px]'
                      : 'text-[14px] md:text-[26px] active_tag_product md:p-2 p-1'
                  }
                  to={'gift'}
                >
                  {/* <li className='text-[26px]'>GIFT</li> */}
                  GIFT
                </NavLink>
              </ul>
            </nav>
          </div>
          <Outlet />
          <div className='flex mt-[16%] md:mt-[11%] items-center justify-center md:row-span-1'>
            <img className='md:w-[80%] md:h-[76px] m-5' src='/assets/banner_voucher.jpg' />
          </div>
        </div>
      </div>
    </>
  )
}

export default IntroPoduct
