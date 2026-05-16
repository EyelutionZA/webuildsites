/*
  Editable business content. Replace every value with the real brand,
  ICP-specific copy. Keep content here so non-developers can edit it safely.
*/
export const siteConfig = {
  name: '__WEBUILD_PROJECT_TITLE__',
  tagline: 'Conversion-focused site with real lead capture',
  description:
    'A fast marketing site with server-side form handling, documented deployment, and managed hosting readiness.',
  url: 'https://example.com',
  contact: {
    phone: '+1 000 000 0000',
    email: 'hello@example.com',
    address: 'Your service area'
  },
  cta: {
    primary: 'Request a callback',
    secondary: 'How it works'
  },
  nav: [
    { label: 'How it works', href: '#approach' },
    { label: 'Contact', href: '#contact' }
  ],
  highlights: [
    {
      index: '01',
      title: 'Tell us what you need',
      body: 'A short form, validated on the server, with a clear success and error state — never a fake submit.'
    },
    {
      index: '02',
      title: 'It reaches the right place',
      body: 'Submissions route to your documented destination — webhook, CRM or inbox — with spam protection in place.'
    },
    {
      index: '03',
      title: 'We follow up fast',
      body: 'Every lead is captured reliably so the conversation can start while interest is still warm.'
    }
  ]
} as const;
