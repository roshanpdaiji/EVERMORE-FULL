import React from 'react'

function Hero() {
  return (
    <div className="flex flex-col lg:flex-row border border-gray-400">
      
      {/* Left Section: Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-10 text-[#414141] px-6 lg:px-12">
        
        {/* Best Sellers */}
        <div className="flex items-center gap-2">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
        </div>

        {/* Heading */}
        <h1 className="prata-regular text-3xl lg:text-5xl py-4 text-center lg:text-left whitespace-nowrap">
          LATEST ARRIVALS
        </h1>

        {/* Shop Now */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-black">
          <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
          <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
        </div>
      </div>
      
      {/* Right Section: Image */}
      <div className="w-full lg:w-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://www.mdc.edu/fashion/img/fashion-forward-model.png"
          alt="Fashion Banner"
        />
      </div>
    </div>
  )
}

export default Hero
