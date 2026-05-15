const lenis = new Lenis({
  lerp: window.TILDA_LENIS_CONFIG?.lerp || 0.1,
  smoothWheel: window.TILDA_LENIS_CONFIG?.smoothWheel ?? true,
  infinite: window.TILDA_LENIS_CONFIG?.infinite ?? false,

  prevent: (node) => {
    return (
      node.closest('.t-popup') ||
      node.closest('.t706__cartwin') ||
      node.closest('.t706__cartwin-content') ||
      node.closest('.t-menu__mobile') ||
      node.closest('iframe') ||
      node.closest('.uc-prevent')
    );
  }
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
