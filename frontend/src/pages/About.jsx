import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsletterBox'


function About() {
  return (
    <div className="px-6 sm:px-12 lg:px-20">

      {/* About Us */}
      <div className="text-2xl text-center pt-12 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src="https://www.adorama.com/alc/wp-content/uploads/2022/11/Clothing-006.jpeg"
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At <b className="text-gray-800">Evermore</b>, we believe shopping should be simple, enjoyable, and reliable.  
            We are passionate about bringing you high-quality products with a seamless online experience.
          </p>
          <p>
            Our carefully curated selection ensures that every product meets our strict standards for durability and design.  
            Whether you’re shopping for yourself or finding the perfect gift, we’ve got you covered.
          </p>
          <b className="text-gray-800 text-lg">Your satisfaction is our priority.</b>
          <p>
            We combine quality, affordability, and exceptional customer service to make your shopping experience better every day.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl text-center py-6">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-sm">
        
        <div className="border px-8 py-10 sm:py-16 rounded-lg shadow-sm hover:shadow-md transition">
          <b className="text-lg text-gray-800">Quality Assurance</b>
          <p className="text-gray-600 mt-3">
            Every product undergoes a strict quality check to ensure you get only the best.  
            We prioritize durability and design in everything we offer.
          </p>
        </div>

        <div className="border px-8 py-10 sm:py-16 rounded-lg shadow-sm hover:shadow-md transition">
          <b className="text-lg text-gray-800">Convenience</b>
          <p className="text-gray-600 mt-3">
            Shop from anywhere, anytime. Our platform is designed to be fast, user-friendly, and hassle-free,  
            so you can focus on what matters most.
          </p>
        </div>

        <div className="border px-8 py-10 sm:py-16 rounded-lg shadow-sm hover:shadow-md transition">
          <b className="text-lg text-gray-800">Exceptional Customer Service</b>
          <p className="text-gray-600 mt-3">
            Our support team is here to assist you at every step, ensuring a smooth and satisfying shopping journey.  
            Your happiness is our success.
          </p>
        </div>

      </div>


<NewsLetterBox/>

    </div>
  )
}

export default About
