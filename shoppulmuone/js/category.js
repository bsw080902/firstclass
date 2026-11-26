/* 카테고리 3단계 필터 + BEST 상품 카드 예시 */
const categories={
fresh:{"두부 · 콩나물 · 달걀":["두부","콩나물","달걀"],"과일 · 채소 · 쌀":["과일","채소","쌀"],"정육 · 수산":["정육","수산"]},
meal:{"만두 · 피자 · 떡볶이":["만두","피자","떡볶이"],"면요리":[],"반찬 · 김치":["반찬","김치"]},
processed:{"양념 · 소스 · 오일":["양념","소스","오일"],"과자 · 견과 · 베이커리":["과자","견과","베이커리"],"생수 · 음료 · 유제품":["생수","음료","유제품"],"건강식품":[]},
living:{"반려동물":[],"생활 · 주방 · 뷰티용품":["생활용품","주방용품","뷰티용품"],"가전제품":[]}
};
const examples={
"두부":["국산 콩두부","담백한 부침두부","고소한 순두부","단단한 찌개두부","유기농 두부"],
"콩나물":["아삭한 콩나물","국산콩 콩나물","싱싱한 콩나물"],
"달걀":["신선한 달걀","동물복지 달걀","무항생제 달걀"],
"과일":["제철 과일 세트","신선한 사과","달콤한 과일 모음"],
"채소":["유기농 샐러드 채소","제철 버섯 모음","신선 채소 모음"],
"쌀":["친환경 쌀","국산 현미","잡곡 혼합곡"],
"정육":["신선 정육 세트","한우 국거리","돼지고기 구이용"],
"수산":["신선 수산 모음","손질 생선","간편 해산물"],
"만두":["담백한 만두","얇은피 만두","김치 만두"],
"피자":["치즈 피자","간편 냉동 피자","고르곤졸라 피자"],
"떡볶이":["간편 떡볶이","국물 떡볶이","매콤한 떡볶이"],
"국수":["잔치국수","쌀국수","소면"],
"우동":["가쓰오 우동","사누끼 우동"],
"파스타":["토마토 파스타","파스타 면"],
"반찬":["가정식 반찬 세트","고소한 두부조림","나물 반찬"],
"김치":["정성 담은 김치","배추김치","깍두기"],
"양념":["순한 양념 소스","요리 양념","국산 고춧가루"],
"소스":["토마토 소스","샐러드 드레싱","간장 소스"],
"오일":["올리브 오일","참기름","들기름"],
"과자":["통밀 크래커","담백한 스낵","곡물 과자"],
"견과":["고소한 견과류","하루 견과","아몬드"],
"베이커리":["통밀 식빵","담백한 베이커리","간편 빵"],
"생수":["생수","미네랄 워터"],
"음료":["식물성 음료","과일 주스","곡물 음료"],
"유제품":["플레인 요거트","우유","떠먹는 요거트"],
"건강식품":["건강식품 세트","영양 보충 식품","건강 간식"],
"반려동물용품":["반려동물 간식","반려동물 식기","반려동물 용품"],
"생활용품":["생활 세제","키친타월","생활용품 세트"],
"주방용품":["친환경 수세미","주방 보관 용기","다용도 행주"],
"뷰티용품":["핸드워시","바디워시","뷰티용품 세트"],
"가전제품":["주방 가전","소형 가전","생활 가전"]
};
// 베스트 및 신상품 페이지에 실제로 표시되는 상품 카드 데이터
const catalogProducts=[
{name:"채소습관 케일&사과 (130ml)",brand:"풀무원",image:"Best1.png",price:"4,950원",discount:"10%",delivery:"지금 결제 시 10-22 (목) 도착"},
{name:"100% 당근즙 (130ml)",brand:"풀무원",image:"Best2.png",price:"4,950원",discount:"10%",delivery:"지금 결제 시 10-22 (목) 도착"},
{name:"시그니처 밸런스 식단 (1일1식)",brand:"풀무원",image:"Best3.png",price:"8,280원",discount:"10%",delivery:"지금 결제 시 10-22 (목) 도착"},
{name:"특등급 국산콩 두부칩 오리지널 (40g)",brand:"풀무원식품",image:"Best4.png",price:"4,950원",discount:"10%",delivery:"지금 결제 시 10-22 (목) 도착"},
{name:"채소습관 양배추&브로콜리 (130ml)",brand:"풀무원녹즙",image:"Best5.png",price:"4,950원",discount:"10%",delivery:"지금 결제 시 10-22 (목) 도착"},
{name:"[반려묘] 시원하냥 참치 헤어볼&유리너리 (165g)",brand:"풀무원아미오",image:"new_item1.jpg",price:"1,100원",discount:"38%"},
{name:"[반려묘] 시원하냥 참치 헤어볼&유리너리 (165g)",brand:"풀무원아미오",image:"new_item2.jpg",price:"9,980원"},
{name:"[산지직송]독도 자연산 꽃새우 500g(20~25미)",brand:"올가",image:"new_item3.jpg",price:"135,000원",discount:"9%"},
{name:"[산지직송]햇 초사리 곱창돌김 150g(50매)",brand:"올가",image:"new_item4.jpg",price:"31,900원",discount:"8%"},
{name:"[산지직송]11Brix 당도선별 GAP 제주 유라감귤 (2.5kg)",brand:"올가",image:"new_item5.jpg",price:"24,900원",discount:"9%"}
];
const freshProducts=[{"brand":"풀무원식품","name":"특등급 국산콩 단단한 부침용 두부 (340gx2개)","price":"4,990원","discount":"45%","minor":"두부","image":"fresh1.jpg","imageRoot":true},{"brand":"풀무원식품","name":"특등급 국산콩 무농약 콩나물 (250g)","price":"2,280원","discount":"12%","minor":"콩나물","image":"fresh2.jpg","imageRoot":true},{"brand":"풀무원식품","name":"목초달걀 무항생제 1+등급 XL(특란) (15구) (900g)","price":"9,980원","discount":"","minor":"달걀","image":"fresh3.jpg","imageRoot":true},{"brand":"올가","name":"동물복지인증 유정란으로 만든 구운계란 (10입)","price":"11,900원","discount":"","minor":"달걀","image":"fresh4.jpg","imageRoot":true},{"brand":"풀무원식품","name":"고농도 진한 다용도 두부 (300g)","price":"1,780원","discount":"18%","minor":"두부","originalPrice":"2,180원","image":"fresh5.jpg","imageRoot":true},{"brand":"올가","name":"Cage Free 동물복지 유정란 20입 (1040g)","price":"18,900원","discount":"","minor":"달걀","image":"fresh6.jpg","imageRoot":true},{"brand":"올가","name":"순두부찌개 (순두부&찌개양념)","price":"4,760원","discount":"30%","minor":"두부","image":"fresh7.jpg","imageRoot":true},{"brand":"풀무원식품","name":"동물복지 목초란 (15구) (780g)","price":"10,980원","discount":"","minor":"달걀","image":"fresh8.jpg","imageRoot":true}];
function freshSelection(minor){return minor==="전체"?freshProducts:freshProducts.filter(p=>p.minor===minor);}
const easyProducts=[{"brand":"풀무원식품","name":"식감혁신 본격 떡볶이 쌀떡볶이 마포식 (420g)","price":"4,980원","discount":"23%","minor":"떡볶이","originalPrice":"6,480원","image":"easy1.jpg","imageRoot":true},{"brand":"풀무원식품","name":"생만두 새우청경채 (320g)","price":"4,980원","discount":"28%","minor":"만두","originalPrice":"6,980원","image":"easy2.jpg","imageRoot":true},{"brand":"풀무원지구식단","name":"[풀무원지구식단]이슬만두 직화불고기맛 (1.02kg)","price":"12,980원","discount":"","minor":"만두","image":"easy3.jpg","imageRoot":true},{"brand":"풀무원식품","name":"식감혁신 본격 떡볶이 밀+쌀 떡볶이 2종 (각 1개씩)","price":"9,960원","discount":"23%","minor":"떡볶이","originalPrice":"12,960원","image":"easy4.jpg","imageRoot":true},{"brand":"풀무원식품","name":"노엣지피자 토마토&미트콤보 (350g)","price":"4,980원","discount":"9%","minor":"피자","originalPrice":"5,473원","summary":"토마토 소스와 3가지 고기 토핑","image":"easy5.jpg","imageRoot":true},{"brand":"풀무원지구식단","name":"[풀무원지구식단] 찰곤약 떡볶이떡 (300g)","price":"3,980원","discount":"","minor":"떡볶이","summary":"먹어봐야 아는 쫀득탱글 찰곤약떡","image":"easy6.jpg","imageRoot":true},{"brand":"올가","name":"참 물만두 (490g)","price":"10,700원","discount":"10%","minor":"만두","originalPrice":"11,889원","image":"easy7.jpg","imageRoot":true},{"brand":"풀무원지구식단","name":"[풀무원지구식단]이슬만두 김치애호박(간편트레이) (180g)","price":"3,500원","discount":"22%","minor":"만두","originalPrice":"4,500원","image":"easy8.jpg","imageRoot":true}];
function easySelection(minor){return minor==="전체"?easyProducts:easyProducts.filter(p=>p.minor===minor);}
const tabs=document.querySelectorAll(".category-main-tabs button");
const subtabs=document.querySelector("#category-subtabs");
const minorTabs=document.querySelector("#category-minor-tabs");
const minorPanel=document.querySelector(".category-minor-panel");
const heading=document.querySelector("#category-title");
const bannerTitle=document.querySelector("#category-banner-title");
const detailRow=document.querySelector("#category-detail-row");
const middlePicker=document.querySelector(".category-middle-picker");
const middleTrigger=document.querySelector("#category-middle-trigger");
const middleLabel=document.querySelector("#category-middle-label");
const middleIcon=document.querySelector("#category-middle-icon");
const toolbarCount=document.querySelector("#category-total-count");
const filterTrigger=document.querySelector("#category-filter-trigger");
const sortTrigger=document.querySelector("#category-sort-trigger");
const sortLabel=document.querySelector("#category-sort-label");
const filterCount=document.querySelector("#category-filter-count");
const filterControl=document.querySelector(".category-filter-control");
const sortControl=document.querySelector(".category-sort-control");
const filterPopover=document.querySelector("#category-filter-panel");
const sortPopover=document.querySelector("#category-sort-panel");
// 필터 패널을 페이지 바깥으로 이동해 PC 사이드 드로어/모바일 바텀시트로 사용합니다.
const filterBackdrop=document.createElement("div");
filterBackdrop.className="category-filter-backdrop";
filterBackdrop.setAttribute("aria-hidden","true");
document.body.append(filterBackdrop,filterPopover);
filterPopover.classList.add("category-filter-drawer");
filterPopover.setAttribute("role","dialog");
filterPopover.setAttribute("aria-modal","true");
filterPopover.setAttribute("aria-label","상품 필터");
filterPopover.setAttribute("aria-hidden","true");
filterPopover.inert=true;
const filterHandle=document.createElement("div");
filterHandle.className="category-filter-handle";
filterHandle.setAttribute("aria-hidden","true");
filterPopover.prepend(filterHandle);
const filterHeader=filterPopover.querySelector(".category-filter-top");
const filterClose=document.createElement("button");
filterClose.type="button";
filterClose.className="category-filter-close";
filterClose.setAttribute("aria-label","필터 닫기");
filterClose.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5 19 19M19 5 5 19"/></svg>';
filterHeader.append(filterClose);
const filterTitle=filterHeader.querySelector("h2");
const filterReset=filterHeader.querySelector(".category-filter-reset");
filterHeader.insertBefore(filterReset,filterClose);
const keepSections=filterPopover.querySelectorAll(".category-filter-section");
keepSections.forEach(section=>section.open=true);
let filterPreviousFocus=null;
function setFilterOpen(open){
 const isOpen=filterControl.classList.contains("is-open");
 if(open===isOpen)return;
 if(open) filterPreviousFocus=document.activeElement;
 filterControl.classList.toggle("is-open",open);
 filterTrigger.setAttribute("aria-expanded",String(open));
 filterPopover.classList.toggle("is-open",open);
 filterBackdrop.classList.toggle("is-open",open);
 document.body.classList.toggle("category-filter-visible",open);
 filterPopover.inert=!open;
 filterPopover.setAttribute("aria-hidden",String(!open));
 // 포커스 때문에 화면이 상단 필터 버튼으로 이동하지 않도록 함
 if(open) filterClose.focus({preventScroll:true});
 else (filterPreviousFocus?.isConnected?filterPreviousFocus:filterTrigger).focus({preventScroll:true});
}
function closeCategoryMenus(){
 middlePicker.classList.remove("is-open");
 sortControl.classList.remove("is-open");
 middleTrigger.setAttribute("aria-expanded","false");
 sortTrigger.setAttribute("aria-expanded","false");
 subtabs.inert=true;
 sortPopover.inert=true;
}
function toggleCategoryMenu(type){
 const control=type==="middle"?middlePicker:sortControl;
 const trigger=type==="middle"?middleTrigger:sortTrigger;
 const panel=type==="middle"?subtabs:sortPopover;
 const shouldOpen=!control.classList.contains("is-open");
 closeCategoryMenus();
 if(shouldOpen){
  control.classList.add("is-open");
  trigger.setAttribute("aria-expanded","true");
  panel.inert=false;
 }
}
middleTrigger.addEventListener("click",()=>toggleCategoryMenu("middle"));
sortTrigger.addEventListener("click",()=>toggleCategoryMenu("sort"));
filterTrigger.addEventListener("click",()=>{
 closeCategoryMenus();
 setFilterOpen(!filterControl.classList.contains("is-open"));
});
filterClose.addEventListener("click",()=>setFilterOpen(false));
filterBackdrop.addEventListener("click",()=>setFilterOpen(false));
document.addEventListener("pointerdown",event=>{
 if(filterControl.classList.contains("is-open"))return;
 if(!event.target.closest(".category-middle-picker,.category-toolbar-actions"))closeCategoryMenus();
});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"){
  if(filterControl.classList.contains("is-open")){setFilterOpen(false);return;}
  const target=document.querySelector('.category-middle-picker.is-open #category-middle-trigger,.category-sort-control.is-open #category-sort-trigger');
  closeCategoryMenus();target?.focus();
 }
 if(event.key==="Tab"&&filterControl.classList.contains("is-open")){
  const focusable=[...filterPopover.querySelectorAll('button:not([disabled]),input:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
closeCategoryMenus();
function updateCategoryTotal(){toolbarCount.textContent=grid.querySelectorAll(".best-product").length+"개의"}

const grid=document.querySelector("#category-products");
const placeholder='<span class="best-placeholder"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m3 17 6-5 4 3 3-3 5 5"/></svg>상품 이미지 준비 중</span>';
function makeButton(label,active,onClick){
 const button=document.createElement("button");button.type="button";button.textContent=label;
 button.classList.toggle("is-active",active);button.setAttribute("aria-pressed",String(active));
 button.addEventListener("click",onClick);return button;
}
// 중분류별 아이콘: 기존 카테고리/필터 구조와 이벤트 유지
const middleIcons={
 fresh:["fresh_egg.svg","fresh_apple.svg","fresh_fish.svg"],
 meal:["easy_dumpling.svg","easy_noodle.svg","easy_kimchi.svg"],
 processed:["food_salt.svg","food_snack.svg","food_drink.svg","food_health.svg"],
 living:["life_animal.svg","life_kitchen.svg","life_electronic.svg"]
};
function makeMiddleButton(label,active,onClick,iconName){
 const button=makeButton(label,active,onClick);
 button.classList.add("category-icon-tab");
 const icon=document.createElement("span");icon.className="category-icon-tab-circle";
 const image=document.createElement("img");image.src="img/"+iconName+"?v=20261109-secondary-2";image.alt="";image.width=52;image.height=52;
 icon.append(image);
 const caption=document.createElement("span");caption.className="category-icon-tab-label";caption.textContent=label;
 button.replaceChildren(icon,caption);
 return button;
}
let activeSort="popular";
let currentNames=[];
const sortButtons=document.querySelectorAll(".category-sort button");
const beverageProducts=catalogProducts.filter(p=>["Best1.png","Best2.png","Best5.png"].includes(p.image));
const sideDishProducts=catalogProducts.filter(p=>["Best3.png","new_item4.jpg"].includes(p.image));
const seafoodProducts=catalogProducts.filter(p=>p.image==="new_item3.jpg");
const noodleProducts=catalogProducts.filter(p=>p.image==="new_item2.jpg");
const fruitProducts=catalogProducts.filter(p=>p.image==="new_item5.jpg");
const petProducts=catalogProducts.filter(p=>p.image==="new_item1.jpg");
// 필터는 실제 카드 데이터에 있는 값만 사용합니다. 미등록 인증/보관/혜택은 사실로 추정하지 않습니다.
const filterForm=document.querySelector("#category-filter-form");
const filterEmpty=document.querySelector("#category-filter-empty");
const filterMessage=document.querySelector("#category-filter-message");
function updateCategoryFilterBadge(){
 const total=filterForm.querySelectorAll('input[type="checkbox"]:checked').length +
  [filterForm.elements.minPrice,filterForm.elements.maxPrice].filter(el=>el.value!=="").length;
 filterCount.hidden=total===0;filterCount.textContent=String(total);
}
filterForm.addEventListener("input",updateCategoryFilterBadge);
filterForm.addEventListener("change",updateCategoryFilterBadge);
filterForm.addEventListener("reset",()=>requestAnimationFrame(updateCategoryFilterBadge));
updateCategoryFilterBadge();
closeCategoryMenus();

function selectedFilters(name){
 return [...filterForm.querySelectorAll('input[name="'+name+'"]:checked')].map(el=>el.value);
}
function filterIsActive(){
 return !!filterForm.querySelector('input[type="checkbox"]:checked') ||
  !!filterForm.elements.minPrice.value || !!filterForm.elements.maxPrice.value;
}
function applyProductFilters(source){
 const brands=selectedFilters("brand");
 const benefits=selectedFilters("benefit");
 const certs=selectedFilters("cert");
 const storage=selectedFilters("storage");
 const min=Number(filterForm.elements.minPrice.value)||0;
 const maxValue=filterForm.elements.maxPrice.value;
 const max=maxValue===""?Infinity:Number(maxValue);
 const unknown=benefits.some(x=>x!=="discount")||certs.length>0||storage.length>0;
 filterMessage.textContent=unknown?"일부 혜택·인증·보관 정보는 상품 데이터가 미등록되어 검색 결과에 표시되지 않을 수 있습니다.":"";
 const filtered=source.filter(p=>{
  const amount=Number((p.price||"").replace(/[^0-9]/g,""));
  if(brands.length&&!brands.includes(p.brand))return false;
  if(benefits.includes("discount")&&!p.discount)return false;
  if(benefits.includes("bundle")&&!(p.benefits||[]).includes("bundle"))return false;
  if(benefits.includes("free")&&!(p.benefits||[]).includes("free"))return false;
  if(certs.length&&!certs.some(x=>(p.certifications||[]).includes(x)))return false;
  if(storage.length&&!storage.includes(p.storage))return false;
  if((min>0||max<Infinity)&&(!amount||amount<min||amount>max))return false;
  return true;
 });
 filterEmpty.hidden=filtered.length>0||!filterIsActive();
 return filtered;
}
function rerenderWithFilters(){
 // 필터 항목 선택 시 상품만 갱신하고, 열려 있던 필터 패널은 닫지 않습니다.
 const wasFilterOpen=filterControl.classList.contains("is-open");
 const active=document.querySelector(".category-main-tabs button.is-active");
 const key=active?.dataset.category||"fresh";
 const middleIndex=[...subtabs.querySelectorAll("button")].findIndex(b=>b.classList.contains("is-active"));
 const minor=minorTabs.querySelector(".is-active")?.textContent||"전체";
 showCategory(key,Math.max(0,middleIndex),minor);
 if(wasFilterOpen){
  filterControl.classList.add("is-open");
  filterTrigger.setAttribute("aria-expanded","true");
  filterPopover.inert=false;
 }
}
filterForm.addEventListener("change",rerenderWithFilters);
filterForm.addEventListener("submit",event=>{
 event.preventDefault();
 const min=filterForm.elements.minPrice.value,max=filterForm.elements.maxPrice.value;
 if(min!==""&&max!==""&&Number(min)>Number(max)){
  filterMessage.textContent="최소가격은 최대가격보다 클 수 없습니다.";
  return;
 }
 rerenderWithFilters();
});
filterForm.addEventListener("reset",()=>requestAnimationFrame(rerenderWithFilters));
function renderCatalogProducts(productsSource=catalogProducts){
 currentNames=productsSource.map(p=>p.name);
 grid.classList.remove("is-revealed");grid.replaceChildren();
 const filtered=applyProductFilters(productsSource);
 const products=activeSort==="new"?[...filtered].reverse():filtered;
 products.forEach((p,i)=>{
  const article=document.createElement("article");article.className="best-product";article.style.setProperty("--best-card-index",i);if(p.summary)article.dataset.summary=p.summary;
  const media=document.createElement("div");media.className="best-product-media";
  const img=document.createElement("img");img.src=(p.imageRoot?"":"img/")+p.image;img.alt=p.name;img.loading="lazy";media.append(img);
  const actions=document.createElement("div");actions.className="best-product-actions";
  actions.innerHTML='<button type="button" class="best-wish" aria-pressed="false"><img class="best-wish-default" src="img/Heart_button.svg" alt=""><img class="best-wish-selected" src="img/Heart_button_active.svg" alt=""></button><button type="button" class="best-cart"><img src="img/Cart_button.svg" alt=""></button>';
  actions.querySelector(".best-wish").setAttribute("aria-label",p.name+" 찜하기");actions.querySelector(".best-cart").setAttribute("aria-label",p.name+" 장바구니 담기");media.append(actions);
  const info=document.createElement("div");info.className="best-product-info";
  const brand=document.createElement("p");brand.className="best-product-brand";brand.textContent=p.brand;
  const name=document.createElement("h3");name.textContent=p.name;
  const delivery=document.createElement("p");delivery.className="best-product-delivery";const deliveryText=p.delivery||"배송 예정일은 결제 시 확인";const dateMatch=deliveryText.match(/^(지금 결제 시\s*)(\d{1,2}-\d{1,2}\s*\([^)]+\))(.*)$/);if(dateMatch){delivery.append(document.createTextNode(dateMatch[1]));const date=document.createElement("strong");date.textContent=dateMatch[2];delivery.append(date,document.createTextNode(dateMatch[3]));}else{delivery.textContent=deliveryText;}
  const price=document.createElement("p");price.className="best-product-price";
  if(p.discount){const discount=document.createElement("span");discount.className="best-product-discount";discount.textContent=p.discount;price.append(discount)}
  if(p.originalPrice){const original=document.createElement("del");original.textContent=p.originalPrice;original.style.cssText="color:#858585;font-size:12px;font-weight:400";price.prepend(original);}
  const amount=document.createElement("strong");amount.textContent=p.price;price.append(amount);
  info.append(brand,name,delivery,price);article.append(media,info);grid.append(article);
 });
 updateCategoryTotal();
 requestAnimationFrame(()=>requestAnimationFrame(()=>grid.classList.add("is-revealed")));
}
function renderCards(names){
 currentNames=[...names];
 drawCards();
}
function drawCards(){
 const names=filterIsActive()?[]:[...currentNames];
 filterEmpty.hidden=!filterIsActive();
 if(filterIsActive())filterMessage.textContent="이 카테고리의 예시 상품에는 필터에 필요한 상세 정보가 등록되어 있지 않습니다.";
 // 예시 상품에는 가격·할인율·리뷰·별점 데이터가 없으므로 임의의 순위를 만들지 않습니다.
 if(activeSort==="new")names.reverse();
 grid.classList.remove("is-revealed");
 grid.replaceChildren();
 names.forEach(name=>{
 const article=document.createElement("article");article.className="best-product";
 article.innerHTML='<div class="best-product-media">'+placeholder+'<div class="best-product-actions"><button type="button" class="best-wish" aria-pressed="false" aria-label="찜하기"><img class="best-wish-default" src="img/Heart_button.svg" alt=""><img class="best-wish-selected" src="img/Heart_button_active.svg" alt=""></button><button type="button" class="best-cart" aria-label="장바구니 담기"><img src="img/Cart_button.svg" alt=""></button></div></div><div class="best-product-info"><p class="best-product-brand">풀무원 · 예시 상품</p><h3></h3><p class="best-product-delivery">상품 정보 준비 중</p><p class="best-product-price"><strong>가격 준비 중</strong></p></div>';
 article.querySelector("h3").textContent=name;
 article.querySelector(".best-wish").setAttribute("aria-label",name+" 찜하기");
 article.querySelector(".best-cart").setAttribute("aria-label",name+" 장바구니 담기");
 grid.append(article);
 });
 updateCategoryTotal();
 requestAnimationFrame(()=>requestAnimationFrame(()=>grid.classList.add("is-revealed")));
}
let renderedCategory=null;
let renderedMiddle=null;
let iconTransitionId=0;
function showCategory(key,selected=0,minor="전체"){
 if(key==="all"){
  bannerTitle.textContent="인기";
  detailRow.classList.add("is-empty");closeCategoryMenus();
  tabs.forEach(btn=>{const active=btn.dataset.category==="all";btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
  ++iconTransitionId;
  subtabs.classList.remove("is-revealed","is-switching");
  subtabs.replaceChildren();
  renderedCategory="all";renderedMiddle=null;
  minorTabs.classList.remove("is-revealed");minorTabs.replaceChildren();
  minorPanel.classList.add("is-collapsed");minorPanel.setAttribute("aria-hidden","true");
  heading.textContent="인기";
  const names=Object.values(examples).flat();
  renderCatalogProducts();
  return;
 }
 bannerTitle.textContent=[...tabs].find(btn=>btn.dataset.category===key)?.textContent.trim()||"카테고리";
 detailRow.classList.remove("is-empty");
 const names=Object.keys(categories[key]);
 const index=Math.max(0,Math.min(selected,names.length-1));
 const middle=names[index], details=categories[key][middle], hasDetails=details.length>0;
 middleLabel.textContent=middle;
 middleIcon.src="img/"+middleIcons[key][index]+"?v=20261109-secondary-2";
 closeCategoryMenus();
 const options=hasDetails?["전체",...details]:[];
 const current=options.includes(minor)?minor:"전체";
 tabs.forEach(btn=>{const active=btn.dataset.category===key;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
 // 같은 카테고리 안에서는 기존 버튼을 재사용해 클릭 중 호버가 끊기지 않게 합니다.
 if(renderedCategory!==key){
  const transitionId=++iconTransitionId;
  // 교체되는 SVG가 로딩되는 동안 이전/새 아이콘이 겹쳐 보이지 않도록 숨깁니다.
  subtabs.classList.remove("is-revealed");
  subtabs.classList.add("is-switching");
  subtabs.replaceChildren(...names.map((name,i)=>{
   const button=makeMiddleButton(name,i===index,()=>showCategory(key,i),middleIcons[key][i]);
   button.style.setProperty("--category-enter-index",i);
   return button;
  }));
  const images=[...subtabs.querySelectorAll(".category-icon-tab-circle img")];
  Promise.all(images.map(image=>{
   if(image.decode) return image.decode().catch(()=>{});
   if(image.complete) return Promise.resolve();
   return new Promise(resolve=>{
    image.addEventListener("load",resolve,{once:true});
    image.addEventListener("error",resolve,{once:true});
   });
  })).then(()=>{
   if(transitionId!==iconTransitionId) return;
   requestAnimationFrame(()=>{
    if(transitionId!==iconTransitionId) return;
    subtabs.classList.remove("is-switching");
    subtabs.classList.add("is-revealed");
   });
  });
 }else{
  subtabs.querySelectorAll("button").forEach((btn,i)=>{
   const active=i===index;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active));
  });
 }
 if(renderedCategory!==key||renderedMiddle!==middle){
  minorTabs.classList.remove("is-revealed");
  minorTabs.replaceChildren(...options.map((name,i)=>{
   const button=makeButton(name,name===current,()=>showCategory(key,index,name));
   button.style.setProperty("--category-enter-index",i);
   return button;
  }));
 }else{
  minorTabs.querySelectorAll("button").forEach(btn=>{
   const active=btn.textContent===current;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active));
  });
 }
 renderedCategory=key;renderedMiddle=middle;
 minorPanel.classList.toggle("is-collapsed",!hasDetails);
 minorPanel.setAttribute("aria-hidden",String(!hasDetails));
 if(hasDetails)requestAnimationFrame(()=>requestAnimationFrame(()=>minorTabs.classList.add("is-revealed")));
 heading.textContent=current==="전체"?middle:current;
 const products=!hasDetails?(examples[middle]||[middle+" 상품"]):current==="전체"?details.flatMap(label=>examples[label]||[label+" 상품"]):examples[current]||[current+" 상품"];
 if(key==="meal" && middle==="만두 · 피자 · 떡볶이"){
  renderCatalogProducts(easySelection(current));
 }else if(key==="fresh" && middle==="두부 · 콩나물 · 달걀"){
  renderCatalogProducts(freshSelection(current));
 }else if(key==="living" && middle==="반려동물"){
  renderCatalogProducts(petProducts);
 }else if(key==="fresh" && middle==="과일 · 채소 · 쌀" && (current==="전체" || current==="과일")){
  renderCatalogProducts(fruitProducts);
 }else if(key==="meal" && middle==="면요리"){
  renderCatalogProducts(noodleProducts);
 }else if(key==="fresh" && middle==="정육 · 수산" && (current==="전체" || current==="수산")){
  renderCatalogProducts(seafoodProducts);
 }else if(key==="meal" && middle==="반찬 · 김치" && (current==="전체" || current==="반찬")){
  renderCatalogProducts(sideDishProducts);
 }else if(key==="processed" && middle==="생수 · 음료 · 유제품" && (current==="전체" || current==="음료")){
  renderCatalogProducts(beverageProducts);
 }else{
  renderCards([...new Set(products)].slice(0,10));
 }
}
sortButtons.forEach(btn=>btn.addEventListener("click",()=>{
 activeSort=btn.dataset.sort;
 sortLabel.textContent=btn.textContent.trim();closeCategoryMenus();
 sortButtons.forEach(item=>{const selected=item===btn;item.classList.toggle("is-active",selected);item.setAttribute("aria-pressed",String(selected));});
 if(document.querySelector(".category-main-tabs button[data-category=all]")?.classList.contains("is-active"))renderCatalogProducts();
 else if(document.querySelector(".category-main-tabs button[data-category=meal]")?.classList.contains("is-active") && renderedMiddle==="만두 · 피자 · 떡볶이")renderCatalogProducts(easySelection(document.querySelector("#category-minor-tabs .is-active")?.textContent||"전체"));
 else if(document.querySelector(".category-main-tabs button[data-category=fresh]")?.classList.contains("is-active") && renderedMiddle==="두부 · 콩나물 · 달걀")renderCatalogProducts(freshSelection(document.querySelector("#category-minor-tabs .is-active")?.textContent||"전체"));
 else if(document.querySelector(".category-main-tabs button[data-category=living]")?.classList.contains("is-active") && renderedMiddle==="반려동물")renderCatalogProducts(petProducts);
 else if(document.querySelector(".category-main-tabs button[data-category=fresh]")?.classList.contains("is-active") && renderedMiddle==="과일 · 채소 · 쌀" && ["전체","과일"].includes(document.querySelector("#category-minor-tabs .is-active")?.textContent))renderCatalogProducts(fruitProducts);
 else if(document.querySelector(".category-main-tabs button[data-category=meal]")?.classList.contains("is-active") && renderedMiddle==="면요리")renderCatalogProducts(noodleProducts);
 else if(document.querySelector(".category-main-tabs button[data-category=fresh]")?.classList.contains("is-active") && renderedMiddle==="정육 · 수산" && ["전체","수산"].includes(document.querySelector("#category-minor-tabs .is-active")?.textContent))renderCatalogProducts(seafoodProducts);
 else if(document.querySelector(".category-main-tabs button[data-category=meal]")?.classList.contains("is-active") && renderedMiddle==="반찬 · 김치" && ["전체","반찬"].includes(document.querySelector("#category-minor-tabs .is-active")?.textContent))renderCatalogProducts(sideDishProducts);
 else if(document.querySelector(".category-main-tabs button[data-category=processed]")?.classList.contains("is-active") && renderedMiddle==="생수 · 음료 · 유제품" && ["전체","음료"].includes(document.querySelector("#category-minor-tabs .is-active")?.textContent))renderCatalogProducts(beverageProducts);
 else drawCards();
}));
tabs.forEach(btn=>btn.addEventListener("click",()=>showCategory(btn.dataset.category)));
grid.addEventListener("click",e=>{const wish=e.target.closest(".best-wish");if(wish){const on=wish.getAttribute("aria-pressed")!=="true";wish.setAttribute("aria-pressed",String(on));wish.classList.toggle("is-selected",on)}});
const params=new URLSearchParams(location.search),initial=params.get("group");
const key=Object.hasOwn(categories,initial)?initial:"fresh",sub=Number(params.get("sub"));
showCategory(key,key==="all"?0:(Number.isInteger(sub)&&sub>=0&&sub<Object.keys(categories[key]).length?sub:0));
