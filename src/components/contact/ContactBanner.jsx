import Link from "next/link"

export function ContactBanner() {
  return (
    <section
      className="relative bg-gradient-to-r from-green-900 via-emerald-800 to-green-900"
      aria-labelledby="contact-heading"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-20 text-black">
        <div className="text-center md:text-left">
          <h1 id="contact-heading" className="text-4xl md:text-5xl font-light mb-4">
            Get in <span className="font-semibold text-emerald-700">Touch</span>
          </h1>
          <p className="text-lg max-w-2xl mb-8">
            We'd love to hear from you. Whether you have a question about our services, pricing, or just want to say
            hello — our team is here to help.
          </p>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-4">
            <ul className="flex justify-center md:justify-start items-center space-x-2 text-black">
              <li>
                <Link href="/" className="hover:underline transition">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/contact" className="hover:underline transition">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Soft Bubbles */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-28 h-28 bg-green-300 rounded-full opacity-20 blur-2xl animate-pulse" />
        <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-teal-300 rounded-full opacity-20 blur-2xl animate-pulse delay-200" />
        <div className="absolute top-1/2 left-2/3 w-16 h-16 bg-lime-300 rounded-full opacity-10 blur-2xl animate-pulse delay-500" />
      </div>
    </section>
  )
}
