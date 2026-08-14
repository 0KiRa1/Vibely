import React from "react";
import { assets } from "../assets/assets";

const Loading = ({ height = "100vh" }) => {
  return (
    <div
      style={{ height }}
      className="w-full flex justify-center items-center"
    >
      <div className="relative">

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-xl opacity-40 animate-pulse" />

        <img
          src={assets.Vibely2}
          alt="Vibely"
          className="relative h-20 w-20 animate-pulse"
        />

      </div>
    </div>
  );
};

export default Loading;