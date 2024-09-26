"use client"
import React from "react";

const ProductCard = ({
  productImage,
  productName,
  productAmountETH,
  productAmountRuppe,
  sellerName,
  onViewProduct, // Function to trigger popup
  Product, // Passing the product data
  isPopupOpen, // Popup state
  selectedProduct, // Selected product data
  handleClosePopup, // Function to close the popup
}) => {
  return (
    <div className="max-w-[280px] bg-black opacity-40 rounded-md shadow-md overflow-hidden mx-auto my-4 transition-transform transform hover:scale-105 hover:opacity-80">
      {/* Product Image */}
      <div className="p-2">
        <img
          className="w-full h-48 object-cover rounded-lg"
          src={productImage}
          alt={productName}
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold mb-2 text-white">{productName}</h3>

        {/* Seller Information and Amount on the same line */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="/static/img/Userprofile.png"
              alt="Seller"
            />
            <span className="text-sm text-gray-300">{sellerName}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl font-bold text-blue-600">
              {productAmountETH}
              <span> ETH</span>
            </span>
            <span className="text-white text-sm">
              ₹<span>{productAmountRuppe}</span>
            </span>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          className="bg-blue-600 text-white rounded-md p-2 mt-4"
          onClick={() => onViewProduct(Product)} // Trigger the popup with product data
        >
          View Product
        </button>
      </div>

      {/* Popup */}
      {isPopupOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-4 max-w-md w-full">
            <h2 className="text-lg font-semibold">{selectedProduct.productname}</h2>
            <img
              className="w-full h-48 object-cover rounded-lg my-2"
              src={selectedProduct.productImage}
              alt={selectedProduct.productname}
            />
            <p className="my-2">Seller: {selectedProduct.sellername}</p>
            <p className="my-2">Price (ETH): {selectedProduct.productamounteth}</p>
            <p className="my-2">Price (INR): {selectedProduct.productamountruppe}</p>

            <form className="flex flex-col mt-4">
              <label className="mb-2">Phone Number:</label>
              <input
                type="text"
                className="border rounded-md p-2 mb-2"
                placeholder="Enter your phone number"
              />
              <label className="mb-2">Address:</label>
              <input
                type="text"
                className="border rounded-md p-2 mb-2"
                placeholder="Enter your address"
              />
              <button
                type="button"
                className="bg-blue-600 text-white rounded-md p-2 mt-4"
                onClick={handleClosePopup}
              >
                Purchase
              </button>
            </form>
            <button
              type="button"
              className="text-red-500 mt-2"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
