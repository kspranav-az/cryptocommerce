import React from "react";

const ProductCard = () => {
  return (
    <div className="max-w-sm w-full bg-black opacity-40 rounded-md shadow-md overflow-hidden mx-auto my-4">
      {/* Product Image */}
      <div className="p-2">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src="/static/images/cards/paella.jpg"
          alt="Product"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Product Name and Seller Information */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Product Name</h3>
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="/static/images/seller.jpg"
              alt="Seller"
            />
            <span className="text-sm text-gray-600">Seller Name</span>
          </div>
        </div>

        {/* Amount */}
        <div className="flex justify-end mb-4">
          <span className="text-xl font-bold text-blue-600">
            4.46<span>ETH</span>
          </span>
          <span className=""></span>
        </div>

        {/* Buy Now Button */}
        <div className="flex justify-center">
          {/* <button className="w-full  text-white py-2 px-4 rounded-lg hover:bg-blue-500">
            Buy Now
          </button> */}
          <div
            className=" h-10 w-40 border-2 flex items-center justify-center text-2xl"
            style={{
              borderImage: "linear-gradient(to right, #775CF0, #42457B) 1",
              borderRadius: "2rem",
            }}
          >
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
