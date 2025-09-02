// src/pages/ServicePage.jsx

import { useEffect, useState } from "react";
import { ServicesBanner } from "../components/services/Services-Banner";
import ServicesHero from "../components/services/Services-hero";
import { client, urlFor } from "../../sanityClient"; 
import ELoader from "../components/ELoader";
import ServiceTrashCan from "../components/services/ServiceTrashCan";
import { motion } from "framer-motion";
import ServicenMyHero from "../components/services/service-myhero";
import { Box, Repeat, Trash2 } from "lucide-react";
import Seo from "../components/Seo";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// 🔸 Map icon string to Lucide icon
const iconMap = {
  Box,
  Repeat,
  Trash2,
};

const hardcodedIcons = [Box, Repeat, Trash2]; // You can add more if needed
const hardcodedColors = ["#22c55e", "#3b82f6", "#facc15"]; // green, blue, yellow


const ServicePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchServicePage = async () => {
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

      const result = await client.fetch(query);
      setData(result);
    };

    fetchServicePage();
  }, []);

  if (!data) return <ELoader />;

  // 🔹 Convert trashCanItems to usable structure with icons
const serviceGridData = data.trashCanItems.map((item, index) => ({
  title: item.title,
  description: item.description,
  iconColor: hardcodedColors[index % hardcodedColors.length],
  IconComponent: hardcodedIcons[index % hardcodedIcons.length],
}));

  return (

    <>
    
       <Seo
        title="Our Services | UR E-WASTE – Sustainable Disposal & Resource Recovery"
        description="Discover UR E-WASTE services: secure and eco-friendly e-waste recycling solutions for homes and businesses."
        canonical="https://www.urewaste.com/services"
      />
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="service-page-container"
    >
      <motion.div variants={fadeUpVariant}>
        <ServicesBanner
          Heading={data.bannerHeading}
          Description={data.bannerDescription}
          Breadcrumb={data.bannerBreadcrumb}
        />
      </motion.div>

      <motion.div variants={fadeUpVariant}>
        <ServiceTrashCan
          gridItems={serviceGridData}
          shapeImage={urlFor(data.shapeImage).url()}
        />
      </motion.div>

      <motion.div variants={fadeUpVariant}>
        <ServicesHero
          Title={data.heroTitle}
          SubTitle={data.heroSubTitle}
          services={data.services}
        />
      </motion.div>

      <motion.div variants={fadeUpVariant}>
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
    </motion.div>

    </>
  );
};

export default ServicePage;
