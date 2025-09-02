import { motion } from "framer-motion";
import { CheckCircle, Contact } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function AboutUsSection(props) {
  const { title, subtitle, description, features, images } = props;

  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 lg:py-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-dotted-pattern-dark bg-repeat opacity-10 z-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-dotted-pattern-dark bg-repeat opacity-10 z-0 translate-x-1/2 translate-y-1/2"></div>
      <img
        src={props.shape2} // you can also pass this as a prop if you want
        alt="Decorative Shape"
        className="absolute top-0 right-0 w-64 h-64 opacity-20 z-0"
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-6 flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-primary-green text-lg font-semibold mb-4"
          >
            {title}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark leading-tight mb-6"
          >
            {subtitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-medium text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0"
          >
            {description}
          </motion.p>
          <ul className="space-y-3 mb-8 text-left mx-auto lg:mx-0 max-w-lg">
            {features.map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center text-text-dark text-base md:text-lg"
              >
                <CheckCircle className="size-5 text-primary-green mr-3 flex-shrink-0" />
                {feature}
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              onClick={() => navigate("/contact")}
              className="bg-primary-green text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-green-dark transition-colors duration-300"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative mt-12 lg:mt-0">
          <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={images.topLeft}
                alt="Top left banner"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={images.bottomRight}
                alt="Bottom right banner"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
