import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'



function PlaceOrder() {

  const [method, setMethod] = useState('cod')
  const { navigate, token, cartItems, setCartItems, getCartAmount, delivery_fee, products,backendUrl } = useContext(ShopContext)


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {

    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))

  }


  //razorpay

const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount, // ensure this is in paise
    currency: order.currency || "INR",
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt:order.receipt,
    handler: async (response) => {
      console.log(response); 
    try {
      const {data}=await axios.post(backendUrl+'/api/order/verifyRazorpay',response,{headers:{token}})
      if(data.success){
        navigate('/orders')
        setCartItems({})
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    },
    theme: {
      color: "#3399cc"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};





  const onSubmitHandler = async (event) => {
    event.preventDefault();  // stop default form submission (page reload + query params)

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        //API Calls for COD

        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else {
            toast.error(response.data.message)
          }
          break;


          //api for 'stripe

          case 'stripe':

          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }
          else{
            toast.error(responseStripe.data.message)
          }
          
          break;

          case 'razorpay':
            const responseRazorpay =await axios.post(backendUrl + '/api/order/razorpay',orderData,{headers:{token}})

            if(responseRazorpay.data.success){
              initPay(responseRazorpay.data.order)
            }

        default:

          break;

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };





  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='country' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' />

      </div>



      {/*Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* Payment Method Selection */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div
              onClick={() => setMethod('stripe')}
              className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <p
                className={`w-4 h-4 border-2 rounded-full flex-shrink-0 ${method === 'stripe' ? 'bg-green-400' : ''
                  }`}
              ></p>
              <img
                className="h-6 object-contain"
                src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png"
                alt="Stripe"
              />
            </div>

            <div
              onClick={() => setMethod('razorpay')}
              className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <p
                className={`w-4 h-4 border-2 rounded-full flex-shrink-0 ${method === 'razorpay' ? 'bg-green-400' : ''
                  }`}
              ></p>
              <img
                className="h-6 object-contain"
                src="https://latestlogo.com/wp-content/uploads/2024/01/razorpay-logo.png"
                alt="Razorpay"
              />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <p
                className={`w-4 h-4 border-2 rounded-full flex-shrink-0 ${method === 'cod' ? 'bg-green-400' : ''
                  }`}
              ></p>
              <p className="text-gray-700 text-sm font-medium">Cash on Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors duration-200'>PLACE ORDER</button>
          </div>



        </div>
      </div>




    </form>
  )
}

export default PlaceOrder
