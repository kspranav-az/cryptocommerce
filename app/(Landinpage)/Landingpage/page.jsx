import React from 'react'
import Navbar from '@/components/NavBar'
import Landingpage from '@/components/LandingPage'
export default function Seller() {
    return (
        <div className="bg-[#170E46]">
            <div>
                <Navbar/>
            </div>
            <div>
                <Landingpage/>
            </div>
        </div>
    )
}
