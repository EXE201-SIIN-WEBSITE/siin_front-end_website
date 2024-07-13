import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { createCartItem } from '~/redux/actions/cartItem.action'
import { getColors } from '~/redux/actions/color.action'
import { getProductMaterial } from '~/redux/actions/material.action'
import { getProductDetail } from '~/redux/actions/product.action'
import { getSizes } from '~/redux/actions/size.action'
import { getImageByProMaterialId } from '~/redux/actions/subImage.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { addCartItem } from '~/types/cartItem.type'
import { CartItem } from '~/types/product.type'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const numericId = id ? parseInt(id, 10) : NaN
  const productDetail = useSelector((state: RootState) => state.product.productDetail)
  const subImage = useSelector((state: RootState) => state.subImage.subImageList)
  const material = useSelector((state: RootState) => state.material.material)
  const colors = useSelector((state: RootState) => state.color.colorList)
  const sizes = useSelector((state: RootState) => state.size.sizeList)
  const userData = useSelector((state: RootState) => state.user.user)
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [priceSum, setPriceSum] = useState(0)
  const userId = userData?.id
  const [cartItem, setCartItem] = useState<addCartItem>({
    colorId: 0,
    sizeId: 0,
    quantity: quantity
    // userId: userData?.id
  })
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null)

  const uniqueColorIds = new Set<number>()
  const uniqueSizes = new Set<number>()
  const uniqueColors = Array.isArray(material)
    ? material.filter((m) => {
        if (uniqueColorIds.has(m.colorId)) {
          return false
        } else {
          uniqueColorIds.add(m.colorId)
          return true
        }
      })
    : []
  const uniqueSizesArray = Array.isArray(material)
    ? material.filter((m) => {
        if (uniqueSizes.has(m.sizeId)) {
          return false
        } else {
          uniqueSizes.add(m.sizeId)
          return true
        }
      })
    : []

  const [activeColor, setActiveColor] = useState<number | null>(null)
  const [activeSize, setActiveSize] = useState<number | null>(null)

  const handleColorClick = (colorId: number) => {
    setCartItem((prevState) => ({ ...prevState, colorId }))
    setActiveColor(colorId)
    updateSelectedMaterialId(colorId, activeSize)
  }

  const handleSizeClick = (sizeId: number) => {
    setCartItem((prevState) => ({ ...prevState, sizeId }))
    setActiveSize(sizeId)
    updateSelectedMaterialId(activeColor, sizeId)
  }

  const updateSelectedMaterialId = (colorId: number | null, sizeId: number | null) => {
    if (colorId !== null && sizeId !== null && Array.isArray(material)) {
      const selectedMaterial = material.find((m) => m.colorId === colorId && m.sizeId === sizeId)
      if (selectedMaterial) {
        setSelectedMaterialId(selectedMaterial.id)
        // const productPrice = productDetail?.price || 0
        setTotalPrice(quantity * selectedMaterial.price)
        setPriceSum(selectedMaterial.price)
      }
    }
  }

  // console.log("price real: ", priceSum);

  const updateTotalPrice = (quantity: number, selectedMaterialPrice: number) => {
    // const productPrice = productDetail?.price || 0
    setTotalPrice(quantity * selectedMaterialPrice)
  }

  const dispatch = useAppDispatch()

  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getProductDetail(numericId))
    dispatch(getProductMaterial(numericId))
    dispatch(getColors({ signal }))
    dispatch(getSizes({ signal }))
  }, [dispatch, numericId])

  useEffect(() => {
    if (productDetail && productDetail.price !== undefined) {
      // const productPrice = productDetail?.price || 0
      setTotalPrice(quantity * productDetail.price)
    }
  }, [productDetail, quantity])

  useEffect(() => {
    setCartItem((prevState) => ({
      ...prevState,
      quantity: quantity
    }))
  }, [quantity])

  useEffect(() => {
    if (selectedMaterialId !== null && Array.isArray(material)) {
      const selectedMaterial = material.find((m) => m.id === selectedMaterialId)
      if (selectedMaterial) {
        updateTotalPrice(quantity, selectedMaterial.price)
      }
    }
  }, [quantity, selectedMaterialId, material])

  useEffect(() => {
    if (selectedMaterialId !== null) {
      dispatch(getImageByProMaterialId(selectedMaterialId))
    }
  }, [selectedMaterialId, dispatch])
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const addToCart = (): Omit<CartItem, 'quantity'> | null => {
    if (productDetail) {
      const productInCart = {
        id: productDetail.id,
        name: productDetail.name,
        price: priceSum || 0,
        image: productDetail.coverImage
      }
      return productInCart
    }
    return null
  }

  const handleAddToCart = () => {
    if (activeColor === null || activeSize === null) {
      return
    }
    const productInCart = addToCart()
    if (!productInCart) {
      return
    }
    const sizeId = cartItem.sizeId !== undefined && cartItem.sizeId !== null ? cartItem.sizeId : 0
    const colorId = cartItem.colorId !== undefined && cartItem.colorId !== null ? cartItem.colorId : 0
    const newCartItem: addCartItem = {
      quantity: cartItem.quantity,
      sizeId: sizeId,
      colorId: colorId
      // userId: cartItem.userId
    }
    const newCartItemForStore = {
      id: numericId,
      cartItem: newCartItem,
      ...(userId && { userId: userId })
    }
    dispatch(createCartItem(newCartItemForStore))
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const newLocalStorageCartItem = {
      ...productInCart,
      quantity: newCartItem.quantity,
      sizeId: newCartItem.sizeId,
      colorId: newCartItem.colorId,
      sizeName: sizes.find((s) => s.id === sizeId)?.name || 'N/A',
      colorName: colors.find((c) => c.id === colorId)?.name || 'N/A'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingProductIndex = cartItems.findIndex((item: any) => item.id === newLocalStorageCartItem.id)
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += newLocalStorageCartItem.quantity
    } else {
      cartItems.push(newLocalStorageCartItem)
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    const event = new CustomEvent('cartUpdated') // tao event khi cái function này chạy
    window.dispatchEvent(event)
    console.log('productInCart:', newCartItemForStore)
    swal({
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      text: '',
      icon: 'success'
    })
    // alert("Sản phẩm đã được thêm vào giỏ hàng!");
  }

  const filteredSubImages = Array.isArray(subImage) ? subImage.filter((image) => image.status).slice(0, 4) : []

  return (
    <>
      {productDetail ? (
        <div className='grid grid-cols-1 md:grid-cols-2 md:mt-9'>
          <div className='mt-6 md:col-span-1'>
            <div className='grid md:grid-cols-7 sm:grid-cols-4 grid-cols-4 md:gap-2 gap-y-2 md:w-[60%] md:h-[64%] md:ml-[220px]'>
              {activeColor === null && activeSize === null ? (
                <div className='flex items-center justify-center col-span-12'>
                  <img
                    className='md:h-full md:w-full h-[200px] w-[180px]'
                    src={productDetail.coverImage}
                    alt='Product Cover Image'
                  />
                </div>
              ) : (
                filteredSubImages.map((image, index) => (
                  <div
                    key={index}
                    className={`${
                      index === 0
                        ? 'md:col-span-1.5 md:row-span-1 sm:col-span-1 col-span-2'
                        : index === 1
                          ? 'md:col-span-4 md:row-span-2 col-span-2 sm:col-span-1'
                          : index === 2
                            ? 'md:col-span-1.5 md:row-span-2 col-span-2 sm:col-span-1'
                            : 'md:col-span-4 md:row-span-1 col-span-2 sm:col-span-1'
                    } flex justify-center items-center`}
                  >
                    <img
                      className='md:h-full md:w-full h-[200px] w-[180px]'
                      src={image.url}
                      alt={`Sub Image ${index + 1}`}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='hidden md:col-span-1 md:flex md:justify-center'>
              <div className='border-l-2 shadow-2xl border-black h-[80%] md:my-[13%]'></div>
            </div>
            <div className='md:col-span-2 md:justify-end md:items-end md:mt-[8%]'>
              <h1 className='flex justify-center mb-2 font-bold md:text-2xl md:mt-0 mt-7 md:justify-start'>
                {productDetail?.name}
              </h1>
              <span className='flex justify-center md:justify-start'>Sản phẩm liên quan</span>
              <div className='border-b-[1px] shadow-2xl border-black w-[100%] md:w-[95%] my-2'></div>
              <div className='flex gap-2 my-[25px] justify-center sm:items-center'>
                {uniqueColors.map((color) => {
                  const colorName = colors.find((c) => c.id === color.colorId)?.name || 'Unknown'
                  return (
                    <button
                      className={`border-2 border-[#E5E7E9] md:h-20 md:w-20 mr-[1px] h-[44px] w-[34px] ${activeColor === color.colorId ? 'text-[#D5DBDB] text-2xl' : 'text-black'}`}
                      key={color.id}
                      onClick={() => handleColorClick(color.colorId)}
                      style={{ backgroundColor: colorName }}
                    >
                      {activeColor === color.colorId ? '✓' : ''}
                    </button>
                  )
                })}
              </div>
              <div className='flex md:gap-8 justify-center  md:justify-start gap-2 my-[55px]'>
                {uniqueSizesArray.map((size) => {
                  const sizeName = sizes.find((s) => s.id === size.sizeId)?.name || 'Unknown'
                  return (
                    <button
                      key={size.id}
                      onClick={() => handleSizeClick(size.sizeId)}
                      className={`h-9 w-9 border border-black md:shadow-2xl text-center md:text-2xl ${
                        activeSize === size.sizeId ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                    >
                      {sizeName}
                    </button>
                  )
                })}
              </div>
              <div className='flex md:justify-start justify-center md:gap-11 gap-x-[10px]'>
                <div className='flex items-center gap-2 md:gap-[40px] md:mb-[50px]'>
                  <button onClick={handleDecrease} className='px-4 py-2 bg-gray-200 rounded-lg'>
                    -
                  </button>
                  <span id='quantity' className='text-lg font-medium'>
                    {quantity}
                  </span>
                  <button onClick={handleIncrease} className='px-4 py-2 bg-gray-200 rounded-lg'>
                    +
                  </button>
                </div>
                <div className='flex items-center md:mb-[50px]'>
                  <button
                    onClick={handleAddToCart}
                    className={`border-2 p-2 bg-black text-white rounded-lg ${activeColor === null || activeSize === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              <div className='border-b-[1px] shadow-2xl border-black w-[100%]  md:w-[95%] my-5'></div>
              <div className='flex justify-center mb-[40px]'>
                <h3 className={`text-xl md:text-2xl ${selectedMaterialId === null ? 'text-sm md:text-base' : ''}`}>
                  Thành tiền: {selectedMaterialId !== null ? formatPriceToVND(totalPrice) : 'Chọn màu và kích thước'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>fail</h2>
      )}
    </>
  )
}

export default ProductDetail
