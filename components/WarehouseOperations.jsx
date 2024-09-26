"use client";
import React, { useState, useEffect } from "react";

function PurchaseSection() {
 const [productID, setProductID] = useState("");
 const [rfid, setRfid] = useState("");
 const [scannerActive, setScannerActive] = useState(false);
 const [crates, setCrates] = useState([]);
 const [editingCrateIndex, setEditingCrateIndex] = useState(null);

 // Simulate scanner input by detecting a product ID input.
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

 // Toggle scanner active status
 const toggleScanner = () => {
setScannerActive(!scannerActive);
 };

 // Function to create a new crate or update an existing crate
 const handleCrate = () => {
const newCrate = { productID, rfid };
if (editingCrateIndex !== null) {
 // Update existing crate
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
<div className="h-screen w-full bg-[#170E46]">
 <div className="h-[100%] flex justify-center items-center content-evenly">
<div className="h-[100%] w-[50%] border-2 flex flex-col items-start p-20 pl-30 gap-10 justify-start bg-black">
 <div className="flex gap-3 items-center justify-center">
<div>
<img src="/static/img/warehouse1.png" alt="crate.png" />
</div>
<div>
<h1 className="text-2xl">Create Crate</h1>
</div>
 </div>

 <div className="flex flex-col justify-start w-[40%]">
<h1>ProductID</h1>
<input
type="text"
className="h-10"
value={productID}
onChange={(e) => setProductID(e.target.value)}
placeholder="Scan a product"
/>
<button
onClick={toggleScanner}
className={`mt-2 p-2 ${scannerActive ? "bg-green-500" : "bg-red-500"}`}
>
{scannerActive ? "Scanner Active" : "Activate Scanner"}
</button>
 </div>

 <div className="flex flex-col justify-start w-[40%]">
<h1>RFID UID</h1>
<input
type="text"
className="h-10"
value={rfid}
onChange={(e) => setRfid(e.target.value)}
placeholder="Enter RFID"
/>
 </div>

 <div className="w-[60%] bg-blue-500 rounded-md flex items-center justify-center gap-7">
<button className="pl-10" onClick={handleCrate}>
{editingCrateIndex !== null ? "Update Crate" : "Create Crate"}
</button>
<img src="/static/img/warehouse1.png" alt="" className="h-14 w-14" />
 </div>
</div>

<div className="h-[100%] w-[50%] border-2 flex flex-col items-start p-20 pl-30 gap-10 justify-start bg-black">
 <div className="h-[75%] w-[85%] border-2 rounded-2xl overflow-auto">
{crates.map((crate, index) => (
<div
 key={index}
 onClick={() => selectCrate(index)}
 className="flex gap-3 items-center justify-between border-2 p-3 mb-2 rounded-md bg-white text-purple-500 cursor-pointer"
>
 <h1>Crate {index + 1}</h1>
 <h1>ProductID: {crate.productID}</h1>
 <h1>RFID: {crate.rfid}</h1>
</div>
))}
 </div>
</div>
 </div>
</div>
 );
}

export default PurchaseSection;
