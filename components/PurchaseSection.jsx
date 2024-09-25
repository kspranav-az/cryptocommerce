import React from "react";
import ProductCard from "./ProductCard";

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
  return (
    <section className="mt-6 m-10">
      <div className="grid grid-cols-5 gap-4">
        {" "}
        {/* Adjust columns as needed */}
        {ProductDetails.map((product, index) => (
          <ProductCard
            key={index}
            productImage={product.productImage}
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
