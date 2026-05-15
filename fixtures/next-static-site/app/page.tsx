export default function Page() {
  return <main>{process.env.NEXT_PUBLIC_GA_ID || 'Static marketing site'}</main>;
}
