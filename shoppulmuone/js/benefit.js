document.addEventListener('DOMContentLoaded',()=>{
 const tabs=[...document.querySelectorAll('[data-benefit-tab]')];
 const sections={promotion:document.querySelector('#promotion'),event:document.querySelector('#event')};
 function selectTab(key,updateUrl=true){
  if(key!=='all'&&!sections[key])key='all';
  tabs.forEach(button=>{const active=button.dataset.benefitTab===key;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
  const visibleCards=[];
  Object.entries(sections).forEach(([name,section])=>{
   if(!section)return;
   section.hidden=key!=='all'&&name!==key;
   section.querySelectorAll('.benefit-card').forEach(card=>{
    card.classList.remove('is-revealed');
    card.style.removeProperty('--benefit-card-index');
    if(!section.hidden)visibleCards.push(card);
   });
  });
  visibleCards.forEach((card,index)=>card.style.setProperty('--benefit-card-index',index));
  // 이미 화면에 보이던 카드도 시작 상태를 확정해 전환 효과를 다시 실행합니다.
  visibleCards.forEach(card=>{void card.offsetWidth;});
  requestAnimationFrame(()=>visibleCards.forEach(card=>card.classList.add('is-revealed')));
  if(updateUrl)history.replaceState(null,'','#'+key);
 }
 tabs.forEach(button=>button.addEventListener('click',()=>selectTab(button.dataset.benefitTab)));
 window.addEventListener('hashchange',()=>selectTab(location.hash.slice(1),false));
 selectTab(location.hash.slice(1),false);
});
