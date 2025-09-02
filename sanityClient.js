// src/sanityClient.js

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '2g38g9ru',       
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
  token:'sk0IzfT8E1d9XtOKcUhO0DUEEcOeF7uQItV6SnyTGzndWvPOE1eUWltt65vpYEQbnX7pSJLtiyydBnY57QSunSP7yKateJXI8YyX4Kiyi1wiepgdLxVoKeAeEgyvNEFDoTDf4bVu84kYnuwnPHhVWguedOWC2skTEI4pNBjK4vA3aT3DbxJM'
})

const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}
