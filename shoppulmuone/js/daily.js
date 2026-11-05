/* 일일배달 상단 탭과 헤더 하위 메뉴를 해당 콘텐츠에 연결 */
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['juice', 'health', 'meal', 'subscription'];
  const sections = ids.map(id => document.getElementById(id));
  const intro = document.getElementById('daily');
  const links = document.querySelectorAll('.daily-tabs a, .daily-panel a');
  function activate(id) {
    const valid = ids.includes(id);
    const all = !valid;
    sections.forEach(section => {
      if (!section) return;
      // '전체'는 상품 카테고리만 모아 보여주며 서비스 안내는 제외합니다.
      section.hidden = all ? section.id === 'subscription' : section.id !== id;
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
  window.addEventListener('hashchange', updateFromHash);
  updateFromHash();
});
