import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import warehouses from '/public/assets/warehouses.json'


function ProductTracker() {
    const [productID, setProductID] = useState("");
    const [status, setStatus] = useState(null);
    const [tampering, setTampering] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const currLoc = useState(false);


    const fetchDetails = async () => {
        var tempAdd = await integratedContract.updateLocation()
        if(integratedContract.upgradeLocation !== warehouses[0].location ){
            setTampering( true);
        }
        else{
            setTampering(false);
        }
    }

const trackProduct = () => {
const statuses = ['localWarehouse', 'stateWarehouse', 'secondLocalWarehouse', 'delivered'];
const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
setStatus(randomStatus);

const randomTampering = Math.random() < 0.5; 
setTampering(randomTampering);

setShowPopup(true);
setTimeout(() => setShowPopup(false), 3000); 
};

const getStepClass = (step) => {
const stepOrder = ['localWarehouse', 'stateWarehouse', 'secondLocalWarehouse', 'delivered'];
const currentStepIndex = stepOrder.indexOf(status);
const stepIndex = stepOrder.indexOf(step);

if (tampering && stepIndex === currentStepIndex) {
return 'text-red-500'; 
}
return stepIndex <= currentStepIndex+1 ? 'text-green-500' : '';
};

const getLineClass = (step) => {
const stepOrder = ['localWarehouse', 'stateWarehouse', 'secondLocalWarehouse', 'delivered'];
const currentStepIndex = stepOrder.indexOf(status);
const stepIndex = stepOrder.indexOf(step);

if (tampering) {
if (stepIndex < currentStepIndex - 1) {
return 'bg-green-500'; 
}
if (stepIndex < currentStepIndex) {
return 'bg-red-500';
}
} else {
return stepIndex < currentStepIndex ? 'bg-green-500' : 'bg-gray-400'; 
}
return 'bg-gray-400'; 
};

return (
<div className="bg-[#0A0544] text-white p-10 h-screen flex flex-col items-center">
<h1 className="text-3xl mb-8">TRACKING YOUR PRODUCT STATUS</h1>

<div className="mb-8">
<label className="mr-3">Product ID: </label>
<input
type="text"
value={productID}
onChange={(e) => setProductID(e.target.value)}
className="p-2 border-2 rounded-md text-black mr-4"
/>
<button
onClick={trackProduct}
className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
>
TRACK
</button>
</div>

<div className="flex justify-between items-center w-full max-w-4xl mt-16">
<div className="flex flex-col items-center">
<img src="/static/img/LocalWarehouse.png" alt="Local Warehouse" className="mb-3" />
<p>LOCAL WAREHOUSE</p>
<p className={`mt-2 ${getStepClass('localWarehouse')}`}>
{status === 'localWarehouse' || status === 'stateWarehouse' || status === 'secondLocalWarehouse' || status === 'delivered' ? tampering && status === 'localWarehouse' ? 'TAMPERED' : 'VERIFIED' : ''}
</p>
</div>

<div className={`h-1 w-24 ${getLineClass('stateWarehouse')}`}></div>

<div className="flex flex-col items-center">
<img src="/static/img/StateWarehouse.png" alt="State Warehouse" className="mb-3" />
<p>STATE WAREHOUSE</p>
<p className={`mt-2 ${getStepClass('stateWarehouse')}`}>
{status === 'stateWarehouse' || status === 'secondLocalWarehouse' || status === 'delivered' ? tampering && status === 'stateWarehouse' ? 'TAMPERED' : 'VERIFIED' : ''}
</p>
</div>

<div className={`h-1 w-24 ${getLineClass('secondLocalWarehouse')}`}></div>

<div className="flex flex-col items-center">
<img src="/static/img/LocalWarehouse.png" alt="Second Local Warehouse" className="mb-3" />
<p>LOCAL WAREHOUSE</p>
<p className={`mt-2 ${getStepClass('secondLocalWarehouse')}`}>
{status === 'secondLocalWarehouse' || status === 'delivered' ? tampering && status === 'secondLocalWarehouse' ? 'TAMPERED' : 'VERIFIED' : ''}
</p>
</div>

<div className={`h-1 w-24 ${getLineClass('delivered')}`}></div>

<div className="flex flex-col items-center">
<img src="/static/img/HomeLocation.png" alt="Your Location" className="mb-3" />
<p>YOUR LOCATION</p>
<p className={`mt-2 ${getStepClass('delivered')}`}>
{status === 'delivered' ? tampering && status === 'delivered' ? 'TAMPERED' : 'VERIFIED' : ''}
</p>
</div>
</div>

{showPopup && (
<div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${tampering ? 'bg-red-500' : 'bg-green-500'}`}>
{tampering ? 'Tampering detected!' : 'Transaction is secure'}
</div>
)}
</div>
);
}

export default ProductTracker;
