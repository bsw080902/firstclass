const categories={
fresh:{"두부 · 콩나물 · 달걀":["두부","콩나물","달걀"],"과일 · 채소 · 쌀":["과일","채소","쌀"],"정육 · 수산":["정육","수산"]},
meal:{"만두 · 피자 · 떡볶이":["만두","피자","떡볶이"],"면요리":["국수","우동","파스타"],"반찬 · 김치":["반찬","김치"]},
processed:{"양념 · 소스 · 오일":["양념","소스","오일"],"과자 · 견과 · 베이커리":["과자","견과","베이커리"],"생수 · 음료 · 유제품":["생수","음료","유제품"],"건강식품":["건강식품"]},
living:{"반려동물":["반려동물용품"],"생활 · 주방 · 뷰티용품":["생활용품","주방용품","뷰티용품"],"가전제품":["가전제품"]}
};
const tabs=document.querySelectorAll(".category-main-tabs button");
const subtabs=document.querySelector("#category-subtabs");
const minorTabs=document.querySelector("#category-minor-tabs");
const heading=document.querySelector("#category-title");
const placeholder=document.querySelector("#category-placeholder-title");
function makeButton(label,active,onClick){
 const button=document.createElement("button");
 button.type="button";button.textContent=label;
 button.classList.toggle("is-active",active);
 button.setAttribute("aria-pressed",String(active));
 button.addEventListener("click",onClick);return button;
}
function showCategory(key,selected=0,minor="전체"){
 const names=Object.keys(categories[key]);
 const index=Math.max(0,Math.min(selected,names.length-1));
 const middle=names[index], options=["전체",...categories[key][middle]];
 const current=options.includes(minor)?minor:"전체";
 tabs.forEach(btn=>{const active=btn.dataset.category===key;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
 subtabs.replaceChildren(...names.map((name,i)=>makeButton(name,i===index,()=>showCategory(key,i))));
 minorTabs.replaceChildren(...options.map(name=>makeButton(name,name===current,()=>showCategory(key,index,name))));
 const title=current==="전체"?middle:current;
 heading.textContent=title;
 placeholder.textContent=title+" 상품 준비 중";
}
tabs.forEach(btn=>btn.addEventListener("click",()=>showCategory(btn.dataset.category)));
const params=new URLSearchParams(location.search);
const initial=params.get("group"),key=Object.hasOwn(categories,initial)?initial:"fresh";
const sub=Number(params.get("sub"));
showCategory(key,Number.isInteger(sub)&&sub>=0&&sub<Object.keys(categories[key]).length?sub:0);
