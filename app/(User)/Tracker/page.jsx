"use client";
import Navbar from "@/components/NavBar";
import ProductTracker from "@/components/tracker";

export default function User() {
  return (
    <div className="">
      <div className="bg-white">
        <Navbar  />
      </div>

      <ProductTracker />
    </div>
  );
}
