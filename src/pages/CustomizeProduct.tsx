export default function CustomizeProduct() {
  return (
    <div className='flex flex-col md:flex-row min-h-screen px-[1%]'>
      <div className='slider-container basis-[55%] bg-slate-600'></div>

      <div className='flex flex-col items-center justify-center bg-gray-800 customize basis-[45%] gap-2'>
        <div className='border-solid border-red-800 w-[90%] bg-zinc-500 h-[80%] border-2 py-[2%]'>
          <div className='flex flex-col w-full h-full gap-10 text-center justify-evenly item-center'>
            <div className='w-1/2 relative after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] text-4xl font-bold mx-auto after:lg:w-96 after:sm:w-40'>
              Customize
            </div>
            <div className='w-3/4 relative flex flex-col gap-3 colors after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] mx-auto after:lg:w-96 after:sm:w-40'>
              <label className='text-2xl text-left'>Color:</label>
              <div className='flex justify-center gap-8 colorbutton'>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
              </div>
            </div>
            <div className='w-3/4 relative flex flex-col gap-3 colors after:absolute after:bottom-[-25%] after:left-[50%] after:translate-x-[-50%] after:bg-black after:h-[2px] mx-auto after:lg:w-96 after:sm:w-40'>
              <label className='text-2xl text-left'>Item:</label>
              <div className='flex justify-center gap-8 colorbutton'>
                <img className='w-16 h-16 bg-white'></img>
                <img className='w-16 h-16 bg-white'></img>
                <img className='w-16 h-16 bg-white'></img>
              </div>
            </div>
            <div className='flex items-center justify-evenly'>
              <div className='flex gap-10 size'>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
                <button className='w-8 h-8 bg-white'></button>
              </div>
              <div className='text-3xl'>|</div>

              <div className='flex quantity justify-evenly gap-9'>
                <button>-</button>
                <input type='number' className='w-8 h-8 bg-white' value={1} />
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
        <button className='p-4 addtocart bg-zinc-700'>Them vao gio hàng</button>
      </div>
    </div>
  )
}
