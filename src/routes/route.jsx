import React, { useEffect, useState, Suspense, memo } from "react";
import { Routes, Route } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";
import ELoader from "../components/ELoader";
import { motion } from "framer-motion";
import useSWR from "swr";

// Lazy load pages & components
const Homepage = React.lazy(() => import("../components/Homepage"));
const ServicesSection = React.lazy(() => import("../components/ServicesSection"));
const ProcessSection = React.lazy(() => import("../components/ProcessSection"));
const WhyChooseUs = React.lazy(() => import("../components/WhyChooseUs"));
const AboutSection = React.lazy(() => import("../components/AboutSection"));
const WhatWeDoSection = React.lazy(() => import("../components/WhatWeDoSection"));
const FadeInSection = React.lazy(() => import("../components/FadeInSection"));
const ServicenMyHero = React.lazy(() => import("../components/services/service-myhero"));

const ServicePage = React.lazy(() => import("../pages/ServicePage"));
const AboutPage = React.lazy(() => import("../pages/AboutPage"));
const ContactPage = React.lazy(() => import("../pages/ContactPage"));
const SchedulePickupPage = React.lazy(() => import("../pages/SchedulePickupPage"));

// SWR fetcher
const fetcher = async () => {
  const query = `*[_type == "servicePage"][0]{
    bannerHeading,
    bannerDescription,
    bannerBreadcrumb,
    heroTitle,
    heroSubTitle,
    services,
    trashCanItems,
    shapeImage,
    coreHeadingLabel,
    coreHeadingTitle,
    coreDescription,
    coreStats,
    backgroundImage,
    thumbnailImage,
    videoSrc{asset->{url}}
  }`;
  return client.fetch(query);
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AppRoutes = () => {
  // Using SWR with fallback
  const { data } = useSWR("servicePageData", fetcher, { suspense: true });

  if (!data) return <ELoader />;

  return (
    <Suspense fallback={<ELoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FadeInSection><Homepage /></FadeInSection>

              <motion.div variants={fadeUpVariant} initial="hidden" animate="visible">
                <ServicenMyHero
                  backgroundImage={urlFor(data.backgroundImage).url()}
                  headingLabel={data.coreHeadingLabel}
                  headingTitle={data.coreHeadingTitle}
                  description={data.coreDescription}
                  stats={data.coreStats}
                  thumbnailImage={urlFor(data.thumbnailImage).url()}
                  videoSrc={data.videoSrc?.asset?.url || ""}
                />
              </motion.div>

              <FadeInSection delay={0.1}><ServicesSection /></FadeInSection>
              <FadeInSection delay={0.2}><ProcessSection /></FadeInSection>
              <FadeInSection delay={0.3}><WhyChooseUs /></FadeInSection>
              <FadeInSection delay={0.4}><AboutSection /></FadeInSection>
              <FadeInSection delay={0.5}><WhatWeDoSection /></FadeInSection>
            </>
          }
        />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/SchedulePickupPage" element={<SchedulePickupPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(AppRoutes);
