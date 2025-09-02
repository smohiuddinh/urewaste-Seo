// src/sanityClient.js

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}
