import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({ message = "Loading...", fullScreen = false, size = 24 }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-8"
      }`}
    >
      <FaSpinner
        className="animate-spin text-blue-600"
        size={size}
      />
      {message && <p className="mt-2 text-gray-600 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
