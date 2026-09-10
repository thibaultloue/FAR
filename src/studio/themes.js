/** FAR Studio v1 — palettes sémantiques. L'accent change par projet, pas la grammaire. */
export const STUDIO_VERSION = "far-studio-v1";

export const THEMES = {
  ivory: {
    id: "ivory",
    label: "Ivoire",
    page: "#ece8e1",
    slide: "#f4f0e8",
    ink: "#1a1a1a",
    accent: "#ffaa00",
    logo: "black",
  },
  ink: {
    id: "ink",
    label: "Encre",
    page: "#0d0d0d",
    slide: "#141414",
    ink: "#f3eee6",
    accent: "#ffaa00",
    logo: "yellow",
  },
};

export function resolveTheme(name, overrides = {}) {
  const base = THEMES[name] || THEMES.ivory;
  return { ...base, ...overrides, id: overrides.id || base.id };
}
