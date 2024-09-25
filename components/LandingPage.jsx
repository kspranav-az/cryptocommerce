import React from "react";

import Link from "next/link";

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

            <div
              className=" h-10 w-40 border-2 flex items-center justify-center text-2xl"
              style={{
                borderImage: "linear-gradient(to right, #775CF0, #42457B) 1",
                borderRadius: "2rem",
              }}
            >
              Join us
            </div>
          </div>
        </div>
      </section>
      <section id="2" className="h-screen w-full ">
        <div className="h-[100%] w-full flex gap-5 items-center justify-center">
          <div className="h-[80%] w-[30%]  border-2 border-[#42457B] rounded-3xl overflow-hidden">
            <div className="">
              <h1>
                Building the Future of
                <br />
                Decentralized Marketplace
              </h1>
            </div>
            <div className="">
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae quod in deleniti earum voluptatibus obcaecati
                consequuntur quos? Debitis quos sunt earum cupiditate tempora
                iusto voluptatem ipsum porro sapiente, repellat harum.
              </h1>
            </div>
            <img src="/etherium.svg" alt="" className="h-max w-max" />
          </div>
          <div className="h-[80%] w-[30%] border-2 border-[#42457B] rounded-3xl"></div>
        </div>
      </section>
    </div>
  );
}
