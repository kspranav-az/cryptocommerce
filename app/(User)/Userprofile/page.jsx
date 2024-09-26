"use client";
import UserHeader from "@/components/User_header";
import UserProfile from "@/components/UserProfile";

export default function User() {
  return (
    <div className="p-0 m-0">
      <div className="bg-mainbackground p-0 m-0">
        <UserHeader />
      </div>

      <UserProfile />
    </div>
  );
}
