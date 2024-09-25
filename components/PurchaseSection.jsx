"use client";
import React, { useState } from "react";
import MainButton from "./MainButton";

const ProductCard = ({
  productName,
  productAmountETH,
  productAmountRuppe,
  sellerName,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div
        className="min-w-[230px] bg-black opacity-60 rounded-md shadow-md overflow-hidden mx-auto my-4 transition-transform transform hover:scale-105 hover:opacity-80"
        onClick={handleOpenPopup} // Open the popup on click
      >
        {/* Product Image */}
        <div className="p-2">
          <img
            className="w-full h-48 object-cover rounded-lg"
            src="/static/img/iphone.jpg"
            alt={productName}
          />
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{productName}</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src="/static/img/Userprofile.png"
                alt="Seller"
              />
              <span className="text-sm text-gray-600">{sellerName}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl font-bold text-blue-600">
                {productAmountETH} ETH
              </span>
              <span className="text-white text-sm">${productAmountRuppe}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <MainButton buttonText={"Buy Now"} />
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-4 max-w-md w-full">
            <h2 className="text-lg font-semibold">{productName}</h2>
            <img
              className="w-full h-48 object-cover rounded-lg my-2"
              src="/static/img/iphone.jpg"
              alt={productName}
            />
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
                Selling It
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
