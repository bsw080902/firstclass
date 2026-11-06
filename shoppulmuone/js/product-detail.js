document.addEventListener('DOMContentLoaded', () => {
 const q = new URLSearchParams(location.search);
 const name = (q.get('name') || '상품 정보를 확인해 주세요').slice(0,180);
 const brand = (q.get('brand') || '풀무원').slice(0,90);
 const price = (q.get('price') || '').slice(0,30);
 const discount = (q.get('discount') || '').slice(0,12);
 const delivery = (q.get('delivery') || '').slice(0,130);
 const isDaily = q.get('daily') === '1';
 const imageName = (q.get('image') || '').split('/').pop();
 const image = /^[a-zA-Z0-9_.%()-]+\.(png|jpg|jpeg|webp)$/i.test(imageName || '') ? 'img/' + imageName : '';
 const set = (id, value) => { document.getElementById(id).textContent = value; };
 set('detail-name', name);
 set('detail-brand', brand);
 set('detail-info-name', name);
 set('crumb-product', name);
 document.title = name + ' | 샵풀무원';
 const imageEl = document.getElementById('detail-image');
 if (image) {
  imageEl.src = image;
  imageEl.alt = name;
  imageEl.hidden = false;
  imageEl.addEventListener('load', () => document.getElementById('detail-image-placeholder').hidden = true);
  imageEl.addEventListener('error', () => { imageEl.hidden = true; });
 }
 const discountEl = document.getElementById('detail-discount');
 if (/^\d{1,2}%$/.test(discount)) { discountEl.textContent = discount; discountEl.hidden = false; }
 const priceNumber = Number(price.replace(/[^0-9]/g, ''));
 const money = n => n.toLocaleString('ko-KR') + '원';
 set('detail-price', priceNumber ? money(priceNumber) : '가격 준비 중');
 const deliveryEl = document.getElementById('detail-delivery');
 if (delivery) {
  deliveryEl.textContent = '';
  const match = delivery.match(/^(.*?)(\d{1,2}-\d{1,2}\s*\([^)]+\))(.*)$/);
  if (match) {
    deliveryEl.append(document.createTextNode(match[1]));
    const strong = document.createElement('strong');
    strong.textContent = match[2];
    deliveryEl.append(strong,document.createTextNode(match[3]));
  } else deliveryEl.textContent = delivery;
 }
 // 일일배달 상품에서 진입한 경우에만 배송 선택 UI를 표시합니다.
 const dailyOptions = document.getElementById('detail-daily-options');
 if (isDaily && dailyOptions) {
  dailyOptions.hidden = false;
  const frequencyInputs = [...dailyOptions.querySelectorAll('input[name="daily-frequency"]')];
  const dayInputs = [...dailyOptions.querySelectorAll('.detail-daily-weekday-list input')];
  const count = document.getElementById('daily-weekday-count');
  const selectedFrequency = () => Number(dailyOptions.querySelector('input[name="daily-frequency"]:checked').value);
  const updateDayCount = () => {
   count.textContent = dayInputs.filter(input => input.checked).length + '/' + selectedFrequency() + '일 선택';
  };
  frequencyInputs.forEach(input => input.addEventListener('change', () => {
   const number = selectedFrequency();
   dayInputs.forEach((day, index) => { day.checked = index < number; });
   updateDayCount();
  }));
  dayInputs.forEach(day => day.addEventListener('change', () => {
   const countSelected = dayInputs.filter(input => input.checked);
   const number = selectedFrequency();
   if (countSelected.length > number) {
    // 새 요일을 선택하면 기존 선택 중 하나를 해제합니다.
    const previous = countSelected.find(input => input !== day);
    if (previous) previous.checked = false;
   } else if (countSelected.length < number) {
    day.checked = true;
   }
   updateDayCount();
  }));
  updateDayCount();
 }
 let quantity = 1;
 const quantityInput = document.getElementById('detail-quantity');
 const status = document.getElementById('detail-status');
 const update = () => {
  quantityInput.value = String(quantity);
  set('detail-total', priceNumber > 0 ? money(priceNumber * quantity) : '가격 준비 중');
 };
 const commitQuantity = () => {
  const raw = quantityInput.value.trim();
  const entered = Number(raw);
  quantity = raw !== '' && Number.isFinite(entered) ? Math.min(99, Math.max(1, Math.trunc(entered))) : 1;
  update();
 };
 quantityInput.addEventListener('input', () => {
  const raw = quantityInput.value.trim();
  const entered = Number(raw);
  if (raw !== '' && /^\d+$/.test(raw) && entered >= 1 && entered <= 99) {
   quantity = entered;
   set('detail-total', priceNumber > 0 ? money(priceNumber * quantity) : '가격 준비 중');
  }
 });
 quantityInput.addEventListener('change', commitQuantity);
 quantityInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') { commitQuantity(); quantityInput.blur(); }
 });
 quantityInput.addEventListener('blur', commitQuantity);
 document.getElementById('qty-minus').addEventListener('click', () => { commitQuantity(); quantity = Math.max(1,quantity-1); update(); });
 document.getElementById('qty-plus').addEventListener('click', () => { commitQuantity(); quantity = Math.min(99,quantity+1); update(); });
 document.getElementById('detail-wish').addEventListener('click', event => {
  const button = event.currentTarget;
  const active = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', active ? '찜 해제하기' : '찜하기');
  status.textContent = '';
 });
 document.getElementById('detail-cart').addEventListener('click',() => { status.textContent = '장바구니 기능은 현재 디자인 데모입니다. 실제 상품 저장은 연결되어 있지 않아요.'; });
 document.getElementById('detail-buy').addEventListener('click',() => { status.textContent = '실제 결제 기능은 연결되어 있지 않습니다.'; });
 update();

 // 상세 탭: 페이지 스크롤 없이 패널만 전환
 const tabBar = document.querySelector('.detail-tabs');
 const tabs = Array.from(tabBar.querySelectorAll('[role="tab"]'));
 const underline = tabBar.querySelector('.detail-tab-indicator');
 function positionUnderline(tab) {
  underline.style.width = tab.offsetWidth + 'px';
  underline.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
 }
 function activateTab(tab, moveFocus = false) {
  tabs.forEach(button => {
   const isActive = button === tab;
   button.setAttribute('aria-selected', String(isActive));
   button.tabIndex = isActive ? 0 : -1;
   const panel = document.getElementById(button.getAttribute('aria-controls'));
   panel.hidden = !isActive;
   panel.classList.remove('is-entering');
   if (isActive) {
    void panel.offsetWidth;
    panel.classList.add('is-entering');
   }
  });
  positionUnderline(tab);
  if (moveFocus) tab.focus();
 }
 tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
   if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
   event.preventDefault();
   let target = index;
   if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
   if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
   if (event.key === 'Home') target = 0;
   if (event.key === 'End') target = tabs.length - 1;
   activateTab(tabs[target], true);
  });
 });
 // 웹 폰트 로딩과 반응형 화면 크기 변화에도 밑줄 정렬 유지
 requestAnimationFrame(() => positionUnderline(tabs[0]));
 window.addEventListener('resize', () => {
  positionUnderline(tabBar.querySelector('[aria-selected="true"]'));
 });
 if (document.fonts?.ready) {
  document.fonts.ready.then(() => positionUnderline(tabBar.querySelector('[aria-selected="true"]')));
 }
});