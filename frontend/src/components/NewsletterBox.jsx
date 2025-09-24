import React from 'react';

function NewsletterBox() {

    const onSubmitHandler = (event)=>{
        event.preventDefault();

    }


  return (
    <div className="text-center px-4 py-10 bg-gray-50 rounded-lg shadow-sm">
      {/* Title */}
      <p className="text-2xl font-semibold text-gray-800">
        Subscribe now & get 20% off
      </p>

      {/* Subtitle */}
      <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
        Join our newsletter and stay updated with the latest collections,
        exclusive offers, and style inspiration delivered straight to your inbox.
      </p>

      {/* Form */}
      <form onSubmit={onSubmitHandler} className="w-full sm:w-2/3 lg:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 rounded-full overflow-hidden">
       <input
  className="w-full flex-1 px-4 py-3 outline-none text-sm text-black"
  type="email"
  placeholder="Enter your email"
  required
/>

        
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 transition-all text-white text-sm font-medium px-6 py-3 rounded-r-full"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsletterBox;
