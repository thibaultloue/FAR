function shortUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SourceFooter({
  sources,
  internalNote,
  slideIndex,
  total,
}) {
  return (
    <footer
      className="mt-auto flex shrink-0 flex-col gap-1 border-t border-far-line pt-3 print:pt-2"
      aria-label="Sources"
    >
      <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.14em] text-far-muted print:text-[9px]">
        <span>
          {String(slideIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="hidden sm:inline">FAR by La Porte — confidentiel</span>
      </div>
      {sources.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-far-muted/90 print:text-[9px]">
          {sources.map((src) => (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-far-white hover:underline print:no-underline print:text-far-muted"
            >
              {shortUrl(src)}
            </a>
          ))}
        </div>
      )}
      {internalNote && (
        <p className="text-[9px] italic text-far-muted/70 print:text-[8px]">
          {internalNote}
        </p>
      )}
    </footer>
  );
}
