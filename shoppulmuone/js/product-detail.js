document.addEventListener('DOMContentLoaded', () => {
 const q = new URLSearchParams(location.search);
 const name = (q.get('name') || '상품 정보를 확인해 주세요').slice(0,180);
 const brand = (q.get('brand') || '풀무원').slice(0,90);
 const price = (q.get('price') || '').slice(0,30);
 const discount = (q.get('discount') || '').slice(0,12);
 const delivery = (q.get('delivery') || '').slice(0,130);
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
 let quantity = 1;
 const status = document.getElementById('detail-status');
 const update = () => {
  set('detail-quantity', String(quantity));
 };
 document.getElementById('qty-minus').addEventListener('click', () => { quantity = Math.max(1,quantity-1); update(); });
 document.getElementById('qty-plus').addEventListener('click', () => { quantity = Math.min(99,quantity+1); update(); });
 document.getElementById('detail-wish').addEventListener('click', event => {
  const button = event.currentTarget;
  const active = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(active));
  button.textContent = active ? '♥' : '♡';
  status.textContent = active ? '찜한 상품으로 표시했어요. (화면 데모)' : '찜을 해제했어요.';
 });
 document.getElementById('detail-cart').addEventListener('click',() => { status.textContent = '장바구니 기능은 현재 디자인 데모입니다. 실제 상품 저장은 연결되어 있지 않아요.'; });
 document.getElementById('detail-buy').addEventListener('click',() => { status.textContent = '실제 결제 기능은 연결되어 있지 않습니다.'; });
 update();
});