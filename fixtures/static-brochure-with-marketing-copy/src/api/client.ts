export async function downloadBrochure() {
  const response = await fetch('/brochure.pdf');
  const brochureBlob = await response.blob();
  const url = URL.createObjectURL(brochureBlob);
  window.open(url, '_blank');
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}
