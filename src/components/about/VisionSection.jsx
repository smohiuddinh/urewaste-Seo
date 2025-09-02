import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VisionSection({
  imageSrc,
  imageAlt ,
  label ,
  title ,
  description,
  buttonText ,
  navigateTo,
}) {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target); // Animate once only
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center py-16 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 text-white"
    >
      <div className="container flex flex-col lg:flex-row items-center gap-12 px-6 md:px-12 max-w-7xl">
        {/* Left Image */}
        <div
          className={`flex-1 max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 ease-out ${
            animate ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Content */}
        <div
          className={`flex-1 space-y-6 transition-opacity duration-1000 ease-out ${
            animate ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: animate ? "blur(0)" : "blur(8px)",
            transition: "filter 1s ease-out",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            {label}
          </p>
          <h2 className="text-4xl font-extrabold leading-tight drop-shadow-md">
            {title}
          </h2>
          <p className="text-emerald-200 text-lg max-w-xl leading-relaxed">
            {description}
          </p>
          <button
            className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-7 rounded-lg shadow-lg transition-colors duration-300"
            onClick={() => navigate(navigateTo)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
