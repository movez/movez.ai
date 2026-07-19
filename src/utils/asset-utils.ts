/** Prefix public paths so GitHub Pages basePath (/movez.ai) resolves correctly. */
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const assets = {
  gradient: assetPath("/assets/gradient.svg"),
  square: assetPath("/assets/square.svg"),
  cursor: assetPath("/assets/cursor.svg"),
  arrow: assetPath("/assets/arrow.svg"),
  movez: assetPath("/assets/movez-logo.png"),
  movezlarge: assetPath("/assets/movez-logo.png"),
  openai: assetPath("/assets/openai.png"),
  foursquare: assetPath("/assets/foursquare.png"),
  safari: assetPath("/assets/safari.webp"),
  chrome: assetPath("/assets/chrome.svg"),
  eventbrite: assetPath("/assets/eventbrite.png"),
  ticketmaster: assetPath("/assets/ticketmaster.png"),
  meetup: assetPath("/assets/icons/meetup.svg"),
  tripadvisor: assetPath("/assets/icons/tripadvisor.svg"),
  notepad: assetPath("/assets/icons/notepad.svg"),
  mobile: assetPath("/assets/mobile.svg"),
  desktop: assetPath("/assets/desktop.svg"),
  yelp: assetPath("/assets/yelp.png"),
} as const;
