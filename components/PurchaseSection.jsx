"use client";
import React, { useState } from "react";
import MainButton from "./MainButton";

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
    <section className="mt-6 m-10">
      <div className="grid grid-cols-5 gap-4">
        {" "}
        {/* Adjust columns as needed */}
        {ProductDetails.map((product, index) => (
          <ProductCard
            key={index}
            productName={product.productname}
            productAmountETH={product.productamounteth}
            productAmountRuppe={product.productamountruppe}
            sellerName={product.sellername}
          />
        ))}
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
