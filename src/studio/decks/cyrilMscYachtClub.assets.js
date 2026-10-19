/**
 * CYRILmp4 × MSC Cruises · MSC Yacht Club.
 * Chiffres créateur : repris du deck PONANT (5,21 M / 8,5 M+ / 15 ans / 872 K), en anglais.
 * Offre : pages MSC Yacht Club consultées le 08/10/2026.
 * https://www.msccruises.com/int/our-cruises/msc-yacht-club
 */
const BASE = "/cyril-msc-yacht-club";

export const ASSETS = {
  logoMsc: {
    src: `${BASE}/logo-msc.png`,
    alt: "MSC Cruises",
    height: 44,
  },
  logoMscWhite: {
    src: `${BASE}/logo-msc-white.png`,
    alt: "MSC Cruises",
    height: 52,
    keepColor: true,
  },
  portrait: {
    src: "/garmin-cyril-photo.png",
    alt: "CYRILmp4",
    focus: "center 20%",
  },
  ship: {
    src: `${BASE}/msc-meraviglia.jpg`,
    alt: "MSC Meraviglia, a ship with MSC Yacht Club on board",
    focus: "68% 42%",
  },
  deck: {
    src: `${BASE}/msc-owner-deck.jpg`,
    alt: "Private deck of an MSC Yacht Club Owner's Suite, with whirlpool and sea view",
    focus: "64% 42%",
  },
};

export const OFFER = {
  name: "MSC Yacht Club",
  line: "MSC Cruises",
  page: {
    url: "https://www.msccruises.com/int/our-cruises/msc-yacht-club",
    consulted: "08/10/2026",
  },
  frame: "A private ship-within-a-ship: suites, 24/7 butler and concierge, private restaurant, lounge, pool and sundeck.",
};

export const CONTACT = {
  org: "FAR",
  name: "Thibault Loué",
  detail: "thibault.loue@far-agence.com",
  href: "mailto:thibault.loue@far-agence.com",
};
