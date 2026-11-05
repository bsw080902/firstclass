/* 일일배달 상단 탭과 헤더 하위 메뉴를 해당 콘텐츠에 연결 */
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['juice', 'health', 'meal', 'subscription'];
  const sections = ids.map(id => document.getElementById(id));
  const intro = document.getElementById('daily');
  const links = document.querySelectorAll('.daily-tabs a, .daily-panel a');
  document.querySelectorAll('.daily-product-grid').forEach(grid => {
    grid.querySelectorAll('.best-product').forEach((card, index) => card.style.setProperty('--best-card-index', index));
  });
  function activate(id) {
    const valid = ids.includes(id);
    const all = !valid;
    sections.forEach(section => {
      section.classList.remove('daily-enter');
      if (!section) return;
      // '전체'는 상품 카테고리만 모아 보여주며 서비스 안내는 제외합니다.
      section.hidden = all ? section.id === 'subscription' : section.id !== id;
      if (!section.hidden) {
        // 같은 탭을 다시 눌러도 애니메이션이 재생되도록 초기화합니다.
        void section.offsetWidth;
        section.classList.add('daily-enter');
      }
    });
    if (intro) intro.hidden = true;
    links.forEach(link => {
      const selected = link.hash === '#' + (all ? 'all' : id);
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function updateFromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    activate(id);
  }
  links.forEach(link => link.addEventListener('click', event => {
    const id = link.hash.slice(1);
    if (id !== 'all' && !ids.includes(id)) return;
    event.preventDefault();
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    activate(id);
  }));
  document.querySelectorAll('.daily-product-grid').forEach(grid => {
    grid.addEventListener('click', event => {
      const wish = event.target.closest('.best-wish');
      if (wish) {
        const selected = wish.getAttribute('aria-pressed') !== 'true';
        wish.setAttribute('aria-pressed', String(selected));
        wish.classList.toggle('is-selected', selected);
      }
      // 장바구니는 실제 상품/장바구니 연동 전까지 동작을 연결하지 않습니다.
    });
  });
  window.addEventListener('hashchange', updateFromHash);
  updateFromHash();
});
