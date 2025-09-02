import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicenMyHero({
  backgroundImage,
  headingLabel ,
  headingTitle ,
  description,
  stats ,
  thumbnailImage,
  videoSrc,
}) {
  const [playVideo, setPlayVideo] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonHover = {
    scale: 1.1,
    transition: { duration: 0.2, ease: "easeInOut" },
  };

  return (
    <section
      className="w-full flex justify-center py-12 md:py-20 lg:py-24 relative text-white"
      style={{
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(4, 77, 45, 0.85),
            rgba(12, 103, 63, 0.9)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="container grid lg:grid-cols-2 gap-10 items-center px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Text Content */}
        <motion.div className="space-y-6" variants={leftVariants}>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
              {headingLabel}
            </p>
            <h1 className="text-xl sm:text-4xl md:text-4xl font-bold leading-tight text-white">
              {headingTitle}
            </h1>
            <p className="text-sm md:text-base text-emerald-100 max-w-md">
              {description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 max-w-sm">
            {stats.map(({ number, label }, i) => (
              <div key={i}>
                <h2 className="text-3xl font-bold text-white">{number}</h2>
                <p className="text-emerald-200 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image or Video */}
        <motion.div
          className="relative w-full h-64 md:h-96 lg:h-[400px] rounded-xl overflow-hidden shadow-xl"
          variants={rightVariants}
        >
          {playVideo ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src={thumbnailImage}
                alt="Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <motion.button
                whileHover={buttonHover}
                className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-600/90 text-white hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center"
                aria-label="Play video"
                onClick={() => setPlayVideo(true)}
              >
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-current" />
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
