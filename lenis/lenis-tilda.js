const lenis = new Lenis({
  lerp: window.TILDA_LENIS_CONFIG?.lerp || 0.1,
  smoothWheel: window.TILDA_LENIS_CONFIG?.smoothWheel ?? true,
  infinite: window.TILDA_LENIS_CONFIG?.infinite ?? false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const preventSelectors =
  window.TILDA_LENIS_CONFIG?.preventSelectors || [];

document.addEventListener(
  'wheel',
  (e) => {
    for (const selector of preventSelectors) {
      if (e.target.closest(selector)) {
        return;
      }
    }
  },
  { passive: true }
);
