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

// Shared floating back-to-top control.
(() => {
 const button=document.createElement('button');button.type='button';button.className='site-scroll-top';button.setAttribute('aria-label','맨 위로 이동');button.tabIndex=-1;button.setAttribute('aria-hidden','true');button.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span>맨 위로</span>';document.body.append(button);
 const update=()=>{const visible=window.scrollY>Math.max(360,window.innerHeight*.65);button.classList.toggle('is-visible',visible);button.tabIndex=visible?0:-1;button.setAttribute('aria-hidden',String(!visible));const bar=document.querySelector('.mobile-tabbar');button.style.setProperty('--scroll-top-offset',(bar&&getComputedStyle(bar).display!=='none'?bar.getBoundingClientRect().height:0)+'px');};
 let queued=false;const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;update();});}};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);button.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));update();
})();
