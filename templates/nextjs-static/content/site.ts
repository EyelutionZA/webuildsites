/*
  Editable business content. Replace every value below with the real brand,
  ICP-specific copy. Keep content here so non-developers can edit it safely.
*/
export const siteConfig = {
  name: '__WEBUILD_PROJECT_TITLE__',
  tagline: 'Independent studio for considered brands',
  description:
    'A fast, maintainable, conversion-focused website built for future edits and managed hosting.',
  url: 'https://example.com',
  contact: {
    phone: '+1 000 000 0000',
    email: 'hello@example.com',
    address: 'Your service area'
  },
  cta: {
    primary: 'Start a project',
    secondary: 'See the approach'
  },
  nav: [
    { label: 'Approach', href: '#approach' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' }
  ],
  /* Editorial section content — varied, not a 3-up icon-card clone. */
  highlights: [
    {
      index: '01',
      title: 'One job per screen',
      body: 'Every page is built around a single decision the visitor needs to make — and the one action that follows it.'
    },
    {
      index: '02',
      title: 'Designed from the customer',
      body: 'Type, colour, density and motion are derived from the ideal customer profile, not from framework defaults.'
    },
    {
      index: '03',
      title: 'Built to be handed over',
      body: 'Structured content, documented deployment, and a clean codebase your team can keep editing for years.'
    }
  ]
} as const;
