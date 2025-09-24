import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible,setVisible]=useState(false)
  const location = useLocation()

  useEffect(()=>{
    if(location.pathname.includes('collection')){
        setVisible(true)
    }
    else{
        setVisible(false)
    }
  },[location])


  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img
          className="w-4 ml-2"
          src="https://www.freeiconspng.com/uploads/search-icon-png-20.png"
          alt="search"
        />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer ml-2"
        src="https://pnghq.com/wp-content/uploads/cross-icon-png-free-image-png-36325-1024x1024.png"
        alt="close"
      />
    </div>
  ) : null;
}

export default SearchBar;
