// PC: 스크롤로 헤더를 접고, 마우스를 올리면 일시적으로 펼칩니다.
(() => {
 const header=document.querySelector('.site-header');
 if(!header)return;
 header.classList.remove('is-hidden','is-compact');
 const spacer=document.createElement('div');
 spacer.className='site-header-spacer';
 spacer.setAttribute('aria-hidden','true');
 header.before(spacer);
 const desktop=()=>window.matchMedia('(min-width:1025px)').matches;
 const syncSpacer=()=>{if(!header.classList.contains('is-compact'))spacer.style.height=header.getBoundingClientRect().height+'px';};
 syncSpacer();
 let previousY=window.scrollY, traveled=0, direction=0;
 let scrollCompact=desktop()&&window.scrollY>120;
 let hovering=false;
 const render=()=>header.classList.toggle('is-compact',desktop()&&scrollCompact&&!hovering);
 // pointerenter뿐 아니라 실제 마우스 이동도 감지: 스크롤 후 커서가 이미 헤더 안에 있는 경우 대응.
 const hoverIn=()=>{if(!desktop())return;hovering=true;render();};
 const hoverOut=()=>{hovering=false;render();};
 header.addEventListener('mouseenter',hoverIn);
 header.addEventListener('mousemove',hoverIn);
 header.addEventListener('mouseleave',hoverOut);
 window.addEventListener('scroll',()=>{
  const y=Math.max(0,window.scrollY),delta=y-previousY;
  previousY=y;
  if(!desktop()||y<=30){scrollCompact=false;hovering=false;traveled=0;render();return;}
  if(!delta)return;
  const nextDirection=Math.sign(delta);
  if(nextDirection!==direction){direction=nextDirection;traveled=0;}
  traveled+=Math.abs(delta);
  if(traveled>=12){
   scrollCompact=direction>0;
   // 스크롤 입력은 우선 처리. 다음 마우스 움직임에서 다시 펼칩니다.
   hovering=false;
   render();
   traveled=0;
  }
 },{passive:true});
 window.addEventListener('resize',()=>{
  hovering=false;scrollCompact=false;render();syncSpacer();
  previousY=window.scrollY;traveled=0;
 });
 render();
})();
