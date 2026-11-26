/* 일일배달 상단 탭과 헤더 하위 메뉴를 해당 콘텐츠에 연결 */
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['juice', 'health', 'meal', 'subscription'];
  const sections = ids.map(id => document.getElementById(id));
  const intro = document.getElementById('daily');
  const links = document.querySelectorAll('.daily-tabs a, .daily-panel a');
  // 카테고리별 실제 상품 카드: 전체 탭도 동일한 카드를 복제해 사용
  const products = {
    juice: [
      { image:'daily1.jpg', brand:'풀무원녹즙', name:'채소습관 케일&셀러리 (130ml)', price:'2,300원', discount:'', delivery:false },
      { image:'Best5.png', brand:'풀무원녹즙', name:'채소습관 양배추&브로콜리 (130ml)', price:'4,950원', discount:'10%' },
      { image:'Best1.png', brand:'풀무원', name:'채소습관 케일&사과 (130ml)', price:'4,950원', discount:'10%' },
      { image:'Best2.png', brand:'풀무원', name:'100% 당근즙 (130ml)', price:'4,950원', discount:'10%' }
    ],
    meal: [
      { image:'Best3.png', brand:'풀무원', name:'시그니처 밸런스 식단 (1일1식)', price:'8,280원', discount:'10%' }
    ]
  };
  function productCard(product) {
    const card = document.createElement('article');
    card.className = 'best-product daily-main-best-card';
    card.innerHTML = `
      <div class="best-product-media daily-main-best-image">
        <img src="img/${product.image}" alt="${product.name}" loading="lazy">
        <div class="best-product-actions daily-main-best-actions">
          <button type="button" class="best-wish" aria-pressed="false" aria-label="${product.name} 찜하기">
            <img class="best-wish-default" src="img/Heart_button.svg" alt="">
            <img class="best-wish-selected" src="img/Heart_button_active.svg" alt="">
          </button>
          <button type="button" class="best-cart" aria-label="${product.name} 장바구니 담기">
            <img src="img/Cart_button.svg" alt="">
          </button>
        </div>
      </div>
      <div class="best-product-info daily-main-best-info">
        <p class="best-product-brand">${product.brand}</p>
        <h3>${product.name}</h3>
        <p class="best-product-delivery">${product.delivery === false ? '배송 예정일은 결제 시 확인' : '지금 결제 시 <strong>10-22 (목)</strong> 도착'}</p>
        <p class="best-price">${product.discount ? '<span>'+product.discount+'</span> ' : ''}<strong>${product.price}</strong></p>
      </div>`;
    return card;
  }
  Object.entries(products).forEach(([id, items]) => {
    const grid = document.querySelector('#' + id + ' .daily-product-grid');
    if (grid) grid.replaceChildren(...items.map(productCard));
  });
  // 전체 탭: 실제 등록된 대표 상품 다섯 개만 표시
  if (intro) {
    const allGrid = document.createElement('div');
    allGrid.className = 'best-product-grid daily-product-grid';
    [...products.juice, ...products.meal].forEach(product => allGrid.appendChild(productCard(product)));
    intro.querySelector('.benefit-placeholder')?.remove();
    intro.appendChild(allGrid);
  }
  document.querySelectorAll('.daily-product-grid').forEach(grid => {
    grid.querySelectorAll('.best-product').forEach((card, index) => card.style.setProperty('--best-card-index', index));
  });
  const countBar = document.getElementById('daily-results-bar');
  const countText = document.getElementById('daily-results-count');
  function updateProductCount(id, all) {
    const activeGrid = all ? intro?.querySelector('.daily-product-grid') : document.getElementById(id)?.querySelector('.daily-product-grid');
    const count = activeGrid ? activeGrid.querySelectorAll('.best-product:not([hidden])').length : 0;
    if (countBar) countBar.hidden = id === 'subscription';
    if (countText) countText.textContent = count + '개의';
  }
  function activate(id) {
    const valid = ids.includes(id);
    const all = !valid;
    sections.forEach(section => {
      section.classList.remove('daily-enter');
      if (!section) return;
      // '전체'는 상품 카테고리만 모아 보여주며 서비스 안내는 제외합니다.
      section.hidden = all || section.id !== id;
      if (!section.hidden) {
        // 같은 탭을 다시 눌러도 애니메이션이 재생되도록 초기화합니다.
        void section.offsetWidth;
        section.classList.add('daily-enter');
      }
    });
    if (intro) {
      intro.classList.remove('daily-enter');
      intro.hidden = !all;
      if (all) {
        // 전체 탭도 다른 카테고리와 같은 카드 등장 효과 적용
        void intro.offsetWidth;
        intro.classList.add('daily-enter');
      }
    }
    updateProductCount(id, all);
    links.forEach(link => {
      const selected = (new URL(link.href, location.href).searchParams.get('menu') || link.hash.slice(1)) === (all ? 'all' : id);
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function updateFromHash() {
    const url = new URL(location.href);
    const id = url.searchParams.get('menu') || url.hash.slice(1);
    if(ids.includes(id) || id === 'all'){
      url.searchParams.set('menu',id);url.hash='';history.replaceState(null,'',url);
    }
    activate(id);
  }
  links.forEach(link => link.addEventListener('click', event => {
    const id = new URL(link.href, location.href).searchParams.get('menu') || link.hash.slice(1);
    if (id !== 'all' && !ids.includes(id)) return;
    event.preventDefault();
    const url = new URL(location.href); url.searchParams.set('menu', id); url.hash = ''; history.replaceState(null, '', url);
    const previousY = window.scrollY;
    activate(id);
    if(link.closest('.daily-panel')){
      link.blur();
      window.scrollTo({top:0,behavior:'instant'});
      requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));
    }else{
      window.scrollTo({top:previousY,behavior:'instant'});
    }
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
  if(new URLSearchParams(location.search).has('menu')){
    const reset=()=>window.scrollTo({top:0,behavior:'instant'});
    reset();requestAnimationFrame(reset);
    if(document.readyState!=='complete')window.addEventListener('load',reset,{once:true});
  }
});
