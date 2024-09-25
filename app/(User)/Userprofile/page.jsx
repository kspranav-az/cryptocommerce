'use client'
import UserHeader from "@/components/User_header"
import UserProfile from "@/components/UserProfile"
export default function User() {
    return (
        <div className="">
            <div className="bg-white">
                <UserHeader/>
            </div>
            
            <UserProfile/>
        </div>
    )
}
