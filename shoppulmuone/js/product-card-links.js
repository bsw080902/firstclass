/* 상품 카드의 이미지나 이름을 클릭하면 해당 상품 상세 페이지로 이동합니다. */
document.addEventListener('DOMContentLoaded', () => {
 const selector = '.best-product, .best-card, .recommend-card, .recommend-product, .new-card, .new-list-card, .brand-product, .daily-main-best-card, .new-product-card';
 const getText = (card, names) => {
  for (const name of names) {
   const el = card.querySelector(name);
   if (el && el.textContent.trim()) return el.textContent.trim();
  }
  return '';
 };
 document.addEventListener('click', event => {
  const card = event.target.closest(selector);
  if (!card || event.target.closest('button, a, input, select, textarea, .best-product-actions, .new-product-actions')) return;
  const name = getText(card,['.best-product-info h3','.best-info h3','.recommend-name','.new-product-info h4','.new-product-info h3','.new-list-info h3','h3','h4']);
  if (!name) return;
  const brand = getText(card,['.best-product-brand','.best-brand','.recommend-brand','.new-product-brand','.new-list-brand']);
  const priceEl = card.querySelector('.best-product-price, .best-price, .recommend-price, .new-product-price, .new-list-price, .best-card-price');
  const strong = priceEl?.querySelector('strong');
  const price = (strong?.textContent || priceEl?.textContent || '').match(/[\d,]+\s*원/)?.[0] || '';
  const discount = (priceEl?.textContent || '').match(/\d{1,2}%/)?.[0] || '';
  const original = card.querySelector('.original-price, .regular-price, .before-price, del, s')?.textContent?.trim() || '';
  const delivery = getText(card,['.best-product-delivery','.best-delivery','.recommend-delivery','.new-product-delivery','.new-list-delivery']);
  const imgEl = card.querySelector('.best-product-media > img, .best-image > img, .recommend-image > img, .brand-product-image > img, .new-product-image, .new-list-image img, .daily-main-best-image > img, img');
  const image = imgEl?.getAttribute('src')?.split('/').pop()?.split('?')[0] || '';
  const params = new URLSearchParams({name,brand,price,discount,original,delivery,image});
  window.location.href = 'product-detail.html?' + params.toString();
 });
 document.querySelectorAll(selector).forEach(card => {
   if (!card.querySelector('h3, h4')) return;
   card.style.cursor = 'pointer';
   card.tabIndex = card.tabIndex < 0 ? 0 : card.tabIndex;
   card.setAttribute('role','link');
   card.setAttribute('aria-label', (card.querySelector('.recommend-name, h3, h4')?.textContent || '상품') + ' 상세 보기');
 });
 document.addEventListener('keydown', event => {
   if (event.key !== 'Enter' && event.key !== ' ') return;
   const card = event.target.closest(selector);
   if (!card || event.target !== card) return;
   event.preventDefault();
   card.click();
 });
});