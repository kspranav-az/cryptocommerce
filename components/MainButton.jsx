import React from "react";

const MainButton = () => {
  return (
    <button
      className=" h-10 w-40 border-2 flex items-center justify-center text-2xl"
      style={{
        borderImage: "linear-gradient(to right, #775CF0, #42457B) 1",
        borderRadius: "2rem",
      }}
    >
      Join us
    </button>
  );
};

export default MainButton;
