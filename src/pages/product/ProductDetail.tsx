const ProductDetail = () => {
  return (
    <>
      <div className='grid md:grid-cols-2 mt-12'>
        <div className='col-span-1'>
          <div className='grid md:grid-cols-3 md:grid-rows-6 gap-6 w-[70%] h-[80%] mt-9 md:ml-[160px]'>
            <div className='col-span-1 row-span-3 flex justify-center items-center'>
              <img className='h-full w-full' src='../src/assets/p1.png' alt='' />
            </div>
            <div className='col-span-2 row-span-4 flex justify-center items-center'>
              <img className=' h-full w-full' src='../src/assets/p2.png' alt='' />
            </div>
            <div className='col-span-1 row-span-3 flex justify-center items-center'>
              <img className=' h-full w-full' src='../src/assets/p3.png' alt='' />
            </div>
            <div className='col-span-1 row-span-2 flex justify-center items-center'>
              <img className='h-full w-full' src='../src/assets/p4.png' alt='' />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className='grid grid-cols-3'>
          <div className='md:col-span-1 flex justify-center'>
            <div className='border-l-2 shadow-2xl border-black h-[70%] md:my-[13%]'></div>
          </div>
          <div className='md:col-span-2 justify-end items-end md:mt-[8%]'>
            <h1 className='text-2xl mb-2'>Vòng tay SUMMER NG.UESTOLIAS 020901</h1>
            <span>Sản phẩm liên quan</span>
            <div className='border-b-[1px] shadow-2xl border-black w-[88%] my-2'></div>
            <div className='flex gap-3 items-center my-[25px]'>
              <div className='h-20 w-20 border border-black shadow-2xl'></div>
              <div className='h-20 w-20 border border-black shadow-2xl'></div>
              <div className='h-20 w-20 border border-black shadow-2xl'></div>
              <div className='h-20 w-20 border border-black shadow-2xl'></div>
              <div className='h-20 w-20 border border-black shadow-2xl'></div>
            </div>
            <div className='flex gap-8 my-[55px]'>
              <button className='h-9 w-9 border border-black shadow-2xl text-center text-2xl'>S</button>
              <button className='h-9 w-9 border border-black shadow-2xl text-center text-2xl'>M</button>
              <button className='h-9 w-9 border border-black shadow-2xl text-center text-2xl'>L</button>
            </div>
            <div className='flex gap-7'>
              <div className='flex items-center gap-[40px] md:mb-[50px]'>
                <button className='bg-gray-200 px-4 py-2 rounded-lg'>-</button>
                <span id='quantity' className='text-lg font-medium'>
                  0
                </span>
                <button className='bg-gray-200 px-4 py-2 rounded-lg'>+</button>
              </div>
              <div className='flex items-center md:mb-[50px]'>
                <button className='border-2 p-1.5  bg-black text-white rounded-lg'>Thêm vào giỏ hàng</button>
              </div>
            </div>

            <div className='border-b-[1px] shadow-2xl border-black w-[88%] my-5'></div>
            <div className='flex justify-center mb-[40px]'>
              <h3 className='text-2xl'>Thành tiền: 250.000đ</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
