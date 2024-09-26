"use client";
import React, { useState } from "react";


function PurchaseSection() {
    
    const [productID,AddProductId] = useState(null);

    const  RemoveProduct=()=>{

    }

  return (
    <div className="h-screen w-full bg-[#170E46]">
        <div className="h-[100%] flex justify-center items-center content-evenly">
            <div className="h-[100%] w-[50%] border-2 flex flex-col items-center justify-center bg-black">
                <div className="flex gap-3 items-center justify-center">
                    <div>
                        <img src="" alt="crate.png" />
                    </div>
                    <div>
                        <h1 className="text-2xl">
                            Create Crate
                        </h1>
                    </div>
                </div>

                <div className="h-[25%] w-[45%] flex flex-wrap bg-slate-500 gap-5">
                    {/* {productID.map((productid, index) => (
                        <div className="flex">
                            <h1>
                                PID{index}flex items-center justify-center
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                    ))} */}
                    <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                        <div className=" h-fit w-28 flex border-2 p-3 pl-3 pr-3 justify-between rounded-md bg-white text-purple-500 gap-5">
                            <h1>
                                PID1
                            </h1>
                            <button onClick={RemoveProduct()} className="">
                                X
                            </button>
                        </div>
                </div>
            </div>
            <div className="h-[100%] w-[50%] border-2">

            </div>
        </div>
    </div>
  );
}

export default PurchaseSection;