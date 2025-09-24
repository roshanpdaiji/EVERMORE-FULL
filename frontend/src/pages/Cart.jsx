import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

function Cart() {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])



  useEffect(() => {

    if (products.length > 0) {

      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])


  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div
                key={item._id + item.size}
                className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={Array.isArray(productData.image) ? productData.image[0] : productData.image}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}   // ✅ always at least 1
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (val < 1 || isNaN(val)) val = 1; // ✅ never below 1
                      updateQuantity(item._id, item.size, val);
                    }}
                    className="border w-12 sm:w-16 px-2 py-1 text-center"
                  />

                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>


                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cuursor-pointer' src='https://th.bing.com/th/id/R.27299b1faed2d63a3e9512bd8cd187ad?rik=%2fVRT3CdCaWVC3w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fdelete-button-png-delete-icon-1600.png&ehk=mRIiUoExO9FPzeoYwqDk%2bfWDlxlcYGmfTbaQ2Pbwyak%3d&risl=&pid=ImgRaw&r=0' alt="" />
              </div>
            );
          })
        }


      </div>

      <div className='flex flex-col items-center my-20 gap-4'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
        </div>
        <div className='w-full sm:w-[450px]'>
          <button
            onClick={() => navigate('/place-order')}
            className="mt-6 w-full py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>


    </div>
  )
}

export default Cart



