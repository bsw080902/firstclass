/* 일일배달 상단 탭과 헤더 하위 메뉴를 해당 콘텐츠에 연결 */
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['juice', 'health', 'meal', 'subscription'];
  const sections = ids.map(id => document.getElementById(id));
  const intro = document.getElementById('daily');
  const links = document.querySelectorAll('.daily-tabs a, .daily-panel a');
  function activate(id) {
    const valid = ids.includes(id);
    sections.forEach(section => { section.hidden = valid && section.id !== id; });
    if (intro) intro.hidden = valid;
    links.forEach(link => {
      const selected = valid && link.hash === '#' + id;
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
    if (!ids.includes(id)) return;
    event.preventDefault();
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    activate(id);
  }));
  window.addEventListener('hashchange', updateFromHash);
  updateFromHash();
});
