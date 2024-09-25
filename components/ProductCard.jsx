import React from "react";
import MainButton from "./MainButton";

const ProductCard = ({
  productImage,
  productName,
  productAmountETH,
  productAmountRuppe,
  sellerName,
}) => {
  return (
    <div className="max-w-[280px] bg-black  rounded-md shadow-md overflow-hidden mx-auto my-4 transition-transform transform hover:scale-105 hover:opacity-80">
      {/* Product Image */}
      <div className="p-2">
        <img
          className="w-full h-48 object-cover rounded-lg" // Adjusted image height
          src={productImage} // Update this to dynamically receive product image if needed
          alt="Product"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold mb-2">{productName}</h3>

        {/* Seller Information and Amount on the same line */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="/static/img/Userprofile.png" // Update this to dynamically receive seller image if needed
              alt="Seller"
            />
            <span className="text-sm text-gray-600">{sellerName}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl font-bold text-blue-600">
              {productAmountETH}
              <span> ETH</span>
            </span>
            <span className="text-white text-sm">
              $<span>{productAmountRuppe}</span>
            </span>
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="flex justify-center">
          <MainButton buttonText={"Buy Now"} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
