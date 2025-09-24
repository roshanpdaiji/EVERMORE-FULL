import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products,search,showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category,setCategory]=useState([])
  const[subCategory,setSubCategory]=useState([])

  const [sortType,setSortType]=useState('relevent')



  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter=()=>{
    let productsCopy=products.slice();

    if(showSearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

if(category.length>0){
 productsCopy=productsCopy.filter(item=>category.includes(item.category))

}

if(subCategory.length>0){
  productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory))
}

setFilterProducts(productsCopy)
   
  }


  const sortProduct = ()=>{
    let fpCopy= filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price -b.price)))
        break;

        case 'highlow':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
          break;

          default:
            applyFilter();
            break;
    }

  }

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t">
      {/* Left Side - Filters */}
      <div className="sm:w-1/4">
        {/* Filters Toggle for Mobile */}
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-4 text-lg sm:text-xl font-medium flex items-center justify-between cursor-pointer sm:cursor-default sm:justify-start gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src="https://cdn4.iconfinder.com/data/icons/arrows-578/64/Arrows_Down_ArrowDropdown_ArrowDrop_DownDownloadDrop_Down_ArrowMultimedia_OptionOrientationDownloadi-512.png"
            alt="toggle"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 rounded-md p-4 mb-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Men" className="w-4 h-4" onChange={toggleCategory} />
              Men
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Women" className="w-4 h-4" onChange={toggleCategory} />
              Women
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Kids" className="w-4 h-4" onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 rounded-md p-4 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-700">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Topwear" className="w-4 h-4" onChange={toggleSubCategory} />
              Topwear
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Bottomwear" className="w-4 h-4" onChange={toggleSubCategory} />
              Bottomwear
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Winterwear" className="w-4 h-4" onChange={toggleSubCategory} />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side - Products */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          {/* Sort Dropdown */}
          <select onChange={(e)=>setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3 py-2 rounded-md"
            defaultValue="relevant"
          >
            <option value="relevant">Sort by Relevant</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
