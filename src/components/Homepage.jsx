"use client";
import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor } from "../../sanityClient";
import ELoader from "./ELoader";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Seo from "./Seo";

const fetcher = (query) => client.fetch(query);

export default function Homepage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading, error } = useSWR(
    `*[_type == "homepage"][0]{
      title,
      subtitle,
      "carouselImages": carouselImages[]{
        asset->{_id,url},
        alt
      }
    }`,
    fetcher
  );

  useEffect(() => {
    const slides = data?.carouselImages || [];
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data?.carouselImages]);

  if (isLoading) return <ELoader />;
  if (error) return <p>Error loading data.</p>;
  if (!data) return null;

  const currentImg = data.carouselImages[currentSlide];

  const carouselVariants = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { x: -100, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <>
     <Seo
        title="Home | Reduce, Recycle, Recover"
        description="UR E-WASTE provides secure, eco-friendly e-waste recycling services for homes and businesses. Schedule a pickup today."
        canonical="https://www.urewaste.com"
      />
    <div className="relative h-screen pt-16 overflow-hidden bg-black">
      {/* Carousel Images */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <AnimatePresence>
          {currentImg && (
            <motion.div
              key={currentImg.asset._id}
              className="absolute inset-0 z-10"
              variants={carouselVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <img
                src={urlFor(currentImg.asset).width(1200).quality(70).auto("format").url()}
                srcSet={`
                  ${urlFor(currentImg.asset).width(600).quality(70).auto("format").url()} 600w,
                  ${urlFor(currentImg.asset).width(1200).quality(70).auto("format").url()} 1200w,
                  ${urlFor(currentImg.asset).width(1800).quality(70).auto("format").url()} 1800w
                `}
                sizes="(max-width: 640px) 600px, (max-width: 1024px) 1200px, 1800px"
                alt={currentImg.alt || data.title || `Hero slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                // 👇 Optimize LCP
                loading={currentSlide === 0 ? "eager" : "lazy"}
                fetchpriority={currentSlide === 0 ? "high" : "auto"}
                draggable={false}
              />
              {/* Optimized overlay */}
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="relative z-20 flex items-center h-full px-6 sm:px-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        <div className="max-w-4xl">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {data.title.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-3 last:mr-0 hover:text-green-300 transition-colors duration-300 cursor-default"
              >
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white mb-10 max-w-xl leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 items-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <button
              onClick={() => {
                const el = document.getElementById("services");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-green-700 text-green-50 px-10 py-4 text-lg font-semibold rounded-full shadow-xl hover:scale-110 hover:bg-green-600 transition-transform duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/SchedulePickupPage")}
              className="border border-green-200 text-green-200 px-10 py-4 text-lg font-semibold rounded-full hover:bg-green-200 hover:text-green-900 bg-transparent transition-all duration-300 hover:scale-110"
            >
              Request a Pickup
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-5">
        {data.carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-5 h-5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              idx === currentSlide
                ? "bg-green-400 scale-125 shadow-xl"
                : "bg-green-100/50 hover:bg-green-100/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 right-10 z-30 flex flex-col items-center text-green-300 drop-shadow-lg cursor-default select-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-sm mb-1 font-semibold tracking-wide">Scroll</span>
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </div>

    </>
  );
}
