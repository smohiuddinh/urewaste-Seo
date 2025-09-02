import React from 'react';
import { FaLeaf } from 'react-icons/fa'; // eco-friendly leaf icon

export default function AboutBanner2({FinalQuote}) {
  return (
    <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-green-50 py-16 px-4 flex justify-center items-center text-center overflow-hidden">
      <div className="absolute left-10 top-1/2 -translate-y-1/2 animate-spin-slow opacity-20 text-green-400">
        <FaLeaf size={100} />
      </div>

      <div className="max-w-4xl z-10 px-4">
        <div className="flex justify-center mb-4">
          <FaLeaf className="text-green-200 text-2xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold leading-snug tracking-wide">
          {FinalQuote}
        </h1>
      </div>
    </div>
  );
}
