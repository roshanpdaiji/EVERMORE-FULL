import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl,currency } from '../App'
import axios from 'axios'

function Orders({token}) {

  const [orders,setOrders]=useState([])

  const fetchAllOrders=async()=>{

    if(!token){
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders.reverse())
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }



  const statusHandler=async(event,orderId)=>{
    try {
      const response = await axios.post(backendUrl+ '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
    
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast(response.data.message)
    }
  }


  useEffect(()=>{
fetchAllOrders()
  },[token])

  return (


    <div className="p-6 bg-gray-50 min-h-screen">
  <h3 className="text-2xl font-bold mb-6">Order Page</h3>
  <div className="flex flex-col gap-6">
    {orders.map((order, index) => (
      <div
        key={index}
        className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
      >
        <img
          className="w-20 h-20 object-contain"
          src="https://cdn1.iconfinder.com/data/icons/shipping-delivery-23/24/box_delivery_shipping_package_1-1024.png"
          alt=""
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 text-gray-700">
            {order.items.map((item, idx) => (
              <p key={idx} className="text-sm">
                {item.name} {item.quantity} <span className="font-medium">{item.size}</span>
                {idx !== order.items.length - 1 && ','}
              </p>
            ))}
          </div>

          <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>

          <div className="text-gray-500 text-sm">
            <p>{order.address.street},</p>
            <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
            <p>Phone: {order.address.phone}</p>
          </div>

          <div className="text-gray-600 text-sm mt-2">
            <p>Items: {order.items.length}</p>
            <p>Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
          </div>

          <p className="font-semibold mt-1">{currency}{order.amount}</p>

          <select onChange={()=>statusHandler(event,order._id)} value={order.status} className="mt-2 border border-gray-300 rounded px-3 py-1.5 w-full sm:w-60">
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Out For Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    ))}
  </div>
</div>


  )
}

export default Orders
