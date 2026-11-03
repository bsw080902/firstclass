/* 카테고리 3단계 필터 + BEST 상품 카드 예시 */
const categories={
fresh:{"두부 · 콩나물 · 달걀":["두부","콩나물","달걀"],"과일 · 채소 · 쌀":["과일","채소","쌀"],"정육 · 수산":["정육","수산"]},
meal:{"만두 · 피자 · 떡볶이":["만두","피자","떡볶이"],"면요리":["국수","우동","파스타"],"반찬 · 김치":["반찬","김치"]},
processed:{"양념 · 소스 · 오일":["양념","소스","오일"],"과자 · 견과 · 베이커리":["과자","견과","베이커리"],"생수 · 음료 · 유제품":["생수","음료","유제품"],"건강식품":["건강식품"]},
living:{"반려동물":["반려동물용품"],"생활 · 주방 · 뷰티용품":["생활용품","주방용품","뷰티용품"],"가전제품":["가전제품"]}
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
const tabs=document.querySelectorAll(".category-main-tabs button");
const subtabs=document.querySelector("#category-subtabs");
const minorTabs=document.querySelector("#category-minor-tabs");
const heading=document.querySelector("#category-title");
const grid=document.querySelector("#category-products");
const placeholder='<span class="best-placeholder"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m3 17 6-5 4 3 3-3 5 5"/></svg>상품 이미지 준비 중</span>';
function makeButton(label,active,onClick){
 const button=document.createElement("button");button.type="button";button.textContent=label;
 button.classList.toggle("is-active",active);button.setAttribute("aria-pressed",String(active));
 button.addEventListener("click",onClick);return button;
}
function renderCards(names){
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
function showCategory(key,selected=0,minor="전체"){
 const names=Object.keys(categories[key]);
 const index=Math.max(0,Math.min(selected,names.length-1));
 const middle=names[index], options=["전체",...categories[key][middle]];
 const current=options.includes(minor)?minor:"전체";
 tabs.forEach(btn=>{const active=btn.dataset.category===key;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
 subtabs.replaceChildren(...names.map((name,i)=>makeButton(name,i===index,()=>showCategory(key,i))));
 minorTabs.classList.remove("is-revealed");
 minorTabs.replaceChildren(...options.map(name=>makeButton(name,name===current,()=>showCategory(key,index,name))));
 requestAnimationFrame(()=>requestAnimationFrame(()=>minorTabs.classList.add("is-revealed")));
 heading.textContent=current==="전체"?middle:current;
 const products=current==="전체"?categories[key][middle].flatMap(label=>examples[label]||[label+" 상품"]):examples[current]||[current+" 상품"];
 renderCards([...new Set(products)].slice(0,10));
}
tabs.forEach(btn=>btn.addEventListener("click",()=>showCategory(btn.dataset.category)));
grid.addEventListener("click",e=>{const wish=e.target.closest(".best-wish");if(wish){const on=wish.getAttribute("aria-pressed")!=="true";wish.setAttribute("aria-pressed",String(on));wish.classList.toggle("is-selected",on)}});
const params=new URLSearchParams(location.search),initial=params.get("group");
const key=Object.hasOwn(categories,initial)?initial:"fresh",sub=Number(params.get("sub"));
showCategory(key,Number.isInteger(sub)&&sub>=0&&sub<Object.keys(categories[key]).length?sub:0);
