import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'


function Login({setToken}) {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
const onSubmitHandler = async (e) => {
  try {
    e.preventDefault()
    const response = await axios.post(
      backendUrl + '/api/user/admin',
      { email, password }
    )

    if (response.data.success) {
      setToken(response.data.token)   // ✅ works if setToken passed from App
      toast.success("Login successful")
    } else {
      toast.error(response.data.message)
    }

  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message || error.message)
  }
}


  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full'>
        
        {/* Title */}
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Admin Panel
        </h1>

        {/* Form */}
        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div className='mb-4'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input   onChange={(e)=>setEmail(e.target.value)} value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-black focus:border-black' 
              type="email" 
              placeholder='your@gmail.com' 
              required 
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input  onChange={(e)=>setPassword(e.target.value)} value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-black focus:border-black' 
              type="password" 
              placeholder='••••••••' 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
