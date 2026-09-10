import { STUDIO_VERSION } from "./themes.js";

/**
 * Fabrique un deck Studio. Les slides gardent un `id` stable.
 * `layout` pointe vers une composition (cover, insight, concept, …).
 */
export function createStudioDeck({
  id,
  title,
  theme = "ivory",
  themeOverrides,
  slides,
  exportName,
}) {
  if (!id) throw new Error("createStudioDeck: `id` requis");
  if (!Array.isArray(slides) || !slides.length) throw new Error("createStudioDeck: au moins une slide");
  const seen = new Set();
  const normalized = slides.map((slide, i) => {
    const sid = slide.id || `slide-${i + 1}`;
    if (seen.has(sid)) throw new Error(`createStudioDeck: id de slide dupliqué (${sid})`);
    seen.add(sid);
    return { ...slide, id: sid };
  });
  return {
    engine: "studio",
    version: STUDIO_VERSION,
    id,
    title,
    theme,
    themeOverrides,
    exportName: exportName || title,
    slides: normalized,
  };
}
