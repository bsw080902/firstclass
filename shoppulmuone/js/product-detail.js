document.addEventListener('DOMContentLoaded', () => {
 const q = new URLSearchParams(location.search);
 const name = (q.get('name') || '상품 정보를 확인해 주세요').slice(0,180);
 const brand = (q.get('brand') || '풀무원').slice(0,90);
 const price = (q.get('price') || '').slice(0,30);
 const discount = (q.get('discount') || '').slice(0,12);
 const rawDelivery = (q.get('delivery') || '').slice(0,130);
 const delivery = !rawDelivery || /배송\s*예정일은\s*결제\s*시\s*확인|배송\s*정보는\s*주문\s*시\s*확인/.test(rawDelivery) ? '지금 결제 시 10-22 (목) 도착' : rawDelivery;
 const isDaily = q.get('daily') === '1';
 // NEW 카드의 상단 조리/광고 사진은 상세 대표 이미지로 사용하지 않습니다.
 // 이전 링크 또는 브라우저 캐시가 광고 이미지 주소를 전달해도 실제 상품 패키지로 교정합니다.
 const newProductImages = { 'pulmuonead_1.png':'ad1.jpg','pulmuonead_11.png':'ad1.jpg','pulmuonead_2.png':'ad2.jpg','pulmuonead_22.png':'ad2.jpg','pulmuonead_3.png':'ad3.jpg','pulmuonead_33.png':'ad3.jpg' };
 const requestedImage = (q.get('image') || '').split('/').pop();
 const imageName = newProductImages[requestedImage] || requestedImage;
 const image = /^[a-zA-Z0-9_.%()-]+\.(png|jpg|jpeg|webp)$/i.test(imageName || '') ? 'img/' + imageName : '';
 const set = (id, value) => { document.getElementById(id).textContent = value; };
 set('detail-name', name);
 set('detail-brand', brand);
 const normalizeSummaryName = value => value.replace(/\s+/g,'').toLowerCase();
 const summaryRules = [
 [
  "특등급 국산콩 단단한 부침용 두부",
  "콩이 다른 두부"
 ],
 [
  "특등급 국산콩 무농약 콩나물",
  "국산콩으로 기른 무농약 콩나물"
 ],
 [
  "목초달걀 무항생제",
  "무항생제 1+등급 목초달걀, 넉넉한 15구"
 ],
 [
  "유정란으로 만든 구운계란",
  "동물복지인증 유정란으로 만든 간편한 간식"
 ],
 [
  "고농도 진한 다용도 두부",
  "진한 두부로 부침부터 찌개까지"
 ],
 [
  "Cage Free 동물복지 유정란",
  "케이지 프리 동물복지 유정란 20입"
 ],
 [
  "순두부찌개",
  "순두부와 찌개양념으로 간편하게 완성하는 한 끼"
 ],
 [
  "동물복지 목초란",
  "매일의 식탁에 더하는 동물복지 목초란"
 ],
 [
  "밀+쌀 떡볶이 2종",
  "떡볶이의 성지! 마포/선릉맛집 스타일"
 ],
 [
  "식감혁신 본격 떡볶이",
  "쌀떡볶이의 성지! 마포 맛집 스타일"
 ],
 [
  "생만두 새우청경채",
  "새우와 청경채의 조화를 담은 생만두"
 ],
 [
  "이슬만두 직화불고기맛",
  "직화불고기 풍미를 담은 지구식단 만두"
 ],
 [
  "노엣지피자 토마토&미트콤보",
  "토마토 소스와 3가지 고기 토핑"
 ],
 [
  "찰곤약 떡볶이떡",
  "먹어봐야 아는 쫀득탱글 찰곤약떡"
 ],
 [
  "참 물만두",
  "한입씩 간편하게 즐기는 물만두"
 ],
 [
  "이슬만두 김치애호박",
  "김치와 애호박을 담은 간편트레이 만두"
 ],
 [
  "채소습관 케일&사과",
  "케일과 사과를 함께 즐기는 채소 음료"
 ],
 [
  "채소습관 케일&셀러리",
  "케일과 셀러리를 담은 채소 음료"
 ],
 [
  "100% 당근즙",
  "당근 본연의 맛을 담은 100% 당근즙"
 ],
 [
  "시그니처 밸런스 식단",
  "하루 한 끼, 간편하게 챙기는 균형 잡힌 식단"
 ],
 [
  "특등급 국산콩 두부칩",
  "국산콩 두부로 즐기는 간편한 간식"
 ],
 [
  "채소습관 양배추&브로콜리",
  "양배추와 브로콜리를 한 병에"
 ],
 [
  "시원하냥 참치 헤어볼&유리너리",
  "반려묘를 위한 참치 간식"
 ],
 [
  "독도 자연산 꽃새우",
  "산지에서 만나는 독도 자연산 꽃새우"
 ],
 [
  "초사리 곱창돌김",
  "햇 초사리 곱창돌김으로 차리는 식탁"
 ],
 [
  "제주 유라감귤",
  "11Brix 당도선별 제주 유라감귤"
 ],
 [
  "로제비 오앤밸런스",
  "여성의 일상을 위한 3개월분 제품"
 ],
 [
  "로제빈 우먼밸런스",
  "여성의 일상을 위한 3개월분 제품"
 ],
 [
  "그릭 설탕무첨가 플레인",
  "설탕을 첨가하지 않은 플레인 그릭 요거트"
 ],
 [
  "순고구마칩",
  "고구마의 맛을 간편하게 즐기는 칩"
 ],
 [
  "순감자칩",
  "감자로 즐기는 간편한 간식"
 ],
 [
  "쌀 국물떡볶이",
  "국물과 쌀떡을 함께 즐기는 2인분 떡볶이"
 ],
 [
  "안심치즈돈카츠",
  "촉촉한 100% 국내산 안심"
 ],
 [
  "생만두 고기배추",
  "배추와 연근으로 아삭한 생만두"
 ],
 [
  "특등급 국산콩두유 서리태",
  "서리태를 담은 국산콩 두유"
 ]
];
 const normalizedName=normalizeSummaryName(name);
 const matchedSummary=summaryRules.find(([keyword])=>normalizedName.includes(normalizeSummaryName(keyword)))?.[1] || '';
 const summary = (q.get('summary') || matchedSummary).trim().slice(0,200);
 if(summary){const el=document.getElementById('detail-product-summary');el.textContent=summary;el.hidden=false;}
 set('detail-info-name', name);
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
 const originalEl = document.getElementById('detail-original-price');
 const percent = /^\d{1,2}%$/.test(discount) ? parseInt(discount,10) : 0;
 const suppliedOriginal = Number((q.get('original') || '').replace(/[^0-9]/g,''));
 const knownOriginal = imageName === 'fresh1.jpg' && priceNumber === 4990 ? 9200 : imageName === 'fresh5.jpg' && priceNumber === 1780 ? 2180 : 0;
 if(priceNumber > 0 && percent > 0 && percent < 100){
  const original = suppliedOriginal > priceNumber ? suppliedOriginal : knownOriginal || Math.round(priceNumber / (1 - percent / 100));
  if(original > priceNumber){
   originalEl.textContent = money(original);
   originalEl.hidden = false;
   if(!knownOriginal && !(suppliedOriginal > priceNumber)) originalEl.title = '할인율을 기준으로 역산한 정상가입니다.';
  }
 }
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
  const frequencyList = dailyOptions.querySelector('.detail-daily-frequency-list');
  const moveFrequencyHighlight = () => {
   const index = frequencyInputs.findIndex(input => input.checked);
   frequencyList.style.setProperty('--frequency-offset', (Math.max(0,index) * 100) + '%');
  };
  moveFrequencyHighlight();
  frequencyInputs.forEach(input => input.addEventListener('change', () => {
   moveFrequencyHighlight();
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
});