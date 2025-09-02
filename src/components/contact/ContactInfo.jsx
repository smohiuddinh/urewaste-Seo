import React from "react";
import { MapPin, Clock } from "lucide-react";

// Remove the hardcoded offices from here

export function ContactInfo({ title , subtitle, offices }) {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 transition-colors">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offices.map((office, index) => {
            const Icon = office.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 p-1"
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-transparent to-emerald-200/10 group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none" />

                <div className="relative p-6 z-10">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-emerald-700" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-black">{office.title}</h3>

                  {office.address && (
                    <div className="mb-4 space-y-1">
                      {office.address.map((line, i) => (
                        <p key={i} className="text-black">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  {office.contact && (
                    <div className="space-y-2">
                      {office.contact.phone && (
                        <a
                          href={`tel:${office.contact.phone.replace(/\s/g, "")}`}
                          className="block text-black hover:underline"
                        >
                          {office.contact.phone}
                        </a>
                      )}
                      {office.contact.email && (
                        <a
                          href={`mailto:${office.contact.email}`}
                          className="block text-black hover:underline"
                        >
                          {office.contact.email}
                        </a>
                      )}
                    </div>
                  )}

                  {office.hours && (
                    <div className="mt-4 space-y-1">
                      {office.hours.map((hour, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-black">{hour.days}</span>
                          <span className="text-black font-medium">{hour.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
