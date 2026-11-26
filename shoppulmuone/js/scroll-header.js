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
 const render=()=>header.classList.toggle('is-compact',desktop()&&scrollCompact);
 // Hover expansion is handled directly by main.css; scroll only tracks compact state.
 window.addEventListener('scroll',()=>{
  const y=Math.max(0,window.scrollY),delta=y-previousY;
  previousY=y;
  if(!desktop()||y<=30){scrollCompact=false;traveled=0;render();return;}
  if(!delta)return;
  const nextDirection=Math.sign(delta);
  if(nextDirection!==direction){direction=nextDirection;traveled=0;}
  traveled+=Math.abs(delta);
  if(traveled>=12){
   scrollCompact=direction>0;
   render();
   traveled=0;
  }
 },{passive:true});
 window.addEventListener('resize',()=>{
  scrollCompact=false;render();syncSpacer();
  previousY=window.scrollY;traveled=0;
 });
 render();
})();
