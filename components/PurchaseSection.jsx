import React from "react";
import ProductCard from "./ProductCard";

const ProductDetails = [
  {
    productname: "Iphone",
    productamounteth: "4.5",
    productamountruppe: "3000.0",
    sellername: "Apple",
  },
  // Add more products as needed to fill the grid
  {
    productname: "Iphone 12",
    productamounteth: "3.5",
    productamountruppe: "2500.0",
    sellername: "Apple",
  },
  {
    productname: "Iphone 13",
    productamounteth: "5.0",
    productamountruppe: "3500.0",
    sellername: "Apple",
  },
  {
    productname: "Iphone 14",
    productamounteth: "6.0",
    productamountruppe: "4000.0",
    sellername: "Apple",
  },
  {
    productname: "Iphone SE",
    productamounteth: "2.0",
    productamountruppe: "1500.0",
    sellername: "Apple",
  },
  {
    productname: "Iphone XR",
    productamounteth: "3.0",
    productamountruppe: "2200.0",
    sellername: "Apple",
  },
];

function PurchaseSection() {
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
    </section>
  );
}

export default PurchaseSection;
