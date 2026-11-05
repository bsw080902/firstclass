// 스크롤 방향에 따라 공통 헤더 표시/숨김
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let previousY = window.scrollY;
  let direction = 0;
  let distance = 0;
  const threshold = 8;
  window.addEventListener('scroll', () => {
    const currentY = Math.max(0, window.scrollY);
    const delta = currentY - previousY;
    previousY = currentY;
    if (currentY <= 10) {
      header.classList.remove('is-hidden');
      distance = 0;
      return;
    }
    if (!delta) return;
    const nextDirection = Math.sign(delta);
    if (nextDirection !== direction) { direction = nextDirection; distance = 0; }
    distance += Math.abs(delta);
    if (distance >= threshold) {
      header.classList.toggle('is-hidden', direction > 0);
      distance = 0;
    }
  }, { passive: true });
})();
