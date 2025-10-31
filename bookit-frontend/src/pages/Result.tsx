// src/pages/Result.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Result: React.FC = () => {
  const [refId, setRefId] = useState("");

  // ✅ Generate random booking reference ID once on mount
  useEffect(() => {
    const randomId = "BOOK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setRefId(randomId);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center w-[400px]">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-green-500 text-white text-5xl flex items-center justify-center mx-auto mb-6 shadow-md">
          ✓
        </div>

        {/* Title and Info */}
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Booking Confirmed</h2>
        <p className="text-gray-600 mb-6">Ref ID: {refId}</p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-block bg-yellow-400 text-black font-medium px-5 py-2 rounded-lg hover:bg-yellow-500 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Result;
