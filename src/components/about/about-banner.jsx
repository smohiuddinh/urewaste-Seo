import { motion } from "framer-motion"

export default function AboutBanner({
  Title,
  Description,
  imageSrc,
}) {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
            {Title}
          </h2>
          {Description.map((para, idx) => (
            <p
              key={idx}
              className={`text-gray-${idx === Description.length - 1 ? "600" : "700"} mb-6 text-lg leading-relaxed`}
              style={{ marginBottom: idx === Description.length - 1 ? 0 : "1.5rem" }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Right: Image or Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt='Illustration'
              className="w-full rounded-2xl shadow-lg"
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
