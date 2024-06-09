import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { imageType } from '~/dummyData/images'
import { createCartItem } from '~/redux/actions/cartItem.action'

import { getProductMaterial } from '~/redux/actions/material.action'
import { getProductDetail } from '~/redux/actions/product.action'
import { getImageByProMaterialId } from '~/redux/actions/subImage.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { addCartItem } from '~/types/cartItem.type'
import { material } from '~/types/material.type'
import { CartItem } from '~/types/product.type'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const numericId = id ? parseInt(id, 10) : NaN
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const productDetail = useSelector((state: RootState) => state.product.productDetail)
  const subImage = useSelector((state: RootState) => state.subImage.subImageList)
  const material = useSelector((state: RootState) => state.material.material)
  const cart = useSelector((state: RootState) => state.cartItem.cartItemList)
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartItem, setCartItem] = useState<addCartItem>({
    colorId: 0,
    sizeId: 0,
    quantity: quantity,
    userId: 0
  })

  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
  

  const colorMap: { [key: number]: string } = {
    1: 'Red',
    2: 'Pink',
    3: 'Black',
    4: 'Orange',
    5: 'Purple'
  }

  
  const sizeMap: { [key: number]: string } = {
    1: 'M',
    2: 'S',
    3: 'L',
    4: 'XL'
  }

  const uniqueColorIds = new Set<number>()
  const uniqueSizes = new Set<number>()
  const uniqueColors = Array.isArray(material)
    ? material.filter((color: material) => {
        if (uniqueColorIds.has(color.colorId)) {
          return false
        } else {
          uniqueColorIds.add(color.colorId)
          return true
        }
      })
    : []

  const uniqueSizesArray = Array.isArray(material)
    ? material.filter((size: material) => {
        if (uniqueSizes.has(size.sizeId)) {
          return false
        } else {
          uniqueSizes.add(size.sizeId)
          return true
        }
      })
    : []

  const [activeColor, setActiveColor] = useState<number | null>(null)
  const [activeSize, setActiveSize] = useState<number | null>(null)

  const handleColorClick = (colorId: number) => {
    setCartItem((prevState) => ({ ...prevState, colorId }))
    setActiveColor(colorId)
    updateSelectedMaterialId(colorId, activeSize);
  }

  const handleSizeClick = (sizeId: number) => {
    setCartItem((prevState) => ({ ...prevState, sizeId }))
    setActiveSize(sizeId)
    updateSelectedMaterialId(activeColor, sizeId);
  }


  const updateSelectedMaterialId = (colorId: number | null, sizeId: number | null) => {
    if (colorId !== null && sizeId !== null && Array.isArray(material)) {
      const selectedMaterial = material.find((material: material) => material.colorId === colorId && material.sizeId === sizeId);
      if (selectedMaterial) {
        setSelectedMaterialId(selectedMaterial.id);
        setTotalPrice(quantity * selectedMaterial.price)
      }
    }
  }


  const dispatch = useAppDispatch()
  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }
  useEffect(() => {
    dispatch(getProductDetail(numericId))
    dispatch(getProductMaterial(numericId))
    // dispatch(getImageByProMaterialId(numericId))

  }, [dispatch, numericId])





  useEffect(() => {
    if (productDetail && productDetail.price !== undefined) {
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
    if (selectedMaterialId !== null) {
      dispatch(getImageByProMaterialId(selectedMaterialId));
    }
  }, [selectedMaterialId, dispatch]);

  // const handleIncrease = () => {
  //   const newQuantity = quantity + 1
  //   setQuantity(newQuantity)
  //   setTotalPrice(newQuantity * (productDetail?.price || 0))
  // }

  // const handleDecrease = () => {
  //   if (quantity > 0) {
  //     const newQuantity = quantity - 1
  //     setQuantity(newQuantity)
  //     setTotalPrice(newQuantity * (productDetail?.price || 0))
  //   }
  // }

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  
    if (selectedMaterialId !== null && Array.isArray(material)) {
      const selectedMaterial = material.find(
        (material) => material.id === selectedMaterialId
      );
      if (selectedMaterial) {
        setTotalPrice(newQuantity * selectedMaterial.price);
      }
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
  
      if (selectedMaterialId !== null && Array.isArray(material)) {
        const selectedMaterial = material.find(
          (material) => material.id === selectedMaterialId
        );
        if (selectedMaterial) {
          setTotalPrice(newQuantity * selectedMaterial.price);
        }
      }
    }
  };
  

  const addToCart = (): Omit<CartItem, 'quantity'> | null => {
    if (productDetail) {
      const productInCart = {
        id: productDetail.id,
        name: productDetail.name,
        price: productDetail.price || 0,
        image: productDetail.coverImage,
      };
  
      return productInCart;
    }
    return null;
  }
  

  // const handleClick = (button: string) => {
  //   setActiveButton(button)
  // }

  const handleAddToCart = () => {
    const productInCart = addToCart();
    
    if (!productInCart) {
      return;
    }
  
    const sizeId = cartItem.sizeId !== undefined && cartItem.sizeId !== null ? cartItem.sizeId : 0;
    const colorId = cartItem.colorId !== undefined && cartItem.colorId !== null ? cartItem.colorId : 0;
  
    const newCartItem: addCartItem = {
      quantity: cartItem.quantity,
      sizeId: sizeId,
      colorId: colorId,
      userId: cartItem.userId,
    };
  
    const newCartItemForStore = {
      id: numericId,
      cartItem: newCartItem
    };
  
    dispatch(createCartItem(newCartItemForStore));
  
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
    const newLocalStorageCartItem = {
      ...productInCart,
      quantity: newCartItem.quantity,
      sizeId: newCartItem.sizeId,
      colorId: newCartItem.colorId,
      sizeName: sizeMap[sizeId] || 'N/A',
      colorName: colorMap[colorId] || 'N/A'
    };
  
    const existingProductIndex = cartItems.findIndex((item: any) => item.id === newLocalStorageCartItem.id);
  
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += newLocalStorageCartItem.quantity;
    } else {
      cartItems.push(newLocalStorageCartItem);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    console.log('productInCart:', newCartItemForStore);
    // alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };
  
  

  const filteredSubImages = Array.isArray(subImage) ? subImage.filter((image) => image.status).slice(0, 4) : []

  return (
    <>
      {productDetail ? (
        <div className='grid md:grid-cols-2  grid-cols-1 md:mt-9'>
            <div className='md:col-span-1 mt-6'>
          <div className='grid md:grid-cols-7 sm:grid-cols-4 grid-cols-4 md:gap-2 gap-y-2 md:w-[60%] md:h-[64%] md:ml-[220px]'>
            {(activeColor === null && activeSize === null) ? (
              <div className='col-span-12 flex justify-center items-center'>
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
          <div className='grid md:grid-cols-3 grid-cols-1'>
            <div className='md:col-span-1 md:flex md:justify-center hidden'>
              <div className='border-l-2 shadow-2xl border-black h-[80%] md:my-[13%]'></div>
            </div>
            <div className='md:col-span-2 md:justify-end md:items-end md:mt-[8%]'>
              <h1 className='flex md:text-2xl md:mt-0 mt-7 md:justify-start  justify-center font-bold mb-2'>
                {productDetail?.name}
              </h1>
              <span className='flex md:justify-start justify-center'>Sản phẩm liên quan</span>
              <div className='border-b-[1px] shadow-2xl border-black w-[100%] md:w-[95%] my-2'></div>
              <div className='flex gap-2 my-[25px]'>
                {uniqueColors.map((color: { id: number; colorId: number }) => (
                  <button
                    className={`md:h-20 md:w-20 mr-[1px] h-[44px] w-[34px] ${activeColor === color.colorId ? 'text-white' : 'text-black'}`}
                    key={color.id}
                    onClick={() => handleColorClick(color.colorId)}
                    style={{ backgroundColor: colorMap[color.colorId] }}
                  >
                    {activeColor === color.colorId ? '✓' : ''}
                  </button>
                ))}
              </div>

              <div className='flex md:gap-8 justify-center  md:justify-start gap-2 my-[55px]'>
                {uniqueSizesArray?.map((size: any) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeClick(size.sizeId)}
                    className={`h-9 w-9 border border-black md:shadow-2xl text-center md:text-2xl ${
                      activeSize === size.sizeId ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    {sizeMap[size.sizeId]}
                  </button>
                ))}
              </div>
              <div className='flex md:justify-start justify-center md:gap-11 gap-x-[10px]'>
                <div className='flex items-center gap-2 md:gap-[40px] md:mb-[50px]'>
                  <button onClick={handleDecrease} className='bg-gray-200 px-4 py-2 rounded-lg'>
                    -
                  </button>
                  <span id='quantity' className='text-lg font-medium'>
                    {quantity}
                  </span>
                  <button onClick={handleIncrease} className='bg-gray-200 px-4 py-2 rounded-lg'>
                    +
                  </button>
                </div>
                <div className='flex items-center md:mb-[50px]'>
                  <button onClick={handleAddToCart} className='border-2 p-1.5  bg-black text-white rounded-lg'>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>

              <div className='border-b-[1px] shadow-2xl border-black w-[100%]  md:w-[95%] my-5'></div>
              <div className='flex justify-center mb-[40px]'>
              <h3 className='md:text-2xl text-xl'>
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
