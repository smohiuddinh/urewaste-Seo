import React from "react";
import { Link } from "react-router-dom";
export function ServicesBanner({ Heading, Description, Breadcrumb }) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-t from-green-600 via-green-500 to-green-700 text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {Heading}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl">
              {Description}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul
              className="flex items-center gap-2 text-sm text-white/70"
              aria-label="Breadcrumb"
            >
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link to="/services" className="text-white font-semibold">
                  {Breadcrumb}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180"
        style={{ height: "100px" }}
      >
        <svg
          className="relative block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#16a34a"
            fillOpacity="1"
            d="M0,160L80,149.3C160,139,320,117,480,117.3C640,117,800,139,960,154.7C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
