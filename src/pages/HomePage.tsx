const HomePage = () => {
  return (
    <div>
      <div className='flex justify-center my-[60px]'>
        <img className='w-full h-auto' src='/assets/banner.png' alt='Banner' />
      </div>
      <div className='grid grid-cols-2'>
        <div>Sản phẩm mới</div>
        <div>Sản phẩm bán chạy</div>
      </div>
    </div>
  )
}

export default HomePage
