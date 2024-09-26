// Modal.js
import React from "react";

const ProductBuyModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed mt-4 mb-4 bg-mainbackground/90 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-mainbackground/90 rounded-md p-6 shadow-lg text-black max-w-[500px] ">
        <h2 className="text-xl font-bold mb-4">{product.productName}</h2>
        <img
          className="w-full h-48 object-cover rounded-lg mb-4"
          src="/static/img/iphone.jpg" // Update this to dynamically receive product image if needed
          alt={product.productName}
        />
        <p className="text-lg text-black">
          Price: {product.productAmountETH} ETH
        </p>
        <p className="text-lg text-black">
          Price in Rupees: ${product.productAmountRuppe}
        </p>
        <p className="mt-2 text-sm text-black">Seller: {product.sellerName}</p>

        <div className="mt-4">
          <label
            className="block mb-2  text-black text-sm font-semibold"
            htmlFor="phone"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Enter your phone number"
            className="w-full border text-black border-gray-300 rounded p-2 mb-4"
          />
          <label className="block mb-2 text-sm font-semibold" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
        </div>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => alert("Selling this product!")}
          >
            Sell It
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBuyModal;
