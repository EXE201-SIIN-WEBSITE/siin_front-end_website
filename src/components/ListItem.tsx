import { products } from '~/dummyData/product'
import Item from './Item'

interface props {
  title: string
}

export default function ListItem({ title }: props) {
  return (
    <div className='flex flex-col w-[90%] my-[3%] justify-center'>
      <div className='flex items-center gap-2 title my-[2%]'>
        <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#000000'>
          <path d='M295-157v-652l512 326-512 326Z' />
        </svg>
        <span className='text-2xl font-bold'>{title.toLocaleUpperCase()}</span>
      </div>

      <div className='flex flex-wrap justify-between w-full gap-20 sm:justify-center'>
        {products.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
