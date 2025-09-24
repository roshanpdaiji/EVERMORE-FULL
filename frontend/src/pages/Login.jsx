import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';



function Login() {

  const [currentState, setCurrentState] = useState('Login')

  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)

  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')


  const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (currentState === 'Sign Up') {
      const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } else {
      const response = await axios.post(backendUrl + '/api/user/login', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
      }
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(()=>{
  if(token){
    navigate('/')
  }
})


  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-16 p-6 bg-white shadow-lg rounded-xl text-gray-800"
    >
      {/* Title */}
      <div className="inline-flex items-center gap-3 mb-6">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[2px] w-10 bg-gray-800" />
      </div>

      {/* Name field (only for Sign Up) */}
      {currentState === 'Login' ? null : (
        <input onChange={(e)=>setName(e.target.value)} value={name}
          type="text"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Name"
          required
        />
      )}

      {/* Email */}
      <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Email"
        required
      />

      {/* Password */}
      <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password"
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Password"
        required
      />

      {/* Links */}
      <div className="w-full flex justify-between text-sm text-gray-600 mb-4">
        <p className="cursor-pointer hover:underline">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer hover:underline"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer hover:underline"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Submit button */}
      <button className="w-full bg-black text-white font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
