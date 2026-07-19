export const frameworks = [
  "svelte",
  "foursquare",
  "safari",
  "chrome",
  "eventbrite",
  "meetup",
  "tripadvisor",
  "notepad",
  "mobile",
  "desktop",
  "yelp",
] as const;

export type Framework = (typeof frameworks)[number];
