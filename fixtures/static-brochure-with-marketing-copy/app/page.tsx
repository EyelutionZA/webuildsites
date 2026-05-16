import { Bullets } from '../components/Bullets';
import { downloadBrochure } from '../src/api/client';

export default function Page() {
  return (
    <main>
      <h1>Plumber in Pretoria</h1>
      <p>Schedule a callout for blocked drains, leaking taps, and geyser repairs.</p>
      <Bullets items={["Fast response", "Clear pricing", "Local team"]} />
      <button type="button" onClick={downloadBrochure}>Download brochure</button>
    </main>
  );
}
