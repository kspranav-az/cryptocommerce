"use client";
import React, { useState, useEffect } from "react";

function PurchaseSection() {
  const [productID, setProductID] = useState("");
  const [rfid, setRfid] = useState("");
  const [scannerActive, setScannerActive] = useState(false);
  const [crates, setCrates] = useState([]);
  const [editingCrateIndex, setEditingCrateIndex] = useState(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (scannerActive && event.key === "Enter" && event.target.value !== "") {
        setProductID(event.target.value);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [scannerActive]);

  const toggleScanner = () => {
    setScannerActive(!scannerActive);
  };

  const handleCrate = () => {
    const newCrate = { productID, rfid };
    if (editingCrateIndex !== null) {
      const updatedCrates = [...crates];
      updatedCrates[editingCrateIndex] = newCrate;
      setCrates(updatedCrates);
      setEditingCrateIndex(null);
    } else {
      // Create a new crate
      setCrates([...crates, newCrate]);
    }
    // Reset input fields
    setProductID("");
    setRfid("");
  };

  // Function to select a crate for editing
  const selectCrate = (index) => {
    const selectedCrate = crates[index];
    setProductID(selectedCrate.productID);
    setRfid(selectedCrate.rfid);
    setEditingCrateIndex(index);
  };

  return (
    <div className="h-screen w-full bg-[#170E46] text-black font-bold ">
      <div className="h-[100%] flex justify-center items-center content-evenly">
        <div className="h-[100%] w-[50%]  flex flex-col items-start p-20 pl-30 pt-10 gap-10 justify-start bg-mainbackground">
          <div className="flex gap-3 items-center justify-center">
            <div>
              <img src="/static/img/warehouse1.png" alt="crate.png" />
            </div>
            <div>
              <h1 className="text-2xl text-white">Create Crate</h1>
            </div>
          </div>

          <div className="flex flex-col justify-start w-[40%] text-white">
            <h1>ProductID</h1>
            <input
              type="text"
              className=" w-80 p-6 mt-2 rounded-md h-10"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              placeholder="Scan a product"
            />
            <button
              onClick={toggleScanner}
              className={`mt-2 p-2 rounded-md  w-80 ${
                scannerActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {scannerActive ? "Scanner Active" : "Activate Scanner"}
            </button>
          </div>

          <div className="flex flex-col justify-start w-[40%] text-white">
            <h1>RFID UID</h1>
            <input
              type="text"
              className=" w-80 p-6 mt-2 rounded-md h-10"
              value={rfid}
              onChange={(e) => setRfid(e.target.value)}
              placeholder="Enter RFID"
            />
          </div>

          <div className="w-80 bg-blue-500 text-white rounded-md flex items-center justify-center gap-7">
            <button className="pl-10 " onClick={handleCrate}>
              {editingCrateIndex !== null ? "Update Crate" : "Create Crate"}
            </button>
            <img
              src="/static/img/warehouse1.png"
              alt=""
              className="h-14 w-14"
            />
          </div>
        </div>

        <div className="h-[100%] w-[50%] border-1.5 border-white/80  p-10  justify-start bg-mainbackground">
          <div className="h-[75%] w-[85%] grid grid-cols-4 gap-x-1.5 gap-y-1.5 rounded-md  overflow-y-auto grid-flow-row border-white/40 ">
            {crates.map((crate, index) => (
              <div
                key={index}
                onClick={() => selectCrate(index)}
                className="flex flex-col justify-center align-top"
              >
                <img
                  src="static/img/crate.png"
                  alt="CrateImg"
                  className="w-16 h-16"
                />
                <h1 className="text-sm">Crate {index + 1}</h1>
                <h1 className="text-sm">
                  <strong>PID:</strong>
                  {crate.productID}
                </h1>
                <h1 className="text-sm">
                  <strong>RFID:</strong>
                  {crate.rfid}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSection;
