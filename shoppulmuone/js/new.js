document.addEventListener('DOMContentLoaded',()=>{
const panel=document.querySelector('#category-panel'),trigger=document.querySelector('.category-link'),mobile=document.querySelector('.mobile-category');
function close(){panel.classList.remove('is-open');trigger.classList.remove('is-active');trigger.setAttribute('aria-expanded','false');mobile.setAttribute('aria-expanded','false');document.body.classList.remove('mobile-category-open');}
function toggle(){const open=!panel.classList.contains('is-open');if(open){panel.classList.add('is-open');trigger.classList.add('is-active');trigger.setAttribute('aria-expanded','true');mobile.setAttribute('aria-expanded','true');document.body.classList.add('mobile-category-open');}else close();}
function place(){if(matchMedia('(max-width:767px)').matches){if(panel.parentElement!==document.body)document.body.appendChild(panel);}else if(panel.parentElement===document.body)document.querySelector('.header-nav').insertBefore(panel,document.querySelector('.best-link'));}
place();window.addEventListener('resize',()=>{close();place();});
trigger.addEventListener('click',e=>{e.preventDefault();toggle();});
mobile.addEventListener('click',e=>{e.stopPropagation();toggle();});
document.addEventListener('click',e=>{if(panel.classList.contains('is-open')&&!panel.contains(e.target)&&!trigger.contains(e.target))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus();}});
const menuData=[['두부 · 콩나물 · 달걀','과일 · 채소 · 쌀','정육 · 수산'],['만두 · 피자 · 떡볶이','면요리','반찬 · 김치'],['양념 · 소스 · 오일','과자 · 견과 · 베이커리','생수 · 음료 · 유제품','건강식품'],['반려동물','생활 · 주방 · 뷰티용품','가전제품']];
document.querySelectorAll('.category-item').forEach((btn,i)=>btn.addEventListener('click',()=>{document.querySelectorAll('.category-item').forEach(x=>{x.classList.remove('is-selected');x.setAttribute('aria-pressed','false');});btn.classList.add('is-selected');btn.setAttribute('aria-pressed','true');const box=document.querySelector('.category-panel-right');box.replaceChildren(...menuData[i].map(label=>{const a=document.createElement('a');a.href='#';a.textContent=label;return a;}));}));
document.querySelector('.mobile-search').addEventListener('click',()=>{const search=document.querySelector('.header-search');search.classList.toggle('mobile-search-open');const active=search.classList.contains('mobile-search-open');const mobileSearchButton=document.querySelector('.mobile-search');mobileSearchButton.querySelector('img').src=active?'img/Search_icon_mobile_active.svg':'img/Search_icon_mobile.svg';mobileSearchButton.setAttribute('aria-expanded',String(active));if(search.classList.contains('mobile-search-open'))search.querySelector('input').focus();});
document.querySelector('.header-search').addEventListener('submit',e=>e.preventDefault());

if(typeof Swiper!=='undefined')new Swiper('.new-swiper',{slidesPerView:'auto',spaceBetween:20,watchOverflow:true,grabCursor:true,pagination:{el:'.new-pagination',clickable:true},navigation:{nextEl:'.new-next',prevEl:'.new-prev'},breakpoints:{768:{spaceBetween:24},1200:{spaceBetween:46}}});
document.querySelectorAll('.new-page .recommend-wish').forEach(btn=>btn.addEventListener('click',()=>{const active=btn.getAttribute('aria-pressed')!=='true';btn.setAttribute('aria-pressed',String(active));}));
});