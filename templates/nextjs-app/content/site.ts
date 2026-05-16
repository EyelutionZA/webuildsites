/*
  Editable business content. Replace every value with the real brand,
  ICP-specific copy. Keep content here so non-developers can edit it safely.
*/
export const siteConfig = {
  name: '__WEBUILD_PROJECT_TITLE__',
  tagline: 'A product platform built to the Webuild standard',
  description:
    'A production-conscious web app starter with auth, database, payments and health checks documented from day one.',
  url: 'https://example.com',
  contact: {
    email: 'hello@example.com'
  },
  cta: {
    primary: 'Open the dashboard',
    secondary: 'Product status'
  },
  nav: [
    { label: 'Product', href: '#product' },
    { label: 'Dashboard', href: '/dashboard' }
  ],
  highlights: [
    {
      index: '01',
      title: 'Accounts and access',
      body: 'Authentication, sessions and role checks scoped before any private data is exposed.'
    },
    {
      index: '02',
      title: 'Data and payments',
      body: 'A documented database, backup and restore plan, and verified payment webhooks before going live.'
    },
    {
      index: '03',
      title: 'Health and operations',
      body: 'A health endpoint, monitoring and a rollback path so the platform stays dependable.'
    }
  ]
} as const;
