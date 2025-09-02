import React, { useEffect, useState } from "react"
import { client } from "../../sanityClient"

const CheckIcon = () => (
  <svg
    className="h-5 w-5 text-emerald-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const AboutSection = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "aboutSection"][0]{
          heading,
          description,
          highlights,
          "imageUrl": image.asset->url
        }`
      )
      .then((res) => setData(res))
      .catch(console.error)
  }, [])

  if (!data) return null

  return (
    <section id="about" className="w-full py-16 md:py-24 bg-[#f6f9f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          
          {/* Text Block */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              {data.heading}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              {data.description}
            </p>

            <ul className="space-y-3">
              {data.highlights?.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Block */}
          <div className="flex justify-center">
            {data.imageUrl && (
              <img
                src={data.imageUrl}
                alt="About"
                className="rounded-2xl shadow-md object-cover max-w-full h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
