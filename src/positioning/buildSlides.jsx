import "./positioning.css";
import { SLIDES } from "./data/slides.js";
import { SlideContents } from "./slides/SlideContents.jsx";
import { SourceFooter } from "./components/SourceFooter.jsx";

function PositioningFrame({ slide, slideIndex, children }) {
  const hideTitle =
    slide.variant === "intro" || slide.variant === "closing";
  return (
    <div className="positioning-slide -mx-2 flex min-h-0 w-full flex-1 flex-col sm:-mx-4">
      {!hideTitle && (
        <header className="mb-5 shrink-0 md:mb-6">
          <h2 className="font-display text-balance text-2xl font-bold leading-[1.08] tracking-tight text-far-white sm:text-3xl md:text-[2rem]">
            {slide.title}
          </h2>
        </header>
      )}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SourceFooter
        sources={slide.sources}
        internalNote={slide.internalNote}
        slideIndex={slideIndex}
        total={SLIDES.length}
      />
    </div>
  );
}

/** Slides positionnement FAR — format far-decks ({ title, r }). */
export const SFarPositionnement = SLIDES.map((slide, slideIndex) => ({
  title: slide.title,
  r: () => (
    <PositioningFrame slide={slide} slideIndex={slideIndex}>
      <SlideContents slide={slide} />
    </PositioningFrame>
  ),
}));
