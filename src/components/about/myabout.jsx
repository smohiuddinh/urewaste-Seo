
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

export default function MyAbout({ Title, SubTitle, services }) {
  return (
    <section className="bg-white py-20 px-4 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <p className="text-green-600 font-semibold uppercase tracking-wider mb-2">
          {Title}
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          {SubTitle}
        </h2>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="grid gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="relative group rounded-2xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            {/* Number Badge */}
            <div className="absolute -top-5 -left-5 text-gray-700 text-lg font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white border">
              {service.number}
            </div>

            {/* Content */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Hover Line Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
