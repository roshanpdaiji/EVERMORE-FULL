import React from 'react'

function Navbar({setToken}) {
  return (
    <div className='flex items-center justify-between py-3 px-[4%] shadow-md bg-white'>
      {/* Logo */}
      <img 
        className='w-16 sm:w-20 object-contain' 
        src="https://play-lh.googleusercontent.com/awd04IJzDo0AgnZ4oNHnLDLKnNJk3Y0hVPOAvNaSi_5hXiMBoPc474RvHJkj0cUHrEc" 
        alt="Logo" 
      />

      {/* Logout Button */}
      <button onClick={()=>setToken('')} className='bg-gray-600 hover:bg-gray-700 transition text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  )
}

export default Navbar
