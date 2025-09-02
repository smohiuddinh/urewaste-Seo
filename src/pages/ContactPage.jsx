import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import { getContactPageData } from "../lib/contactPage";

import { ContactHero } from "../components/contact/contact-hero";
import ContactForm from "../components/contact/contact-form";
import { ContactInfo } from "../components/contact/ContactInfo";
import { ContactMap } from "../components/contact/ContactMap";
import ELoader from "../components/ELoader";

// import ALL icons for dynamic rendering
import * as LucideIcons from "lucide-react";
import Seo from "../components/Seo";

export default function ContactPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    client
      .fetch(getContactPageData)
      .then((res) => {
        console.log("Sanity response:", res); // This logs the data returned from Sanity
        setData(res);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setError("Failed to load data.");
      });
  }, []); 

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!data) {
    return <ELoader />;
  }

  // Map icon string to actual Lucide component
  const officesWithIcons = data.contactInfo.offices.map((office) => ({
    ...office,
    icon: LucideIcons[office.icon] || null,
  }));

  return (
    <>
          <Seo
        title="Contact Us | UR E-WASTE"
        description="Get in touch with UR E-WASTE for secure and eco-friendly e-waste recycling services."
        canonical="https://www.urewaste.com/contact"
      />
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <ContactHero
        breadcrumb={data.hero.breadcrumb}
        heading={data.hero.heading}
        highlightedText={data.hero.highlightedText}
        description={data.hero.description}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="relative z-10 -mt-24">
          <ContactForm
            LeftHeading={data.contactForm.leftHeading}
            IntroText={data.contactForm.introText}
            LeftCardTitle={data.contactForm.leftCardTitle}
            LeftCardSubtitle={data.contactForm.leftCardSubtitle}
            LeftCardItems={data.contactForm.leftCardItems}
            Inputlabels={data.contactForm.inputLabels}
            Inputplaceholders={data.contactForm.inputPlaceholders}
            successMessage={data.contactForm.successMessage}
            errorMessage={data.contactForm.errorMessage}
            submitButtonText={data.contactForm.submitButtonText}
            submittingText={data.contactForm.submittingText}
          />
        </div>

        <ContactInfo
          title={data.contactInfo.title}
          subtitle={data.contactInfo.subtitle}
          offices={officesWithIcons}
        />

        <div className="mt-16">
          <ContactMap
            title={data.contactMap.title}
            subtitle={data.contactMap.subtitle}
            officeName={data.contactMap.officeName}
            mapSrc={data.contactMap.mapSrc}
          />
        </div>
      </div>
    </main>
    </>

  );
}
