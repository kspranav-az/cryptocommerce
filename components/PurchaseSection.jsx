"use client";
import React, { useState } from "react";

import ProductCard from "@/components/ProductCard";

const ProductDetails = [
  {
    productImage: "/static/img/iphone.jpg",
    productname: "Iphone",
    productamounteth: "4.5",
    productamountruppe: "3000.0",
    sellername: "RK Traders",
  },
  {
    productImage: "/static/img/samsung buds.jpg",
    productname: "Samsung Buds",
    productamounteth: "3.5",
    productamountruppe: "2500.0",
    sellername: "KK Brothers",
  },
  {
    productImage: "/static/img/cosmetics1.jpg",
    productname: "Lipstic",
    productamounteth: "5.0",
    productamountruppe: "3500.0",
    sellername: "Balaji & Co",
  },
  {
    productImage: "/static/img/saree.jpg",
    productname: "Saree",
    productamounteth: "6.0",
    productamountruppe: "4000.0",
    sellername: "KG Traders",
  },
  {
    productImage: "/static/img/airpods1.jpg",
    productname: "Airpods",
    productamounteth: "2.0",
    productamountruppe: "1500.0",
    sellername: "Apple.in",
  },
  {
    productImage: "/static/img/perfume1.jpg",
    productname: "Perfume",
    productamounteth: "3.0",
    productamountruppe: "2200.0",
    sellername: "ab1",
  },
  {
    productImage: "/static/img/shirt1.jpg",
    productname: "Iphone SE",
    productamounteth: "2.0",
    productamountruppe: "1500.0",
    sellername: "KK Brothers",
  },
  {
    productImage: "/static/img/hoodie1.jpg",
    productname: "Iphone XR",
    productamounteth: "3.0",
    productamountruppe: "2200.0",
    sellername: "RK Traders",
  },
];

function PurchaseSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product); // Store the clicked product details
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <section className="mt-6 m-10">
      <div className="grid grid-cols-5 gap-4">
        {ProductDetails.map((product, index) => (
          <div key={index}>
            <ProductCard
              productImage={product.productImage}
              productName={product.productname}
              productAmountETH={product.productamounteth}
              productAmountRuppe={product.productamountruppe}
              sellerName={product.sellername}
              onViewProduct={() => handleOpenPopup(product)} // Pass product to popup handler
            />
          </div>
        ))}
      </div>

      {/* Popup */}
      {isPopupOpen && selectedProduct && (
        <div className="fixed mt-4 mb-4 inset-0 flex items-center justify-center z-50">
          <div className="bg-mainbackground/90 backdrop-blur-md rounded-md p-4 max-w-[500px] w-full relative">
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500 text-lg"
              onClick={handleClosePopup}
            >
              &times; {/* Using × for a close icon */}
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {selectedProduct.productname}
            </h2>
            <img
              className="w-full h-48 object-cover rounded-lg my-2"
              src={selectedProduct.productImage}
              alt={selectedProduct.productname}
            />
            <p className="my-2">Seller: {selectedProduct.sellername}</p>
            <p className="my-2">
              Price (ETH): {selectedProduct.productamounteth}
            </p>
            <p className="my-2">
              Price (INR): {selectedProduct.productamountruppe}
            </p>
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
          </div>
        </div>
      )}
    </section>
  );
}

export default PurchaseSection;
