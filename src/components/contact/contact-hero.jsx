import React from "react";
import { ChevronRight } from "lucide-react";

export function ContactHero({ heading, highlightedText, description, breadcrumb }) {
  return (
    <section className="relative bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-700/20" />

      {/* Eco-friendly accent elements */}
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center text-sm text-gray-200 mb-6">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{breadcrumb}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
              {highlightedText}
            </span>
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
