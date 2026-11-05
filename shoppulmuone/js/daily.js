/* 일일배달 상단 탭과 헤더 하위 메뉴를 해당 콘텐츠에 연결 */
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['juice', 'health', 'meal', 'subscription'];
  const sections = ids.map(id => document.getElementById(id));
  const intro = document.getElementById('daily');
  const links = document.querySelectorAll('.daily-tabs a, .daily-panel a');
  // 전체 탭: 카테고리별 제목 없이 모든 상품을 하나의 그리드에 나열
  if (intro) {
    const allGrid = document.createElement('div');
    allGrid.className = 'best-product-grid daily-product-grid';
    sections.filter(section => section && section.id !== 'subscription').forEach(section => {
      section.querySelectorAll('.best-product').forEach(card => allGrid.appendChild(card.cloneNode(true)));
    });
    // 전체 탭 전용 상품: 기존 베스트 카드 구조 및 스타일 재사용
    const dailyCard = document.createElement('article');
    dailyCard.className = 'best-product';
    dailyCard.innerHTML = `
      <div class="best-product-media">
        <img src="img/daily1.jpg" alt="채소습관 케일&셀러리 130ml" loading="lazy">
        <div class="best-product-actions">
          <button type="button" class="best-wish" aria-pressed="false" aria-label="채소습관 케일&셀러리 찜하기">
            <img class="best-wish-default" src="img/Heart_button.svg" alt="">
            <img class="best-wish-selected" src="img/Heart_button_active.svg" alt="">
          </button>
          <button type="button" class="best-cart" aria-label="채소습관 케일&셀러리 장바구니 담기">
            <img src="img/Cart_button.svg" alt="">
          </button>
        </div>
      </div>
      <div class="best-product-info">
        <p class="best-product-brand">풀무원녹즙</p>
        <h3>채소습관 케일&셀러리 (130ml)</h3>
        <p class="best-product-delivery">배송 예정일은 결제 시 확인</p>
        <p class="best-product-price"><strong>2,300원</strong></p>
      </div>`;
    allGrid.prepend(dailyCard);
    // 베스트 상품 4종을 일일배달 전체 목록에 추가 (기존 상품 카드 스타일 유지)
    const extraProducts = [
      { image: 'Best5.png', brand: '풀무원녹즙', name: '채소습관 양배추&브로콜리 (130ml)', price: '4,950원' },
      { image: 'Best1.png', brand: '풀무원', name: '채소습관 케일&사과 (130ml)', price: '4,950원' },
      { image: 'Best2.png', brand: '풀무원', name: '100% 당근즙 (130ml)', price: '4,950원' },
      { image: 'Best3.png', brand: '풀무원', name: '시그니처 밸런스 식단 (1일1식)', price: '8,280원' }
    ];
    extraProducts.forEach(product => {
      const card = document.createElement('article');
      card.className = 'best-product';
      card.innerHTML = `
        <div class="best-product-media">
          <img src="img/${product.image}" alt="${product.name}" loading="lazy">
          <div class="best-product-actions">
            <button type="button" class="best-wish" aria-pressed="false" aria-label="${product.name} 찜하기">
              <img class="best-wish-default" src="img/Heart_button.svg" alt="">
              <img class="best-wish-selected" src="img/Heart_button_active.svg" alt="">
            </button>
            <button type="button" class="best-cart" aria-label="${product.name} 장바구니 담기">
              <img src="img/Cart_button.svg" alt="">
            </button>
          </div>
        </div>
        <div class="best-product-info">
          <p class="best-product-brand">${product.brand}</p>
          <h3>${product.name}</h3>
          <p class="best-product-delivery">배송 예정일은 결제 시 확인</p>
          <p class="best-product-price"><span class="best-product-discount">10%</span><strong>${product.price}</strong></p>
        </div>`;
      allGrid.appendChild(card);
    });

    intro.querySelector('.benefit-placeholder')?.remove();
    intro.appendChild(allGrid);
  }
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
      section.hidden = all || section.id !== id;
      if (!section.hidden) {
        // 같은 탭을 다시 눌러도 애니메이션이 재생되도록 초기화합니다.
        void section.offsetWidth;
        section.classList.add('daily-enter');
      }
    });
    if (intro) intro.hidden = !all;
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
