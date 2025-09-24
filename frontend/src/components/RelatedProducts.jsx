import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom"; // optional, if you want to navigate to product

function RelatedProducts({ category, subCategory, productId }) {
  const { products, currency } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Filter products matching category and subCategory, but exclude current product
      const filtered = products.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== productId
      );
      setRelated(filtered.slice(0, 5)); // Take max 5 related products
    }
  }, [products, category, subCategory, productId]);

  if (related.length === 0) return null;

  return (

  <div className="mt-12">
  <h2 className="text-xl font-semibold mb-4">Related Products</h2>
  <div className="flex gap-4 overflow-x-auto">
    {related.map((item) => (
      <Link
        key={item._id}
        to={`/product/${item._id}`}
        className="flex-shrink-0 w-48 border rounded-lg p-2 hover:shadow-lg transition-shadow"
      >
        <img
          src={Array.isArray(item.image) ? item.image[0] : item.image}
          alt={item.name}
          className="w-full h-auto max-h-48 object-contain rounded-md mb-2"
        />
        <p className="text-sm font-medium text-gray-800">{item.name}</p>
        <p className="text-gray-600">
          {currency}
          {item.price}
        </p>
      </Link>
    ))}
  </div>
</div>



  );
}

export default RelatedProducts;
