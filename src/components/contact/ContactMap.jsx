import React from "react";
import { MapPin } from "lucide-react";

export function ContactMap({title, subtitle,  officeName, mapSrc }) {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            {officeName}
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${officeName} Location`}
            className="filter grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>

          <div className="absolute inset-0 pointer-events-none border-4 border-white/10 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
