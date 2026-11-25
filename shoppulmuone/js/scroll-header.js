// 헤더 자동 숨김 비활성화: 모든 페이지에서 스크롤 중에도 헤더를 표시합니다.
(() => {
 const header=document.querySelector('.site-header');
 if(!header)return;
 header.classList.remove('is-hidden');
})();
