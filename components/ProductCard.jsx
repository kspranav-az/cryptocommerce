import React from "react";
import MainButton from "./MainButton";

const ProductCard = () => {
  return (
    <div className="max-w-[300px] bg-black opacity-40 rounded-md shadow-md overflow-hidden mx-auto my-4">
      {/* Product Image */}
      <div className="p-2">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src="/static/img/iphone.jpg"
          alt="Product"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold mb-2">Product Name</h3>

        {/* Seller Information and Amount on the same line */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="/static/img/Userprofile.png"
              alt="Seller"
            />
            <span className="text-sm text-gray-600">Seller Name</span>
          </div>
          <span className="text-xl font-bold text-blue-600">
            4.46<span> ETH</span>
          </span>
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
