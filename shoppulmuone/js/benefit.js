document.addEventListener('DOMContentLoaded',()=>{
 const tabs=[...document.querySelectorAll('[data-benefit-tab]')];
 const sections={promotion:document.querySelector('#promotion'),event:document.querySelector('#event')};
 function selectTab(key,updateUrl=true){
  if(key!=='all'&&!sections[key])key='all';
  tabs.forEach(button=>{const active=button.dataset.benefitTab===key;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
  Object.entries(sections).forEach(([name,section])=>{section.hidden=key!=='all'&&name!==key;if(!section.hidden){section.classList.remove('is-revealed');requestAnimationFrame(()=>requestAnimationFrame(()=>section.classList.add('is-revealed')))}});
  if(updateUrl)history.replaceState(null,'','#'+key);
 }
 tabs.forEach(button=>button.addEventListener('click',()=>selectTab(button.dataset.benefitTab)));
 window.addEventListener('hashchange',()=>selectTab(location.hash.slice(1),false));
 selectTab(location.hash.slice(1),false);
});
