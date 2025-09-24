import React from 'react'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs md:text-base text-gray-700'>
      
      <div>
        <img  className='w-12 m-auto mb-5' src="https://cdn-icons-png.flaticon.com/512/569/569681.png" alt="" />
        <p className='font-semibold'>Easy Exchange</p>
        <p className='text-gray-400'>We Offer hassle free exchange policy</p>
      </div>

           
      <div>
        <img  className='w-12 m-auto mb-5' src="https://cdn-icons-png.flaticon.com/512/37/37629.png" alt="" />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>

           
      <div>
        <img  className='w-12 m-auto mb-5' src="https://www.pngplay.com/wp-content/uploads/7/Black-Headset-Background-PNG-Image.png" alt="" />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer supoort</p>
      </div>


    </div>
  )
}

export default OurPolicy
