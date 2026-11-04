document.addEventListener('DOMContentLoaded',()=>{
 const tabs=[...document.querySelectorAll('[data-benefit-tab]')];
 const sections={promotion:document.querySelector('#promotion'),event:document.querySelector('#event')};
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 function selectTab(key,updateUrl=true){
  if(key!=='all'&&!sections[key])key='all';
  tabs.forEach(button=>{
   const active=button.dataset.benefitTab===key;
   button.classList.toggle('is-active',active);
   button.setAttribute('aria-pressed',String(active));
  });
  const visibleCards=[];
  Object.entries(sections).forEach(([name,section])=>{
   if(!section)return;
   section.hidden=key!=='all'&&name!==key;
   section.querySelectorAll('.benefit-card').forEach(card=>{
    card.getAnimations().forEach(animation=>animation.cancel());
    if(!section.hidden)visibleCards.push(card);
   });
  });
  visibleCards.forEach((card,index)=>{
   card.classList.add('is-revealed');
   card.style.setProperty('--benefit-card-index',index);
   if(!reduceMotion.matches){
    // CSS transition과 달리 이미 표시 중인 카드도 매번 처음부터 재생됩니다.
    card.animate([
     {opacity:0,transform:'translateY(18px)'},
     {opacity:1,transform:'translateY(0)'}
    ],{duration:400,delay:index*55,easing:'ease-out',fill:'backwards'});
   }
  });
  if(updateUrl)history.replaceState(null,'','#'+key);
 }
 tabs.forEach(button=>button.addEventListener('click',()=>selectTab(button.dataset.benefitTab)));
 window.addEventListener('hashchange',()=>selectTab(location.hash.slice(1),false));
 selectTab(location.hash.slice(1),false);
});
