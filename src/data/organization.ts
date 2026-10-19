// The Organization node for JSON-LD — one definition, emitted on every page that
// refers to `https://calma.io/#organization` (homepage, /about/). Search engines
// resolve an @id only inside the page that carries it, so a page that points at
// the organization must also ship the node itself.
//
// This is the entity record behind brand queries ("calma lead generation",
// "calma marketing"): sameAs ties it to the profiles that describe it. Add a
// profile here the day it goes live. No legal name or address here on purpose:
// the legal entity is kept out of machine-readable text (see privacy.astro).
import { site } from './site';

export const organizationJsonLd = {
  '@type': 'Organization',
  '@id': 'https://calma.io/#organization',
  name: 'Calma',
  alternateName: ['Calma Agency', 'Calma.io'],
  url: 'https://calma.io',
  logo: {
    '@type': 'ImageObject',
    url: 'https://calma.io/img/logo.svg',
  },
  image: 'https://calma.io/img/metaimg.png',
  description:
    'Calma is a performance lead generation publisher specializing in compliance-first, AI-optimized lead acquisition across auto insurance, home insurance, health insurance, home improvement, and financial services verticals.',
  foundingDate: '2024-12-21',
  email: site.email,
  areaServed: 'United States',
  contactPoint: {
    '@type': 'ContactPoint',
    email: site.email,
    contactType: 'sales',
  },
  sameAs: [site.linkedin, site.crunchbase, 'https://theorg.com/org/calma', 'https://www.goodfirms.co/company/calma'],
  founder: { '@id': 'https://drozdorus.com/#person' },
  knowsAbout: [
    'Lead Generation',
    'Performance Marketing',
    'Insurance Lead Generation',
    'Compliance Marketing',
    'AI-Driven Marketing',
    'Media Buying',
    'Digital Advertising',
    'Partner Marketing',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Lead Generation Services',
    itemListElement: [
      'Auto Insurance Lead Generation',
      'Home Insurance Lead Generation',
      'Health Insurance Lead Generation',
      'Home Improvement Lead Generation',
      'Financial Services Lead Generation',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
};
