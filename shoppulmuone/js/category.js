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
const tabs=document.querySelectorAll(".category-main-tabs button");
const subtabs=document.querySelector("#category-subtabs");
const minorTabs=document.querySelector("#category-minor-tabs");
const minorPanel=document.querySelector(".category-minor-panel");
const heading=document.querySelector("#category-title");
const grid=document.querySelector("#category-products");
const placeholder='<span class="best-placeholder"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m3 17 6-5 4 3 3-3 5 5"/></svg>상품 이미지 준비 중</span>';
function makeButton(label,active,onClick){
 const button=document.createElement("button");button.type="button";button.textContent=label;
 button.classList.toggle("is-active",active);button.setAttribute("aria-pressed",String(active));
 button.addEventListener("click",onClick);return button;
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
function renderCatalogProducts(productsSource=catalogProducts){
 currentNames=productsSource.map(p=>p.name);
 grid.classList.remove("is-revealed");grid.replaceChildren();
 const products=activeSort==="new"?[...productsSource].reverse():productsSource;
 products.forEach((p,i)=>{
  const article=document.createElement("article");article.className="best-product";article.style.setProperty("--best-card-index",i);
  const media=document.createElement("div");media.className="best-product-media";
  const img=document.createElement("img");img.src="img/"+p.image;img.alt=p.name;img.loading="lazy";media.append(img);
  const actions=document.createElement("div");actions.className="best-product-actions";
  actions.innerHTML='<button type="button" class="best-wish" aria-pressed="false"><img class="best-wish-default" src="img/Heart_button.svg" alt=""><img class="best-wish-selected" src="img/Heart_button_active.svg" alt=""></button><button type="button" class="best-cart"><img src="img/Cart_button.svg" alt=""></button>';
  actions.querySelector(".best-wish").setAttribute("aria-label",p.name+" 찜하기");actions.querySelector(".best-cart").setAttribute("aria-label",p.name+" 장바구니 담기");media.append(actions);
  const info=document.createElement("div");info.className="best-product-info";
  const brand=document.createElement("p");brand.className="best-product-brand";brand.textContent=p.brand;
  const name=document.createElement("h3");name.textContent=p.name;
  const delivery=document.createElement("p");delivery.className="best-product-delivery";delivery.textContent=p.delivery||"배송 예정일은 결제 시 확인";
  const price=document.createElement("p");price.className="best-product-price";
  if(p.discount){const discount=document.createElement("span");discount.className="best-product-discount";discount.textContent=p.discount;price.append(discount)}
  const amount=document.createElement("strong");amount.textContent=p.price;price.append(amount);
  info.append(brand,name,delivery,price);article.append(media,info);grid.append(article);
 });
 requestAnimationFrame(()=>requestAnimationFrame(()=>grid.classList.add("is-revealed")));
}
function renderCards(names){
 currentNames=[...names];
 drawCards();
}
function drawCards(){
 const names=[...currentNames];
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
 requestAnimationFrame(()=>requestAnimationFrame(()=>grid.classList.add("is-revealed")));
}
let renderedCategory=null;
let renderedMiddle=null;
function showCategory(key,selected=0,minor="전체"){
 if(key==="all"){
  tabs.forEach(btn=>{const active=btn.dataset.category==="all";btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
  subtabs.classList.remove("is-revealed");
  subtabs.replaceChildren();
  renderedCategory="all";renderedMiddle=null;
  minorTabs.classList.remove("is-revealed");minorTabs.replaceChildren();
  minorPanel.classList.add("is-collapsed");minorPanel.setAttribute("aria-hidden","true");
  heading.textContent="전체상품";
  const names=Object.values(examples).flat();
  renderCatalogProducts();
  return;
 }
 const names=Object.keys(categories[key]);
 const index=Math.max(0,Math.min(selected,names.length-1));
 const middle=names[index], details=categories[key][middle], hasDetails=details.length>0;
 const options=hasDetails?["전체",...details]:[];
 const current=options.includes(minor)?minor:"전체";
 tabs.forEach(btn=>{const active=btn.dataset.category===key;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
 // 같은 카테고리 안에서는 기존 버튼을 재사용해 클릭 중 호버가 끊기지 않게 합니다.
 if(renderedCategory!==key){
  subtabs.classList.remove("is-revealed");
  subtabs.replaceChildren(...names.map((name,i)=>makeButton(name,i===index,()=>showCategory(key,i))));
  requestAnimationFrame(()=>requestAnimationFrame(()=>subtabs.classList.add("is-revealed")));
 }else{
  subtabs.querySelectorAll("button").forEach((btn,i)=>{
   const active=i===index;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active));
  });
 }
 if(renderedCategory!==key||renderedMiddle!==middle){
  minorTabs.classList.remove("is-revealed");
  minorTabs.replaceChildren(...options.map(name=>makeButton(name,name===current,()=>showCategory(key,index,name))));
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
 if(key==="living" && middle==="반려동물"){
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
 sortButtons.forEach(item=>{const selected=item===btn;item.classList.toggle("is-active",selected);item.setAttribute("aria-pressed",String(selected));});
 if(document.querySelector(".category-main-tabs button[data-category=all]")?.classList.contains("is-active"))renderCatalogProducts();
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
const key=initial==="all"||Object.hasOwn(categories,initial)?initial:"all",sub=Number(params.get("sub"));
showCategory(key,key==="all"?0:(Number.isInteger(sub)&&sub>=0&&sub<Object.keys(categories[key]).length?sub:0));
