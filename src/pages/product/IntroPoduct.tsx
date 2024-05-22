import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const IntroPoduct: React.FC = () => {
  return (
    <>
      <div className='grid md:grid-cols-3 grid-cols-1'>
        <div className='md:col-span-1 md:m-[46px]'>
          <img  className='hidden md:inline' src='https://s3-alpha-sig.figma.com/img/ce2f/4cf3/18683108e196b0be7d3d3580413ec970?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AvudQssblwKY3eDEN3diA6oYqwybeJuQXC4N9VOpxfdq1BfHNgeSW0V9RATr8CkPFvprHn0NFsjgAOgs286NfPzJSymnzpLPq6UKwBqIvFzBF7LFI0eUGj6Rs2-4LvbT~ZmuEjMo4kjuwVqlTj~ha0YiC-P8B8Ieuog9NNMoCMmKqm~n6n8SFkVGZoKolqiBnlHbtSXCK7VMM31Z6HrT7AS82Yq5ZB7CGZTjOR0tZjcOfWYjkPXcv2Rcy-vd6NXLokbC05httaCuJtephPpni9vnMcS9LklZP6jo-qz1TPNfinudhpUs69e2FRyLW2rE5DCJqu5RYzDrMXIHtJyZNg__' />
        </div>
        <div className='md:col-span-2 md:grid-rows-3 col-span-1 mt-4'>
          <div className='md:grid md:grid-cols-3 md:row-span-2 md:m-[46px] '>
          <div className='md:col-span-1 text-[46px] hidden md:block'>SIIN</div>
            <nav className='md:col-span-2'>
              <ul className='flex md:items-center md:justify-start justify-center  space-x-5  md:text-justify'>
                {/* <li className='text-[26px] md:w-auto md:inline-block bg-black text-white p-[7px]'>TOP SELLER</li> */}
                <NavLink
                  className={({ isActive }) => (!isActive ? ' items-start text-[14px] md:text-[26px]' : 'text-[14px] md:text-[26px] active_tag_product md:p-2 p-1')}
                  to={'topSeller'}
                >
                  TOP SELLER
                </NavLink>
                <NavLink
                  className={({ isActive }) => (!isActive ? 'items-start text-[14px] md:text-[26px]' : 'text-[14px] md:text-[26px] active_tag_product md:p-2 p-1')}
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
          <img className='md:w-[80%] md:h-[76px] m-5'  src='../src/assets/banner_voucher.jpg' />
          </div>
        </div>
      </div>
    </>
  )
}

export default IntroPoduct
