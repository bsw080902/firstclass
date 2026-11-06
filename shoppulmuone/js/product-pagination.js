/* Shared product-list pagination: category, best, daily and new. */
document.addEventListener('DOMContentLoaded', () => {
  const PAGE_SIZE = 5;
  const selector = '.category-product-grid, #best-products, .daily-product-grid, .new-list-grid';
  const states = new WeakMap();
  function init(grid) {
    if (states.has(grid)) return;
    const nav = document.createElement('nav');
    nav.className = 'product-page-nav';
    nav.setAttribute('aria-label', '상품 페이지 이동');
    nav.innerHTML = '<button type="button" class="product-page-arrow" data-step="-1" aria-label="이전 상품 페이지">‹</button><div class="product-page-numbers"></div><button type="button" class="product-page-arrow" data-step="1" aria-label="다음 상품 페이지">›</button>';
    grid.insertAdjacentElement('afterend', nav);
    const state = { page: 0, nav, count: -1, first: null };
    states.set(grid, state);
    nav.addEventListener('click', event => {
      const arrow = event.target.closest('[data-step]');
      const number = event.target.closest('[data-page]');
      if (arrow) go(grid, state.page + Number(arrow.dataset.step));
      if (number) go(grid, Number(number.dataset.page));
    });
    new MutationObserver(() => refresh(grid, true)).observe(grid, {childList:true});
    grid.addEventListener('product-filter-change', () => refresh(grid, true));
    refresh(grid, true);
  }
  function cards(grid) {
    return Array.from(grid.children).filter(el => el.matches('article, .new-list-card, .best-product') && !el.hidden);
  }
  function go(grid, target) {
    const state = states.get(grid);
    const total = Math.max(1, Math.ceil(cards(grid).length / PAGE_SIZE));
    state.page = Math.max(0, Math.min(total - 1, target));
    refresh(grid, false);
  }
  function refresh(grid, reset) {
    const state = states.get(grid);
    if (reset) state.nav.classList.remove('is-ready');
    const items = cards(grid);
    if (reset && (items.length !== state.count || items[0] !== state.first)) state.page = 0;
    state.count = items.length;
    state.first = items[0];
    const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages - 1);
    items.forEach((item, index) => {
      item.style.display = index >= state.page * PAGE_SIZE && index < (state.page + 1) * PAGE_SIZE ? '' : 'none';
    });
    state.nav.hidden = items.length === 0;
    if (items.length === 0) return;
    const numbers = state.nav.querySelector('.product-page-numbers');
    const start = Math.max(0, Math.min(state.page - 1, pages - 4));
    const end = Math.min(pages, start + 4);
    let marker = numbers.querySelector('.product-page-marker');
    if (!marker) {
      marker = document.createElement('span');
      marker.className = 'product-page-marker';
      marker.setAttribute('aria-hidden', 'true');
    }
    numbers.replaceChildren(marker);
    for (let i = start; i < end; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'product-page-number' + (i === state.page ? ' is-current' : '');
      btn.dataset.page = i;
      btn.textContent = String(i + 1);
      btn.setAttribute('aria-label', (i + 1) + '페이지');
      if (i === state.page) btn.setAttribute('aria-current', 'page');
      numbers.append(btn);
    }
    const active = numbers.querySelector('.is-current');
    if (active) {
      const trackStyle = getComputedStyle(numbers);
      const leftInset = parseFloat(trackStyle.paddingLeft) || 0;
      const rightInset = parseFloat(trackStyle.paddingRight) || 0;
      const markerX = Math.max(leftInset, Math.min(active.offsetLeft, numbers.clientWidth - marker.offsetWidth - rightInset));
      marker.style.left = markerX + 'px';
    }
    const prev = state.nav.querySelector('[data-step="-1"]');
    const next = state.nav.querySelector('[data-step="1"]');
    prev.disabled = state.page === 0;
    next.disabled = state.page === pages - 1;
    prev.classList.toggle('is-unavailable', prev.disabled);
    next.classList.toggle('is-unavailable', next.disabled);
    if (reset) requestAnimationFrame(() => requestAnimationFrame(() => state.nav.classList.add('is-ready')));
  }
  document.querySelectorAll(selector).forEach(init);
});
