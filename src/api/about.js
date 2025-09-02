// src/api/about.js
import { client } from '../sanityClient';

export async function getAboutPageData() {
  const query = `*[_type == "aboutPage"][0]{
    tagline,
    heading,
    description,
    breadcrumbCurrent

    title
    paragraphs
    imageSrc

  ,
    finalQuote
  }`;

  const data = await client.fetch(query);
  return data;
}
