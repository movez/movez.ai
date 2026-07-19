export const frameworks = [
  "foursquare",
  "safari",
  "chrome",
  "eventbrite",
  "ticketmaster",
  "meetup",
  "tripadvisor",
  "notepad",
  "mobile",
  "desktop",
  "yelp",
] as const;

export type Framework = (typeof frameworks)[number];
