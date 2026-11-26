// 화면에 헤더를 고정하고 PC에서 아래로 스크롤할 때 메뉴 줄만 숨김.
// 위로 스크롤하면 다시 표시합니다. 검색·로고·바로가기는 계속 보입니다.
(() => {
 const header=document.querySelector('.site-header');
 if(!header)return;
 header.classList.remove('is-hidden');
 const spacer=document.createElement('div');
 spacer.className='site-header-spacer';
 spacer.setAttribute('aria-hidden','true');
 header.before(spacer);
 const desktop=()=>window.matchMedia('(min-width:1025px)').matches;
 const syncSpacer=()=>{
  // 컴팩트 상태의 높이(76px)가 아닌 펼쳐진 원래 높이만 공간으로 확보
  if(!header.classList.contains('is-compact'))spacer.style.height=header.getBoundingClientRect().height+'px';
 };
 syncSpacer();
 let previousY=window.scrollY;
 let traveled=0;
 let direction=0;
 let scrollCompact=false;
 let hovering=false;
 const threshold=12;
 const setCompact=(value)=>{
  scrollCompact=value;
  header.classList.toggle('is-compact',desktop()&&value&&!hovering);
 };
 // 클릭이나 검색창 포커스가 아니라 마우스 호버로만 일시적으로 펼침.
 header.addEventListener('pointerenter',event=>{
  if(!desktop()||event.pointerType!=='mouse')return;
  hovering=true;
  header.classList.remove('is-compact');
 });
 header.addEventListener('pointerleave',event=>{
  if(event.pointerType!=='mouse')return;
  hovering=false;
  setCompact(scrollCompact);
 });
 const onScroll=()=>{
  if(!desktop()){
   setCompact(false);
   previousY=window.scrollY;
   return;
  }
  const y=Math.max(0,window.scrollY);
  const delta=y-previousY;
  previousY=y;
  if(y<=30){setCompact(false);traveled=0;return;}
  if(!delta)return;
  const nextDirection=Math.sign(delta);
  if(nextDirection!==direction){direction=nextDirection;traveled=0;}
  traveled+=Math.abs(delta);
  if(traveled>=threshold){
   // 헤더 내 메뉴를 사용하는 동안은 메뉴를 접지 않음
   if(direction<0)setCompact(false);
   else setCompact(true);
   traveled=0;
  }
 };
 window.addEventListener('scroll',onScroll,{passive:true});
 window.addEventListener('resize',()=>{
  hovering=false;
  setCompact(false);
  syncSpacer();
  previousY=window.scrollY;
  traveled=0;
 });
 if(desktop()&&window.scrollY>120)setCompact(true);
})();
