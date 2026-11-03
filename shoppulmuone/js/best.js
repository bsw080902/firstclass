/* 베스트 전용: 메인페이지 JS에 의존하지 않도록 독립적으로 초기화 */
document.addEventListener('DOMContentLoaded',()=>{
const groups={
fresh:{label:'신선식품',items:['국산 콩두부','아삭한 콩나물','신선한 채소 모음','무항생제 달걀','유기농 샐러드 채소','신선 과일 세트','제철 버섯 모음','친환경 쌀']},
meal:{label:'간편식 · 반찬',items:['담백한 만두','한끼 볶음밥','정성 담은 김치','간편 국물요리','고소한 두부조림','가정식 반찬 세트','간편 떡볶이','든든한 한끼 도시락']},
processed:{label:'가공식품',items:['고소한 견과류','통밀 크래커','순한 양념 소스','건강한 시리얼','식물성 음료','간편 파스타면','과일 주스','담백한 스낵']},
living:{label:'생활용품',items:['주방 세정제','친환경 수세미','생활 세제','키친타월','다용도 행주','주방 보관 용기','핸드워시','생활용품 세트']}
};
const subcategoryData={fresh:['두부','콩나물','달걀','과일','채소','쌀','정육','수산'],meal:['만두','피자','떡볶이','면요리','반찬','김치'],processed:['양념','소스','오일','과자·견과·베이커리','생수·음료·유제품','건강식품'],living:['반려동물','생활','주방','뷰티용품','가전제품']};
const subcategories=document.querySelector('#best-subcategories');
const grid=document.querySelector('#best-products'),count=document.querySelector('#best-count'),title=document.querySelector('#best-category-title');
const placeholder='<span class="best-placeholder"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m3 17 6-5 4 3 3-3 5 5"/></svg>상품 이미지 준비 중</span>';
function render(key){
const group=groups[key];if(!group)return;
subcategories.replaceChildren(...subcategoryData[key].map(label=>{const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{subcategories.querySelectorAll('button').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});});return button;}));
title.textContent=group.label+' 베스트';count.textContent='총 '+group.items.length+'개';
grid.replaceChildren();
group.items.forEach((name,i)=>{
const article=document.createElement('article');article.className='best-product';
article.innerHTML='<div class="best-product-media"><span class="best-product-rank">'+(i+1)+'</span>'+placeholder+'<div class="best-product-actions"><button type="button" class="best-wish" aria-pressed="false" aria-label="찜하기"><img class="best-wish-default" src="img/Heart_button.svg" alt=""><img class="best-wish-selected" src="img/Heart_button_active.svg" alt=""></button><button type="button" class="best-cart" aria-label="장바구니 담기"><img src="img/Cart_button.svg" alt=""></button></div></div><div class="best-product-info"><p class="best-product-brand">풀무원 · 예시 상품</p><h3></h3><p class="best-product-delivery">상품 정보 준비 중</p><p class="best-product-price"><strong>가격 준비 중</strong></p></div>';
article.querySelector('h3').textContent=name;
article.querySelector('.best-wish').setAttribute('aria-label',name+' 찜하기');
article.querySelector('.best-cart').setAttribute('aria-label',name+' 장바구니 담기');
grid.appendChild(article);
});
document.querySelectorAll('.best-category-tabs button').forEach(btn=>{const active=btn.dataset.category===key;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));});
}
document.querySelectorAll('.best-category-tabs button').forEach(btn=>btn.addEventListener('click',()=>render(btn.dataset.category)));
grid.addEventListener('click',e=>{const wish=e.target.closest('.best-wish');if(wish){const on=wish.getAttribute('aria-pressed')!=='true';wish.setAttribute('aria-pressed',String(on));wish.classList.toggle('is-selected',on);}});
render('fresh');
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
document.querySelector('.mobile-search').addEventListener('click',()=>{const search=document.querySelector('.header-search');search.classList.toggle('mobile-search-open');if(search.classList.contains('mobile-search-open'))search.querySelector('input').focus();});
document.querySelector('.header-search').addEventListener('submit',e=>e.preventDefault());
});
