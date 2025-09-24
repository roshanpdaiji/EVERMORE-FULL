import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';


function Navbar() {

  const [visible,setVisible]=useState(false);

  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)

  const logout =()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }


  return (
    <div className='flex items-center justify-between py-5 font-medium'>


<Link to='/'>
<img 
  className="w-36 h-12 object-contain" 
  src="https://cdn-icons-png.flaticon.com/512/12964/12964438.png" 
  alt="Logo" 
/>
</Link>

<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

<NavLink to='/' className='flex flex-col items-center gap-1'>
<p>HOME</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>


<NavLink to='/collection' className='flex flex-col items-center gap-1'>
<p>COLLECTION</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>


<NavLink to='/about' className='flex flex-col items-center gap-1'>
<p>ABOUT</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>


<NavLink to='/contact' className='flex flex-col items-center gap-1'>
<p>CONTACT</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>


</ul>

<div className='flex items-center gap-6'>
<img onClick={()=>setShowSearch(true)} className='w-5 cursor-pointer' src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-5.png" alt="" />

<div className="group relative">



<div className="relative group p-2">
  {/* Profile Icon */}
  <img
    onClick={() => token ? null : navigate('/login')}
    className="w-8 h-8 cursor-pointer object-contain"
    src="https://cdn.icon-icons.com/icons2/3863/PNG/512/profile_circle_icon_240957.png"
    alt="Profile"
  />

  {token && (
    /* Dropdown Menu */
    <div className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 mt-4 z-20">
      <div className="flex flex-col gap-2 w-44 py-3 px-4 bg-white shadow-lg text-gray-700 rounded-lg border border-gray-200">
        <p className="cursor-pointer hover:text-black hover:font-medium">My Profile</p>
        <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black hover:font-medium">Orders</p>
        <p onClick={logout} className="cursor-pointer hover:text-black hover:font-medium">Logout</p>
      </div>
    </div>
  )}
</div>



</div>


<Link to="/cart" className="relative">
  <img 
    className="w-6 h-6 min-w-6 cursor-pointer" 
    src="https://cdn0.iconfinder.com/data/icons/e-commerce-33/24/271-512.png" 
    alt="Cart" 
  />
  <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
    {getCartCount()}
  </p>
</Link>


<img  onClick={()=>setVisible(true)}
  className="w-6 h-6 cursor-pointer sm:hidden" 
  src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3205050/menu-icon-md.png" 
  alt="Menu" 
/>

</div>

{/* Sidebar menu */}

<div
  className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}
>
  <div className="flex flex-col text-gray-600">
    {/* Close button */}
    <div 
      onClick={() => setVisible(false)} 
      className="flex items-center gap-2 p-3 cursor-pointer"
    >
      <img 
        className="h-4 rotate-180" 
        src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3433527/arrow-icon-md.png" 
        alt="Close" 
      />
      <span>Back</span>
    </div>
  

<NavLink 
  to="/" 
  onClick={() => setVisible(false)}
  className={({ isActive }) => 
    `px-3 py-2 ${isActive ? "text-black font-semibold border-b-2 border-black" : "text-gray-600"}`
  }
>
  HOME
</NavLink>

<NavLink 
  to="/collection" 
  onClick={() => setVisible(false)}
  className={({ isActive }) => 
    `px-3 py-2 ${isActive ? "text-black font-semibold border-b-2 border-black" : "text-gray-600"}`
  }
>
  COLLECTION
</NavLink>

<NavLink 
  to="/about" 
  onClick={() => setVisible(false)}
  className={({ isActive }) => 
    `px-3 py-2 ${isActive ? "text-black font-semibold border-b-2 border-black" : "text-gray-600"}`
  }
>
  ABOUT
</NavLink>

<NavLink 
  to="/contact" 
  onClick={() => setVisible(false)}
  className={({ isActive }) => 
    `px-3 py-2 ${isActive ? "text-black font-semibold border-b-2 border-black" : "text-gray-600"}`
  }
>
  CONTACT
</NavLink>


  </div>
</div>


    </div>
  )
}

export default Navbar
