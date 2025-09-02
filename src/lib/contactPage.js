export const getContactPageData = `
  *[_type == "contactPage"][0] {
    hero {
      breadcrumb,
      heading,
      highlightedText,
      description
    },
    contactForm {
      leftHeading,
      introText,
      leftCardTitle,
      leftCardSubtitle,
      leftCardItems,
      inputLabels,
      inputPlaceholders,
      successMessage,
      errorMessage,
      submitButtonText,
      submittingText
    },
    contactInfo {
      title,
      subtitle,
      offices[]{
        title,
        icon,
        address,
        contact {
          phone,
          email
        },
        hours[]{
          days,
          time
        }
      }
    },
    contactMap {
      title,
      subtitle,
      officeName,
      mapSrc
    }
  }
`;
