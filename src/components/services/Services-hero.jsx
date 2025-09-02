"use client"

import React from "react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function ServicesHero({ Title, SubTitle, services }) {
  return (
    <section className="bg-gray-50 py-20 px-4 md:px-20 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-14 text-center max-w-4xl mx-auto"
      >
        <p className="text-green-600 font-semibold uppercase tracking-wider mb-2">
          {Title}
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {SubTitle}
        </h2>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="relative group rounded-3xl p-8 bg-white bg-opacity-60 backdrop-blur-md
                       border border-gray-200 shadow-md shadow-green-300/20
                       cursor-pointer overflow-hidden
                       transition-transform duration-300 ease-in-out
                       hover:scale-[1.04] hover:shadow-lg hover:shadow-green-400/50"
          >
            {/* Number Badge */}
            <div className="absolute -top-6 -left-6 bg-white bg-opacity-90 border border-green-400
                            text-green-600 font-bold w-14 h-14 rounded-full flex items-center justify-center
                            shadow-md shadow-green-300">
              {service.number}
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Rotating Border Animation */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent
                group-hover:border-green-400
                after:content-[''] after:absolute after:inset-0 after:rounded-3xl
                after:border-2 after:border-gradient
                after:border-t-green-400 after:border-r-transparent after:border-b-transparent after:border-l-transparent
                after:animate-rotate-border"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CSS for rotating border animation */}
      <style jsx>{`
        @keyframes rotateBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .border-gradient {
          border-style: solid;
          border-color: transparent;
          border-top-color: #22c55e; /* Tailwind green-500 */
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
        }

        .animate-rotate-border {
          animation: rotateBorder 2.5s linear infinite;
          transform-origin: center;
          box-sizing: border-box;
        }
      `}</style>
    </section>
  )
}
