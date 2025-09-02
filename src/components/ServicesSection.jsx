import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import * as LucideIcons from "lucide-react";

export default function ServicesSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "servicesSection"][0]{
          heading,
          subheading,
          services[] {
            title,
            description,
            icon
          }
        }`
      )
      .then((data) => setSection(data))
      .catch(console.error);
  }, []);

  if (!section) {
    return <p className="p-4">Loading services...</p>;
  }

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-800">
              {section.heading}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              {section.subheading}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-6xl gap-6 py-16 lg:grid-cols-3 lg:gap-12 items-stretch">
          {section.services?.map((service, index) => {
            const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;

            return (
              <div
                key={index}
                className="group relative overflow-hidden border-[1px] border-gray-200 rounded-2xl bg-white shadow-sm p-6 text-center flex flex-col transition-all duration-300 hover:shadow-xl"
              >
                {/* Top border animation (always visible) */}
                <span
                  className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-green-400 via-green-500 to-green-400 opacity-100"
                  style={{
                    animation: "moveRight 3s linear infinite",
                  }}
                />

                {/* Bottom border animation (always visible) */}
                <span
                  className="absolute bottom-0 right-0 h-[3px] w-full bg-gradient-to-l from-green-400 via-green-500 to-green-400 opacity-100"
                  style={{
                    animation: "moveLeft 3s linear infinite",
                  }}
                />

                {/* Card Content */}
                <div className="relative z-10 bg-white rounded-xl px-4 py-6 flex flex-col items-center text-center h-full">
                  <Icon className="h-12 w-12 mb-4 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow group-hover:text-gray-800 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Inline keyframes for continuous animation */}
                <style>
                  {`
                    @keyframes moveRight {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                    @keyframes moveLeft {
                      0% { transform: translateX(100%); }
                      100% { transform: translateX(-100%); }
                    }
                  `}
                </style>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
