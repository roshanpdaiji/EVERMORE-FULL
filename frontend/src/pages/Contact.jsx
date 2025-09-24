import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

function Contact() {
  return (
    <div>
      {/* Contact Us Title */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Image Left + Content Right */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        {/* Left Side Image */}
        <img 
          className='w-full md:max-w-[450px] object-cover rounded-lg shadow-md' 
          src="https://img.freepik.com/premium-photo/laptop-is-table-potted-plant-scene-is-set-natural-environment-with-laptop-plant-placed-wooden-table_116317-46039.jpg" 
          alt="ShopEase Office" 
        />

        {/* Right Side Content */}
        <div className='flex flex-col justify-center gap-10 md:w-2/4 text-gray-600'>
          
          {/* Our Store */}
          <div className='flex flex-col gap-3'>
        <b className='text-gray-800 text-lg'>Our Store</b>
<p>Evermore Headquarters</p>
<p>123 Market Street, Kochi, Kerala, India</p>
<p>Email: support@evermore.com</p>
<p>Phone: +91 98765 43210</p>

          </div>

          {/* Careers Section */}
          <div className='flex flex-col gap-3'>
            <b className='text-gray-800 text-lg'>Careers at Evermore</b>
            <p>
              At Evermore, we believe in innovation, creativity, and teamwork.  
              If you’re passionate about eCommerce, customer satisfaction, and 
              building the future of online shopping, we’d love to hear from you.
            </p>
            <p>
              Explore exciting job opportunities with us and become part of a 
              dynamic team that values growth and collaboration.
            </p>
            <button className='bg-black text-white px-6 py-2 rounded-md text-sm w-fit'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='my-20'>
        <NewsletterBox />
      </div>
    </div>
  )
}

export default Contact
