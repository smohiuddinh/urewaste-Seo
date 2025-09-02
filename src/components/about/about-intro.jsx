import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const AboutIntro = ({
  Tagline ,
  Heading ,
  Description ,
  BreadCrumbCurrent,
}) => {
  return (
    <section className={`relative overflow-hidden py-24 md:py-32 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white`}>
      
        <div className="absolute top-10 right-10 animate-spin-slow opacity-20 z-0">
          <Leaf size={100} />
        </div>
      

      {/* 🌿 Background Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>

      {/* 📄 Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* ℹ️ Intro */}
          <div className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-widest text-white/80 mb-2">
              {Tagline}
            </h2>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              {Heading} 
            </h1>
            <p className="text-white/90 text-lg">{Description}</p>
          </div>

          {/* 🧭 Breadcrumbs */}
          <div className="mt-6 md:mt-0">
            <ul className="flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
              <li>
                <Link to="/" className="hover:text-white font-medium transition-colors">Home</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <span className="text-white font-semibold">{BreadCrumbCurrent}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
