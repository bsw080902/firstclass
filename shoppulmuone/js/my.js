/* 마이페이지: 스크롤 대신 선택한 메뉴의 콘텐츠만 표시 */
document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.my-shortcuts [data-my-link]'));
  const panels = new Map(
    links.map(link => [link.dataset.myLink, document.getElementById(link.dataset.myLink)])
  );
  if (!links.length || [...panels.values()].some(panel => !panel)) return;

  const defaultMenu = 'orders';
  const getMenuFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const menu = params.get('menu');
    // 이전 #메뉴 주소로 들어오는 경우에도 화면 전환을 지원합니다.
    const legacy = window.location.hash.slice(1);
    return panels.has(menu) ? menu : panels.has(legacy) ? legacy : defaultMenu;
  };

  const activate = (menu, { updateUrl = false, focusTab = false } = {}) => {
    const selected = panels.has(menu) ? menu : defaultMenu;
    links.forEach(link => {
      const active = link.dataset.myLink === selected;
      link.classList.toggle('is-active', active);
      link.setAttribute('aria-selected', String(active));
      link.tabIndex = active ? 0 : -1;
      if (active) {
        link.setAttribute('aria-current', 'page');
        if (focusTab) link.focus({ preventScroll: true });
      } else {
        link.removeAttribute('aria-current');
      }
    });
    panels.forEach((panel, name) => {
      panel.hidden = name !== selected;
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('menu', selected);
      url.hash = '';
      window.history.pushState({ myMenu: selected }, '', url);
    }
  };

  links.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      activate(link.dataset.myLink, { updateUrl: true });
    });

    link.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % links.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + links.length) % links.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = links.length - 1;
      activate(links[next].dataset.myLink, { updateUrl: true, focusTab: true });
    });
  });

  window.addEventListener('popstate', () => activate(getMenuFromUrl()));
  window.addEventListener('hashchange', () => activate(getMenuFromUrl()));
  activate(getMenuFromUrl());
});
