/* 일일배달 상단 탭과 헤더 하위 메뉴를 해당 콘텐츠에 연결 */
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['juice', 'health', 'meal', 'subscription'];
  const sections = ids.map(id => document.getElementById(id));
  const intro = document.getElementById('daily');
  const links = document.querySelectorAll('.daily-tabs a, .daily-panel a');
  // 전체 탭은 기존 예시 상품 목록을 별도로 보존합니다.
  const originalAllCards = sections.filter(section => section && section.id !== 'subscription').flatMap(section => Array.from(section.querySelectorAll('.best-product'), card => card.cloneNode(true)));
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
  // 전체 탭: 카테고리별 제목 없이 모든 상품을 하나의 그리드에 나열
  if (intro) {
    const allGrid = document.createElement('div');
    allGrid.className = 'best-product-grid daily-product-grid';
    originalAllCards.forEach(card => allGrid.appendChild(card));
    // 기존 전체 탭의 첫 5개 상품과 순서를 유지
    const featuredAll = [...products.juice, ...products.meal];
    featuredAll.forEach((product, index) => {
      const card = productCard(product);
      allGrid.insertBefore(card, allGrid.children[index] || null);
    });
    intro.querySelector('.benefit-placeholder')?.remove();
    intro.appendChild(allGrid);
  }

  // 카드 크기는 유지하고 배송 선택 항목은 필요할 때만 펼칩니다.
  function addDeliveryOptions(card) {
    if (card.querySelector('.daily-delivery-details')) return;
    const name = card.querySelector('.best-product-info h3')?.textContent.trim() || '상품';
    const priceText = card.querySelector('.best-price strong, .best-product-price strong')?.textContent || '';
    const match = priceText.replace(/,/g, '').match(/(\d+)\s*원/);
    const unitPrice = match ? Number(match[1]) : 0;
    const details = document.createElement('details');
    details.className = 'daily-delivery-details';
    details.dataset.unitPrice = String(unitPrice);
    details.innerHTML = `
      <summary>배송 설정하기 <span aria-hidden="true">⌄</span></summary>
      <div class="daily-delivery-fields">
        <fieldset class="daily-delivery-frequency">
          <legend>배송주기</legend>
          <div class="daily-frequency-options">
            ${[3, 4, 5, 6].map(n => `<label><input type="radio" name="frequency-${card.dataset.dailyId}" value="${n}" ${n === 3 ? 'checked' : ''}><span>주${n}일</span></label>`).join('')}
          </div>
        </fieldset>
        <fieldset class="daily-delivery-weekdays">
          <legend>배송요일 <small>3일 선택</small></legend>
          <div class="daily-weekday-options">
            ${['월','화','수','목','금','토'].map((day, i) => `<label><input type="checkbox" value="${day}" ${[0,2,4].includes(i) ? 'checked' : ''}><span>${day}</span></label>`).join('')}
          </div>
        </fieldset>
        <label class="daily-period-label">배송기간
          <select class="daily-delivery-period">
            <option value="2">2주</option><option value="4" selected>4주</option>
            <option value="8">8주</option><option value="12">12주</option>
          </select>
        </label>
        <div class="daily-order-total"><span>예상 주문금액</span><strong aria-live="polite"></strong></div>
        <p class="daily-estimate-note">표시 가격을 1회 배송 가격으로 가정한 예시 금액입니다. 실제 결제 금액은 다를 수 있습니다.</p>
        <a class="daily-delivery-cta" href="login.html" aria-label="${name} 로그인 페이지로 이동">로그인 후 구매하기</a>
      </div>`;
    card.appendChild(details);
    updateDeliveryTotal(details);
  }

  function updateDeliveryTotal(details) {
    const selectedFrequency = Number(details.querySelector('input[type="radio"]:checked').value);
    const weekdays = [...details.querySelectorAll('.daily-weekday-options input:checked')];
    details.querySelector('.daily-delivery-weekdays small').textContent = `${weekdays.length}/${selectedFrequency}일 선택`;
    const total = details.querySelector('.daily-order-total strong');
    const price = Number(details.dataset.unitPrice);
    const weeks = Number(details.querySelector('.daily-delivery-period').value);
    total.textContent = price ? (price * selectedFrequency * weeks).toLocaleString('ko-KR') + '원' : '가격 확인 필요';
  }

  document.querySelectorAll('.daily-product-grid .best-product').forEach((card, index) => {
    card.dataset.dailyId = String(index);
    addDeliveryOptions(card);
  });

  document.querySelectorAll('.daily-product-grid').forEach(grid => {
    grid.addEventListener('change', event => {
      const details = event.target.closest('.daily-delivery-details');
      if (!details) return;
      if (event.target.matches('.daily-frequency-options input')) {
        const count = Number(event.target.value);
        const days = [...details.querySelectorAll('.daily-weekday-options input')];
        days.forEach((input, index) => { input.checked = index < count; });
      } else if (event.target.matches('.daily-weekday-options input')) {
        const count = Number(details.querySelector('.daily-frequency-options input:checked').value);
        const checked = [...details.querySelectorAll('.daily-weekday-options input:checked')];
        if (checked.length > count || checked.length < count) {
          // 요일은 배송주기와 같은 개수를 유지합니다.
          if (checked.length > count) {
            checked.find(input => input !== event.target).checked = false;
          } else if (!event.target.checked) {
            event.target.checked = true;
          }
        }
      }
      updateDeliveryTotal(details);
    });
  });

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
    if (intro) {
      intro.classList.remove('daily-enter');
      intro.hidden = !all;
      if (all) {
        // 전체 탭도 다른 카테고리와 같은 카드 등장 효과 적용
        void intro.offsetWidth;
        intro.classList.add('daily-enter');
      }
    }
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
