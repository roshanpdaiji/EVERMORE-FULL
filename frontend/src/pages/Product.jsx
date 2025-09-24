import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Product() {
  const { productId } = useParams();
  const { products,currency ,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size,setSize]=useState('')

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      // if multiple images → take first, else take single string
      if (Array.isArray(foundProduct.image)) {
        setImage(foundProduct.image[0]);
      } else {
        setImage(foundProduct.image);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
   <div className="pt-10 border-t-2 transition-opacity duration-500 ease-in opacity-100">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Left: Product Image */}
        <div className="sm:w-1/2 flex flex-col gap-4">
          <img className="w-full h-auto rounded-lg shadow-md" src={image} alt="main product" />

          {/* Thumbnails */}
          <div className="flex sm:flex-row gap-2 mt-2 overflow-x-auto">
            {Array.isArray(productData.image)
              ? productData.image.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumbnail-${idx}`}
                    onClick={() => setImage(img)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-md cursor-pointer border hover:shadow-lg transition-shadow"
                  />
                ))
              : null}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="sm:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">{productData.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src="https://static.vecteezy.com/system/resources/previews/022/133/469/non_2x/star-shape-star-icon-yellow-star-in-rating-symbol-free-png.png"
                  alt="star"
                  className="w-4 sm:w-5"
                />
              ))}
            <span className="text-gray-500 ml-2">(122)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900">{currency}{productData.price}</p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>

          {/* Sizes */}
          <div>
            <p className="text-lg font-medium text-gray-700 mt-3">Select Size</p>
            
            <div className="flex flex-wrap gap-3 mt-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-5 py-2 rounded-lg border font-medium transition-all duration-200
                    ${item === size ? "border-orange-500 text-orange-500" : "border-gray-300 text-gray-700"}
                    hover:bg-black hover:text-white`}
                >
                  {item}
                </button>
              ))}
            </div>


          </div>

          {/* Add to Cart */}
          <button onClick={()=>addToCart(productData._id,size) }
           className="mt-5 bg-black text-white px-8 py-3 text-sm font-semibold rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200">
            ADD TO CART
          </button>

          {/* Highlights */}
          <div className="flex flex-col gap-2 mt-4 text-gray-600 text-sm sm:text-base">
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on Delivery Available</p>
            <p>🔄 Easy Return & Exchange within 7 Days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews below image */}
      <div className="mt-12 sm:mt-16">
        <div className="flex border-b border-gray-300">
          <button className="px-6 py-3 text-sm font-medium border-b-2 border-black">
            Description
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200">
            Reviews (122)
          </button>
        </div>
        <div className="px-6 py-6 text-gray-600 text-sm bg-gray-50 border border-t-0 rounded-b-lg">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            fermentum, nulla non facilisis volutpat, urna lacus facilisis metus, nec
            feugiat risus nisi a justo.
          </p>
          <p className="mt-2">
            Suspendisse potenti. Curabitur vitae orci eget nunc posuere
            pellentesque. Duis convallis elit ut justo sodales, a tempor orci
            ullamcorper.
          </p>
        </div>
      </div>

{/*Display Related Products*/}

<RelatedProducts category={productData.category} subCategory={productData.subCategory}/>


    </div>
    
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;




