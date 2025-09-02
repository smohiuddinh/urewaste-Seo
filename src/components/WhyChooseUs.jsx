"use client"
import React, { useEffect, useState } from "react"
import { client } from "../../sanityClient"

const iconMap = {
  "shield-check": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
    </svg>
  ),
  "check-circle": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  "recycle": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3H13a1 1 0 000-2h-2a1 1 0 00-1 1v2a1 1 0 002 0v-1.21A9 9 0 1121 12.79z" />
    </svg>
  ),
}

export default function WhyChooseUs() {
  const [data, setData] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "whyChooseUs"][0]{
        heading,
        description,
        features[]{
          title,
          description,
          icon
        }
      }`)
      .then((res) => setData(res))
      .catch(console.error)
  }, [])

  if (!data) return null

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900">{data.heading}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{data.description}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {data.features?.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Door style background that scales from left on hover */}
              <div className="
                absolute inset-0 bg-gradient-to-br from-green-50 to-green-100
                origin-left scale-x-0 group-hover:scale-x-100
                transition-transform duration-500 ease-in-out
                pointer-events-none
                z-0
              "></div>

              {/* Content on top */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  {iconMap[feature.icon] || null}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mt-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
