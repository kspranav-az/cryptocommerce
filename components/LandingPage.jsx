import React from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

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
];

export default function Landingpage() {
  return (
    <div>
      <section id="1" className="h-screen">
        <div className="h-[90%] w-full ">
          <img
            className="w-full h-[90%] absolute -z-2 "
            src="/trust.png"
            alt="background"
          />
          <div className="absolute z-10 h-[100%] w-full flex flex-col items-start  justify-center gap-5 pl-16 ">
            <h1 className="text-[6rem]">
              Global Market, Local
              <br />
              Trust
            </h1>
            <h1 className="text-2xl">
              Revolutionizing the way you buy and sell.
            </h1>
            <Link href={"/User"}>
              <div className="flex items-center justify-center border-4 p-2 pl-4 pr-4 border-white rounded-2xl hover:bg-[#30207e] text-xl">
                Join Us!
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section id="2" className="h-screen w-full ">
        <div className="h-[100%] w-full flex gap-20 items-center justify-center">
          <div className="h-[60%] w-[20%]  border-2 border-[#42457B] rounded-3xl overflow-hidden flex flex-col pl-5">
            <div className="h-[25%] flex items-center justify-start ">
              <h1 className="text-2xl font-semibold">
                Building the Future of
                <br />
                <span style={{ color: "#775CF0" }}>Decentralized</span>{" "}
                Marketplace
              </h1>
            </div>

            <div className="">
              <h1 className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <br /> Recusandae quod in delenit
              </h1>
            </div>
            <div
              className=" h-[40rem] w-[40rem]  overflow-y-hidden flex justify-end items-center "
              style={{ marginLeft: "-16vh", marginRight: "-20vh" }}
            >
              <img
                src="/etherium.png"
                alt=""
                className="h-[30rem] w-[40rem] "
              />
            </div>
          </div>
          <div className="h-[60%] w-[20%]  border-2 border-[#42457B] rounded-3xl overflow-hidden flex flex-col pl-5">
            <div className="h-[25%] flex items-center justify-start ">
              <h1 className="text-2xl font-semibold">
                Secured & Seamless
                <br />
                Transfer through <span style={{ color: "#775CF0" }}>RFID</span>
              </h1>
            </div>

            <div className="">
              <h1 className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <br /> Recusandae quod in delenit
              </h1>
            </div>
            <div className=" h-full flex justify-end items-center pr-5 ">
              <img src="/RPID.png" alt="" className="h-max w-max " />
            </div>
          </div>
          <div className="h-[60%] w-[20%]  border-2 border-[#42457B] rounded-3xl overflow-hidden flex flex-col pl-5">
            <div className="h-[25%] flex items-center justify-start ">
              <h1 className="text-2xl font-semibold">
                Secured & Seamless
                <br />
                Transfer through <span style={{ color: "#775CF0" }}>RFID</span>
              </h1>
            </div>

            <div className="">
              <h1 className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <br /> Recusandae quod in delenit
              </h1>
            </div>
            <div className=" h-full flex justify-end items-center pr-5 ">
              <img src="/RPID.png" alt="" className="h-max w-max " />
            </div>
          </div>
        </div>
      </section>

      <section class="mt-6 m-10">
        <div className="grid grid-cols-5 gap-2 w-[10 rem]">
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
    </div>
  );
}
