/* 기존 상품 카드 찜 동작에 CSS 전환용 선택 이미지만 추가합니다. */
document.addEventListener('DOMContentLoaded', () => {
  function prepare(button) {
    if (button.querySelector('.wish-active-overlay')) return;
    const base = button.querySelector(':scope > img');
    if (!base) return;
    const overlay = document.createElement('img');
    overlay.src = 'img/Heart_button_active.svg';
    overlay.alt = '';
    overlay.className = 'wish-active-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    button.append(overlay);
  }
  document.querySelectorAll('.recommend-wish').forEach(prepare);
  // 이후 동적으로 생성된 카드도 클릭 전까지 준비
  document.addEventListener('pointerover', event => {
    const button = event.target.closest('.recommend-wish');
    if (button) prepare(button);
  }, true);
  document.addEventListener('focusin', event => {
    const button = event.target.closest('.recommend-wish');
    if (button) prepare(button);
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.recommend-wish');
    if (button) prepare(button);
  }, true);
});
