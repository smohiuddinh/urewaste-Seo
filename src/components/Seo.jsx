// Seo.jsx
import { useEffect } from "react";

const Seo = ({ title, description, canonical }) => {
  useEffect(() => {
    // Set page title
    if (title) {
      document.title = title;
    }

    // Set canonical URL
    if (canonical) {
      const link =
        document.querySelector("link[rel='canonical']") ||
        document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonical);
      document.head.appendChild(link);
    }

    // Set meta description
    if (description) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }
  }, [title, description, canonical]);

  return null; // No visible output
};

export default Seo;
