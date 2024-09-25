"use client";
import React from "react";

const buyHandler = async () => {
  console.log("buying....");
};

const MainButton = ({ buttonText, Href }) => {
  return (
    <button
      style={{
        height: "2.5rem",
        width: "10rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        borderRadius: "30px",
        background: "linear-gradient(to right, #775cf0, #42457b)", // Gradient background
        padding: "2px", // Padding to create space for the inner background
        border: "none",
        position: "relative",
        backdropFilter: "blur(10px)", // Apply background blur behind the button
      }}
      onClick={buyHandler}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {buttonText}
      </div>
    </button>
  );
};

export default MainButton;
