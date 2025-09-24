import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹'
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  console.log("Backend URL:", backendUrl);

  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const [cartItems, setCartItems] = useState({})

  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')

  const navigate = useNavigate();


  //add to cart

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Please select a size')
      return;
    }



    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }


  }


  //get cart count

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          // ignore errors
        }
      }
    }
    return totalCount;
  };


  //update quantity


  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    // if the product exists, update its quantity
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }


  };


  //get cart amount

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalAmount += itemInfo.price * cartItems[items][size];
          }
        } catch (error) { }
      }
    }
    return totalAmount;
  };


  //get products data

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      console.log("API Response:", response.data); // 🔍 check this
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error(error.message);
    }
  };

  

  //get user cart data
const getUserCart = async (token) => {
  try {
    const response = await axios.post(
      backendUrl + '/api/cart/get',
      {}, 
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);  // <-- use cartData
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    getProductsData()
  }, [])



  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])



  
  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,setCartItems,
    getCartCount, updateQuantity,
    getCartAmount, navigate,
    backendUrl,
    token, setToken, setCartItems

  }


  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
