import { createStudioDeck } from "../createStudioDeck.js";
import { ASSETS, CONTACT } from "./cyrilMscYachtClub.assets.js";

const SURFACE = {
  bg: "#0B2245",
  color: "#F4F1EA",
  veil: "linear-gradient(90deg, rgba(11,34,69,.94) 0%, rgba(11,34,69,.72) 38%, rgba(11,34,69,.28) 62%, rgba(11,34,69,.18) 100%)",
};

export function buildCyrilMscYachtClubDeck() {
  return createStudioDeck({
    id: "cyril-mp4-msc-yacht-club",
    title: "CYRILmp4 × MSC Cruises",
    exportName: "CYRILmp4_x_MSC_Cruises_Yacht_Club",
    theme: "ivory",
    themeOverrides: {
      accent: "#C6A15A",
    },
    readerChrome: "auto",
    slides: [
      {
        id: "cover",
        layout: "campaignCover",
        theme: "ink",
        brand: "msc",
        kicker: "CYRILMP4 × MSC CRUISES",
        title: "I spent 48h\nin a luxury yacht club.",
        context: "He goes through it, detail by detail.",
        contextSize: 24.2,
        photo: ASSETS.ship,
        logos: [ASSETS.logoMscWhite],
        surface: SURFACE,
      },
      {
        id: "creator",
        layout: "creatorScale",
        brand: "msc",
        kicker: "The creator",
        title: "CYRILmp4, built for long immersion.",
        body: "On MP4, Cyril stays for 48h and goes through a place in detail.\nMSC Yacht Club is the stay: a private club on a cruise ship.",
        photo: ASSETS.portrait,
        metrics: [
          { group: "power", value: "5.21M", label: "YouTube subscribers (MP4)" },
          { group: "power", value: "8.5M+", label: "total audience" },
          { group: "audience", value: "15 yrs", label: "as a creator" },
          { group: "audience", value: "872K", label: "average views" },
        ],
        insight: "Signature formats. “24 hours on the world’s most dangerous train.” “100 hours in a radioactive lake.”",
        conclusion: "Territory. Long stays, told in detail.",
      },
      {
        id: "concept",
        layout: "gameBoard",
        brand: "msc",
        kicker: "I spent 48h\nin a luxury yacht club.",
        rule: "Inside MSC Yacht Club. Cyril goes through it in detail, then says what he felt.",
        photo: ASSETS.deck,
        beats: [
          {
            id: "suite",
            n: "01",
            title: "The suite",
            body: "The room he lives in. Space, light, the sea from the private deck.",
          },
          {
            id: "service",
            n: "02",
            title: "The service",
            body: "24/7 butler and concierge. The private restaurant, meal after meal.",
          },
          {
            id: "club",
            n: "03",
            title: "The club",
            body: "Pool, sundeck, and the quiet of the ship-within-a-ship.",
          },
          {
            id: "take",
            n: "04",
            title: "What he felt",
            body: "After 48h, Cyril says what the stay was actually like.",
          },
        ],
      },
      {
        id: "format",
        layout: "videoFormat",
        brand: "msc",
        kicker: "Recommended format",
        title: "A hero YouTube film, plus social cuts",
        hero: {
          label: "Hero film",
          lines: [
            "15–25 minutes.",
            "Title: I spent 48h in a luxury yacht club.",
            "Suite, service, restaurant, pool and sundeck, in detail.",
            "Close on what Cyril felt.",
          ],
        },
        moments: {
          label: "Brand moments",
          lines: [
            "The suite he actually lives in.",
            "24/7 butler, private restaurant, pool and sundeck.",
            "MSC Yacht Club as a ship-within-a-ship, shown for real.",
          ],
        },
        social: {
          label: "Social cuts",
          lines: [
            "Short cuts for Reels and Shorts:",
            "a detail from the suite",
            "a moment of service",
            "the private pool, sunrise on deck",
          ],
        },
        options: {
          label: "Options",
          lines: ["Extra social cuts as needed: formats, lengths, platforms."],
        },
      },
      {
        id: "integration",
        layout: "deviceArch",
        brand: "msc",
        kicker: "Brand integration",
        title: "MSC Cruises plays a real role, not a placement.",
        objectiveLabel: "Objective",
        cards: [
          {
            title: "Editorial role",
            body: "MSC Yacht Club is the place. Cyril lives there for 48h.",
          },
          {
            title: "Experience role",
            body: "Private restaurant, suites, butler service and the private pool become the scenes.",
          },
          {
            title: "Conversation role",
            body: "The community reacts in the comments and keeps the discussion going.",
          },
        ],
        benefit: "Show a younger audience what MSC Yacht Club feels like, detail by detail.",
      },
      {
        id: "benefits",
        layout: "brandBenefits",
        brand: "msc",
        kicker: "Benefits",
        title: "Why this idea matters for MSC Cruises",
        lead: "A simple film. Cyril spends 48h inside MSC Yacht Club and goes through it in detail.",
        items: [
          "A clear idea: I spent 48h in a luxury yacht club.",
          "A premium, positive territory, faithful to MSC Yacht Club.",
          "Suite, butler, restaurant, pool and sundeck, shown for real.",
          "A natural bridge from awareness to desire and consideration.",
        ],
      },
      {
        id: "close",
        layout: "closeTimeline",
        brand: "msc",
        kicker: "Timeline",
        title: "Next steps",
        steps: [
          { when: "Framing call", bullets: ["With MSC Cruises."] },
          { when: "Destination", bullets: ["Choose a destination."] },
          { when: "Date & production", bullets: ["Confirm a date, then go into production."] },
        ],
        org: CONTACT.org,
        contactName: CONTACT.name,
        contactDetail: CONTACT.detail,
        contactHref: CONTACT.href,
      },
    ],
  });
}

export const cyrilMscYachtClubDeck = buildCyrilMscYachtClubDeck();
