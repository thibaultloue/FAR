/* À exécuter dans la console du navigateur ou via page.evaluate(),
   sur la page affichant les composants corrigés. Aucun service externe utilisé. */
(() => {
  const report = {};
  const frise = document.querySelector('[data-slide-id="deroule"]');
  if (frise) {
    const rects = [...frise.querySelectorAll('[data-frise-node]')]
      .map(el => el.getBoundingClientRect());
    const ys = rects.map(r => r.y + r.height / 2);
    report.deroule = {
      nodes: rects.length,
      horizontal: rects.length === 6 && Math.max(...ys) - Math.min(...ys) < 1,
      noPhotos: frise.querySelectorAll('img').length === 0,
      noInnerScroll: frise.scrollWidth <= frise.clientWidth + 1
    };
  }
  const roles = document.querySelector('[data-slide-id="accompagnement"]');
  if (roles) {
    const circles = [...roles.querySelectorAll('[data-role-circle]')]
      .map(el => el.getBoundingClientRect());
    report.roles = {
      roundAndEqual: circles.length === 2 && circles.every(r => Math.abs(r.width-r.height)<1)
        && Math.abs(circles[0].width-circles[1].width)<1
        && Math.abs(circles[0].top-circles[1].top)<1,
      sponsorCandidatePairs: roles.querySelectorAll('[data-sponsor-pair]').length,
      imagesLoaded: [...roles.querySelectorAll('img')].every(i => i.complete && i.naturalWidth>0)
    };
  }
  const next = document.querySelector('[data-slide-id="next-steps"]');
  if (next) {
    report.nextSteps = {
      bullets: next.querySelectorAll('ul > li').length,
      noExtraParagraph: next.querySelectorAll('p').length === 0,
      noImages: next.querySelectorAll('img').length === 0
    };
  }
  console.table(report);
  return report;
})();
