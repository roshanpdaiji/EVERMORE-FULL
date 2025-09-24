import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r bg-gray-50'>
      <div className='flex flex-col gap-3 pt-6 px-[15%] text-sm font-medium'>

        {/* Add Items */}
        <NavLink 
          to='/add' 
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition border 
            ${isActive ? 'active' : 'text-gray-600 hover:bg-gray-100'}`
          }
        >
          <img className='w-5 h-5' src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="Add" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink 
          to='/list' 
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition border 
            ${isActive ? 'active' : 'text-gray-600 hover:bg-gray-100'}`
          }
        >
          <img className='w-5 h-5' src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-vector-list-icon-png-image_3785548.jpg" alt="List" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink 
          to='/orders' 
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition border 
            ${isActive ? 'active' : 'text-gray-600 hover:bg-gray-100'}`
          }
        >
          <img className='w-5 h-5' src="https://tse4.mm.bing.net/th/id/OIP.CvW9R9-n5FSsCWg8DBfVOQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Orders" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
