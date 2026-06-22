import React from "react";

const TotalResult = ({ title = "Total Results", count = 0, message="found" }) => {
  return (
    <div className="total-result space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <span className="text-sm text-gray-500 font-mono">({count} {message})</span>
      </div>
    </div>
  );
};

export default TotalResult;
