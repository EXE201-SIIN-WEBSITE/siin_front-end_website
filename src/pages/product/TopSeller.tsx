import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const TopSeller: React.FC = () => {
  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='md:col-span-1 m-[46px]'>
          <img src='https://s3-alpha-sig.figma.com/img/ce2f/4cf3/18683108e196b0be7d3d3580413ec970?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AvudQssblwKY3eDEN3diA6oYqwybeJuQXC4N9VOpxfdq1BfHNgeSW0V9RATr8CkPFvprHn0NFsjgAOgs286NfPzJSymnzpLPq6UKwBqIvFzBF7LFI0eUGj6Rs2-4LvbT~ZmuEjMo4kjuwVqlTj~ha0YiC-P8B8Ieuog9NNMoCMmKqm~n6n8SFkVGZoKolqiBnlHbtSXCK7VMM31Z6HrT7AS82Yq5ZB7CGZTjOR0tZjcOfWYjkPXcv2Rcy-vd6NXLokbC05httaCuJtephPpni9vnMcS9LklZP6jo-qz1TPNfinudhpUs69e2FRyLW2rE5DCJqu5RYzDrMXIHtJyZNg__' />
        </div>
        <div className='md:col-span-2'>
          {/* <div className='text-[36px]'>SIIN</div> */}
          <div className='grid md:grid-cols-2 m-[46px] '>
            <nav className='md:col-span-2'>
              <ul className='flex items-center text-justify'>
                {/* <li className='text-[26px] md:w-auto md:inline-block bg-black text-white p-[7px]'>TOP SELLER</li> */}

                <NavLink to={'topSeller'}>TOP SELLER</NavLink>
                <NavLink to={'gift'}>
                  {/* <li className='text-[26px]'>GIFT</li> */}
                  GIFT
                </NavLink>
              </ul>
            </nav>
          </div>

          {/* Top seller product */}
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default TopSeller
