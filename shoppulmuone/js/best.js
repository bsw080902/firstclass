/* 베스트 전용: 메인페이지 JS에 의존하지 않도록 독립적으로 초기화 */
document.addEventListener('DOMContentLoaded',()=>{
// 메인 페이지 BEST 슬라이더의 이미지·문구·가격을 그대로 사용합니다.
const bestProducts=[
{name:'채소습관 케일&사과 (130ml)',image:'Best1.png',brand:'풀무원',price:'4,950원',discount:'10%',category:'fresh'},
{name:'100% 당근즙 (130ml)',image:'Best2.png',brand:'풀무원',price:'4,950원',discount:'10%',category:'fresh'},
{name:'시그니처 밸런스 식단 (1일1식)',image:'Best3.png',brand:'풀무원',price:'8,280원',discount:'10%',category:'meal'},
{name:'로제빈 우먼밸런스 (3개월분)',image:'Best4.png',brand:'풀무원',price:'4,950원',discount:'10%',category:'processed'},
{name:'채소습관 양배추&브로콜리 (130ml)',image:'Best5.png',brand:'풀무원녹즙',price:'4,950원',discount:'10%',category:'processed'}
];
const groups={
all:{label:'전체',items:bestProducts},
fresh:{label:'신선식품',items:bestProducts.filter(p=>p.category==='fresh')},
meal:{label:'간편식 · 반찬',items:bestProducts.filter(p=>p.category==='meal')},
processed:{label:'가공식품',items:bestProducts.filter(p=>p.category==='processed')},
living:{label:'생활용품',items:bestProducts.filter(p=>p.category==='living')}
};
const subcategoryData={fresh:['두부','콩나물','달걀','과일','채소','쌀','정육','수산'],meal:['만두','피자','떡볶이','면요리','반찬','김치'],processed:['양념','소스','오일','과자·견과·베이커리','생수·음료·유제품','건강식품'],living:['반려동물','생활','주방','뷰티용품','가전제품']};
const subcategories=document.querySelector('#best-subcategories');
const grid=document.querySelector('#best-products'),count=document.querySelector('#best-count'),title=document.querySelector('#best-category-title');
function render(key){
const group=groups[key];if(!group)return;
subcategories.classList.toggle('is-empty',key==='all');
subcategories.setAttribute('aria-hidden',String(key==='all'));
subcategories.replaceChildren(...(subcategoryData[key]||[]).map(label=>{const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{subcategories.querySelectorAll('button').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});});return button;}));
title.textContent=group.label+' 베스트';count.textContent='총 '+group.items.length+'개';
grid.replaceChildren();
group.items.forEach((product,i)=>{
const article=document.createElement('article');article.className='best-product';
article.innerHTML='<div class="best-product-media"><span class="best-product-rank">'+(i+1)+'</span><img src="img/'+product.image+'" alt=""><div class="best-product-actions"><button type="button" class="best-wish" aria-pressed="false"><img class="best-wish-default" src="img/Heart_button.svg" alt=""><img class="best-wish-selected" src="img/Heart_button_active.svg" alt=""></button><button type="button" class="best-cart"><img src="img/Cart_button.svg" alt=""></button></div></div><div class="best-product-info"><p class="best-product-brand"></p><h3></h3><p class="best-product-delivery">지금 결제 시 <strong>10-22 (목)</strong> 도착</p><p class="best-product-price"><span class="best-product-discount"></span><strong></strong></p></div>';
article.querySelector('.best-product-media > img').alt=product.name;
article.querySelector('.best-product-brand').textContent=product.brand;
article.querySelector('h3').textContent=product.name;
article.querySelector('.best-product-discount').textContent=product.discount;
article.querySelector('.best-product-price strong').textContent=product.price;
article.querySelector('.best-wish').setAttribute('aria-label',product.name+' 찜하기');
article.querySelector('.best-cart').setAttribute('aria-label',product.name+' 장바구니 담기');
grid.appendChild(article);
});
document.querySelectorAll('.best-category-tabs button').forEach(btn=>{const active=btn.dataset.category===key;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));});
}
document.querySelectorAll('.best-category-tabs button').forEach(btn=>btn.addEventListener('click',()=>render(btn.dataset.category)));
grid.addEventListener('click',e=>{const wish=e.target.closest('.best-wish');if(wish){const on=wish.getAttribute('aria-pressed')!=='true';wish.setAttribute('aria-pressed',String(on));wish.classList.toggle('is-selected',on);}});
render('all');
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
});
