"use client";

import { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";
import { Truck, ListChecks, Wrench, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = {
  Truck,
  ListChecks,
  Wrench,
  ShieldCheck,
};

export default function ProcessSection() {
  const [steps, setSteps] = useState([]);
  const [settings, setSettings] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch data on mount
  useEffect(() => {
    Promise.all([
      client.fetch(
        `*[_type == "processStep"] | order(order asc){
          _id,
          title,
          description,
          icon,
          image
        }`
      ),
      client.fetch(`*[_type == "processSettings"][0]`),
    ])
      .then(([fetchedSteps, fetchedSettings]) => {
        setSteps(fetchedSteps);
        setSettings(fetchedSettings);
      })
      .catch(console.error);
  }, []);

  // Change image every 4 seconds
  useEffect(() => {
    if (steps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <section id="process" className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {settings?.heading || "Our Process"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            {settings?.subheading ||
              "A systematic approach to transforming enterprise equipment into affordable technology solutions."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Step List */}
          <ul className="space-y-8">
            {steps.map((step) => {
              // Safely get icon component, fallback to question mark if none found
              const Icon = icons[step.icon] || (() => <span>?</span>);
              return (
                <li key={step._id} className="flex items-start gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Image Slideshow with Slide-in Animation */}
          <div className="w-full flex justify-center relative">
            <div className="w-full max-w-lg sm:max-w-xl aspect-video relative overflow-hidden rounded-xl shadow">
              <AnimatePresence mode="wait">
                {steps.length > 0 && steps[currentImageIndex]?.image ? (
                  <motion.img
                    key={steps[currentImageIndex]._id}
                    src={urlFor(steps[currentImageIndex].image).width(800).height(600).url()}
                    alt={steps[currentImageIndex].title}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute  object-contain inset-0 w-full h-full  rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <motion.div
                    key="no-image"
                    className="absolute  inset-0 bg-gray-200 text-gray-500 flex items-center justify-center rounded-xl"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    No image available
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
