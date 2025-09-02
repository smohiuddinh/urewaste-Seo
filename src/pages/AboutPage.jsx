import { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";
import ELoader from "../components/ELoader";

import AboutIntro from "../components/about/about-intro";
import { AboutUsSection } from "../components/about/aboutus";
import AboutBanner from "../components/about/about-banner";
import AboutBanner2 from "../components/about/about-banner2";
import VisionSection from "../components/about/VisionSection";
import Seo from "../components/Seo";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "aboutPage"][0]`;
      const data = await client.fetch(query);
      setAboutData(data);
    };
    fetchData();
  }, []);



  if (!aboutData) return <ELoader />;

  const {
    tagline,
    heading,
    description,
    breadcrumbCurrent,
    aboutUs,
    bannerTitle,
    bannerDescriptions,
    bannerImage,
    visionSection,
    finalQuote,
  } = aboutData;

  return (
    <div>
      {/* Section 1: Intro */}

      <Seo
        title="About Us | UR E-WASTE – Leading the Future of Responsible Recycling"
        description="UR E-WASTE provides secure and eco-friendly e-waste recycling services."
        canonical="https://www.urewaste.com/about"
      />

      <AboutIntro
        Tagline={tagline}
        Heading={heading}
        Description={description}
        BreadCrumbCurrent={breadcrumbCurrent}
      />

      {/* Section 2: About Us */}
      <AboutUsSection
        title={aboutUs?.title}
        subtitle={aboutUs?.subtitle}
        description={aboutUs?.description}
        features={aboutUs?.features}
        images={{
          topLeft: urlFor(aboutUs?.topLeftImage).url(),
          bottomRight: urlFor(aboutUs?.bottomRightImage).url(),
        }}
        shape2={urlFor(aboutUs?.shapeImage).url()}
      />

      {/* Section 3: Banner */}
      <AboutBanner
        Title={bannerTitle}
        Description={bannerDescriptions}
        imageSrc={urlFor(bannerImage).url()}
      />

      {/* Section 4: Vision Section */}
      <VisionSection
        imageSrc={urlFor(visionSection?.image).url()}
        imageAlt={visionSection?.altText}
        label={visionSection?.label}
        title={visionSection?.title}
        description={visionSection?.description}
        buttonText={visionSection?.buttonText}
        navigateTo={visionSection?.navigateTo}
      />

      {/* Section 5: Final Quote */}
      <AboutBanner2 FinalQuote={finalQuote} />
    </div>
  );
};

export default AboutPage;
