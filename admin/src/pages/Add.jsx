import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


function Add({token}) {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)

  const [sizes, setSizes] = useState([]) // S, M, L, XL, XXL


const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(); // ✅ Capital F

    // Product fields
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);

    // Sizes (array → string for sending)
    formData.append("sizes", JSON.stringify(sizes));

    // Images
    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    // ✅ Make API request
    const response = await axios.post(
      backendUrl + "/api/product/add",
      formData,{headers:{token}}
    
    );

     if (response.data.success) {
      toast.success(response.data.message);

      // Reset fields
      setName('');
      setDescription('');
      setPrice('');
      setSizes([]);
      setImage1(false);
      setImage2(false);
      setImage3(false)
      setImage4(false);
    } else {
      toast.error(response.data.message || "Something went wrong!");
    }

  } catch (error) {
    console.error("❌ Error while submitting:", error);
    toast.error("Failed to add product. Please try again.");
  }
};



  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-5 p-4 bg-white shadow-md rounded-lg">

      {/* Upload Images */}
      <div className="w-full">
        <p className='mb-2 font-medium text-gray-700'>Upload Images</p>
        <div className='flex gap-4'>

 <label htmlFor="image1" className="flex flex-col items-center cursor-pointer">
  <img
    className="w-20 border rounded-lg p-2 hover:opacity-80"
    src={image1 ? URL.createObjectURL(image1) : "https://cdn-icons-png.flaticon.com/512/63/63732.png"}
    alt="Upload"
  />
  <input
    onChange={(e) => setImage1(e.target.files[0])}
    type="file"
    id="image1"
    className="hidden"
  />
</label>

<label htmlFor="image2" className="flex flex-col items-center cursor-pointer">
  <img
    className="w-20 border rounded-lg p-2 hover:opacity-80"
    src={image2 ? URL.createObjectURL(image2) : "https://cdn-icons-png.flaticon.com/512/63/63732.png"}
    alt="Upload"
  />
  <input
    onChange={(e) => setImage2(e.target.files[0])}
    type="file"
    id="image2"
    className="hidden"
  />
</label>

<label htmlFor="image3" className="flex flex-col items-center cursor-pointer">
  <img
    className="w-20 border rounded-lg p-2 hover:opacity-80"
    src={image3 ? URL.createObjectURL(image3) : "https://cdn-icons-png.flaticon.com/512/63/63732.png"}
    alt="Upload"
  />
  <input
    onChange={(e) => setImage3(e.target.files[0])}
    type="file"
    id="image3"
    className="hidden"
  />
</label>

<label htmlFor="image4" className="flex flex-col items-center cursor-pointer">
  <img
    className="w-20 border rounded-lg p-2 hover:opacity-80"
    src={image4 ? URL.createObjectURL(image4) : "https://cdn-icons-png.flaticon.com/512/63/63732.png"}
    alt="Upload"
  />
  <input
    onChange={(e) => setImage4(e.target.files[0])}
    type="file"
    id="image4"
    className="hidden"
  />
</label>


        </div>

      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-1 text-sm font-medium text-gray-700'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name}
          className='w-full max-w-[500px] px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black'
          type="text"
          placeholder='Type here'
        />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <p className='mb-1 text-sm font-medium text-gray-700'>Product Description</p>
    <textarea
  onChange={(e) => setDescription(e.target.value)}
  value={description}
  className='w-full max-w-[500px] px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black'
  rows="4"
  placeholder='Write content here'
></textarea>

      </div>

{/* Category, Subcategory & Product Price in one line */}
<div className='flex flex-col sm:flex-row gap-6 w-full'>
  
  <div className='flex flex-col w-full sm:w-1/3'>
    <p className='mb-1 text-sm font-medium text-gray-700'>Product Category</p>
    <select  onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded'>
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Kids">Kids</option>
    </select>
  </div>

  <div className='flex flex-col w-full sm:w-1/3'>
    <p className='mb-1 text-sm font-medium text-gray-700'>Sub Category</p>
    <select onChange={(e)=>setSubCategory(e.target.value)}  className='w-full px-3 py-2 border border-gray-300 rounded'>
      <option value="Topwear">Topwear</option>
      <option value="Bottomwear">Bottomwear</option>
      <option value="Winterwear">Winterwear</option>
    </select>
  </div>

  <div className='flex flex-col w-full sm:w-1/3'>
    <p className='mb-1 text-sm font-medium text-gray-700'>Product Price</p>
    <input onChange={(e)=>setPrice(e.target.value)} 
      className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black'
      type="number"
      placeholder='25'
    />
  </div>

</div>


      {/* Sizes */}
   
   <div>
  <p className='mb-2'>Product Sizes</p>

  <div className='flex gap-3'>
<div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
  <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
</div>

<div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
  <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
</div>

<div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
  <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
</div>

<div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
  <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
</div>

<div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
  <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
</div>



  </div>

</div>


      {/* Bestseller Checkbox */}
      <div className='flex items-center gap-2 mt-2'>
        <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} id='bestseller' type="checkbox" className="w-4 h-4 cursor-pointer" />
        <label htmlFor="bestseller" className='cursor-pointer text-sm'>Add to Bestseller</label>
      </div>

      {/* Submit Button */}
      <button className='w-32 py-2 mt-4 bg-black text-white rounded hover:bg-gray-800'>
        ADD
      </button>

    </form>
  )
}

export default Add
