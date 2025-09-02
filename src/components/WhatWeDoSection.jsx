import React from "react";
import bgImage from "../assets/hello2-removebg-preview.png"; // Replace with your actual path

export default function WhatWeDoSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="e-waste bin"
        className="absolute top-1/2 left-1/2 w-72 sm:w-96 md:w-[30rem] transform -translate-x-1/2 -translate-y-1/2 opacity-20 object-contain z-0"
      />

      {/* Text Content */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold">
          <span className="text-green-600">What We </span>
          <span className="text-[#0a2b24]">Do</span>
        </h2>
        <p className="mt-4 text-[#0a2b24] max-w-xl mx-auto text-sm sm:text-base">
          Eco-friendly e-waste collection, recycling, and safe disposal. Join us
          in protecting the environment, one device at a time.
        </p>
      </div>
    </section>
  );
}
