/* 헤더 카테고리 세부 메뉴를 카테고리 페이지와 연결 */
(()=>{const groups=["fresh","meal","processed","living"];const menus=[["두부 · 콩나물 · 달걀","과일 · 채소 · 쌀","정육 · 수산"],["만두 · 피자 · 떡볶이","면요리","반찬 · 김치"],["양념 · 소스 · 오일","과자 · 견과 · 베이커리","생수 · 음료 · 유제품","건강식품"],["반려동물","생활 · 주방 · 뷰티용품","가전제품"]];const url=(g,i)=>"category.html?group="+groups[g]+"&sub="+i;document.addEventListener("click",event=>{const a=event.target.closest(".category-panel-right a");if(!a)return;const name=a.textContent.trim().replace(/\s+/g," ");for(let g=0;g<menus.length;g++){const i=menus[g].indexOf(name);if(i!==-1){event.preventDefault();window.location.href=url(g,i);return}}});document.querySelectorAll(".category-panel-right a").forEach(a=>{const name=a.textContent.trim().replace(/\s+/g," ");menus.forEach((items,g)=>{const i=items.indexOf(name);if(i!==-1)a.href=url(g,i)})})})();
/* 독립 서브페이지에서도 헤더 카테고리 열기/전환 지원 */
document.addEventListener("DOMContentLoaded",()=>{
 const trigger=document.querySelector(".category-link"),panel=document.querySelector("#category-panel");
 if(!trigger||!panel)return;
 const buttons=[...panel.querySelectorAll(".category-panel-left .category-item")];
 const details=panel.querySelector(".category-panel-right");
 const menus=[["두부 · 콩나물 · 달걀","과일 · 채소 · 쌀","정육 · 수산"],["만두 · 피자 · 떡볶이","면요리","반찬 · 김치"],["양념 · 소스 · 오일","과자 · 견과 · 베이커리","생수 · 음료 · 유제품","건강식품"],["반려동물","생활 · 주방 · 뷰티용품","가전제품"]];
 const groups=["fresh","meal","processed","living"];
 const hasExistingHandler=Boolean(document.querySelector('script[src*="js/best.js"],script[src*="js/new.js"]'))||document.body.classList.contains("home-page")||Boolean(document.querySelector("main.home-main"));
 if(hasExistingHandler)return;
 function close(){panel.classList.remove("is-open");trigger.classList.remove("is-active");trigger.setAttribute("aria-expanded","false");document.body.classList.remove("mobile-category-open");document.querySelector(".mobile-category")?.setAttribute("aria-expanded","false")}
 trigger.addEventListener("click",e=>{e.preventDefault();const open=!panel.classList.contains("is-open");if(open){panel.classList.add("is-open");trigger.classList.add("is-active");trigger.setAttribute("aria-expanded","true");document.body.classList.add("mobile-category-open")}else close()});
 buttons.forEach((button,g)=>button.addEventListener("click",()=>{buttons.forEach(b=>{b.classList.remove("is-selected");b.setAttribute("aria-pressed","false")});button.classList.add("is-selected");button.setAttribute("aria-pressed","true");details.replaceChildren(...menus[g].map((label,i)=>{const a=document.createElement("a");a.textContent=label;a.href="category.html?group="+groups[g]+"&sub="+i;return a}))}));
 document.querySelector(".mobile-category")?.addEventListener("click",e=>{e.preventDefault();trigger.click()});
 document.addEventListener("click",e=>{if(!trigger.contains(e.target)&&!panel.contains(e.target)&&!e.target.closest(".mobile-category"))close()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
});

/* 1차 카테고리만 먼저 표시하고, 선택 시 세부 메뉴를 오른쪽으로 펼칩니다. */
document.addEventListener("DOMContentLoaded",()=>{
 const panel=document.querySelector("#category-panel");
 const trigger=document.querySelector(".category-link");
 if(!panel||!trigger)return;
 const reset=()=>{panel.classList.remove("has-subcategory");panel.querySelectorAll(".category-item.is-selected").forEach(button=>{button.classList.remove("is-selected");button.setAttribute("aria-pressed","false")})};
 reset();
 panel.querySelectorAll(".category-panel-left .category-item").forEach(button=>button.addEventListener("click",()=>panel.classList.add("has-subcategory"),true));
 trigger.addEventListener("click",()=>{if(!panel.classList.contains("is-open"))reset()},true);
 document.querySelector(".mobile-category")?.addEventListener("click",()=>{if(!panel.classList.contains("is-open"))reset()},true);
});

/* PC에서는 왼쪽 카테고리에 마우스를 올리는 즉시 세부 메뉴 표시 (터치는 기존 클릭 유지) */
document.addEventListener("DOMContentLoaded",()=>{
 const panel=document.querySelector("#category-panel");
 if(!panel)return;
 panel.querySelectorAll(".category-panel-left .category-item").forEach(button=>{
  button.addEventListener("pointerenter",event=>{
   if(event.pointerType!=="mouse"||!panel.classList.contains("is-open"))return;
   button.click();
  });
 });
});

/* 카테고리 패널에서 마우스가 벗어나면 세부 메뉴를 접고 선택 상태 해제 */
document.addEventListener("DOMContentLoaded",()=>{
 const panel=document.querySelector("#category-panel");
 if(!panel)return;
 panel.addEventListener("pointerleave",event=>{
  if(event.pointerType!=="mouse")return;
  panel.classList.remove("has-subcategory");
  panel.querySelectorAll(".category-panel-left .category-item").forEach(button=>{
   button.classList.remove("is-selected");
   button.setAttribute("aria-pressed","false");
  });
 });
});
