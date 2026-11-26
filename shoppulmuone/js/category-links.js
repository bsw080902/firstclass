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


/* 실제 카테고리 버튼 폭을 기준으로 드롭다운 중앙 정렬 */
document.addEventListener('DOMContentLoaded',()=>{
 const trigger=document.querySelector('.header-nav > .category-link');
 if(!trigger)return;
 const sync=()=>trigger.parentElement.style.setProperty('--category-trigger-width',`${trigger.getBoundingClientRect().width}px`);
 sync();
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(sync).observe(trigger);
 window.addEventListener('resize',sync);
});

/* Shared header search history. Popular ranks are design sample data. */
document.addEventListener("DOMContentLoaded",()=>{
 const form=document.querySelector(".header-search"), input=form?.querySelector('input[type="search"]'), mobile=document.querySelector(".mobile-search");
 if(!form||!input)return;
 const key="pulmuone-recent-searches", popular=[["피자",20],["떡볶이",15],["만두",13],["과자",10],["김치",7]];
 let history=[];try{const saved=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(saved))history=saved.filter(x=>typeof x==="string").slice(0,10);}catch{}
 const panel=document.createElement("section");panel.className="header-search-panel";panel.id="header-search-panel";panel.hidden=true;panel.setAttribute("aria-label","최근 검색어 및 인기 검색어");
 panel.innerHTML='<div class="search-history-column"><div class="search-panel-heading"><h2>최근 검색어</h2></div><ul class="search-history-list"></ul><p class="search-history-empty">최근 검색어가 없습니다.</p></div><div class="search-popular-column"><div class="search-panel-heading"><h2>인기 검색어</h2></div><ol class="search-popular-list"></ol></div>';
 document.body.append(panel);
 input.setAttribute("aria-controls",panel.id);input.setAttribute("aria-expanded","false");input.autocomplete="off";
 function persist(){try{localStorage.setItem(key,JSON.stringify(history));}catch{}}
 function choose(word){input.value=word;open();}
 function remember(word){history=[word,...history.filter(x=>x!==word)].slice(0,10);persist();render();}
 function render(){const list=panel.querySelector(".search-history-list");list.replaceChildren();history.forEach(word=>{const li=document.createElement("li"), pick=document.createElement("button"), del=document.createElement("button");pick.type=del.type="button";pick.className="search-word";pick.textContent=word;pick.addEventListener("click",()=>choose(word));del.className="search-delete";del.textContent="×";del.setAttribute("aria-label",word+" 삭제");del.addEventListener("click",()=>{history=history.filter(x=>x!==word);persist();render();});li.append(pick,del);list.append(li);});panel.querySelector(".search-history-empty").hidden=history.length>0;}
 popular.forEach(([word,count],i)=>{const li=document.createElement("li"),btn=document.createElement("button");btn.type="button";btn.innerHTML='<span class="search-rank"></span><span class="search-word"></span><span class="search-count"></span>';btn.children[0].textContent=(i+1)+".";btn.children[1].textContent=word;btn.children[2].textContent=count;btn.addEventListener("click",()=>choose(word));li.append(btn);panel.querySelector(".search-popular-list").append(li);});
 function position(){if(panel.hidden)return;const r=form.getBoundingClientRect();if(!r.width||!r.height){close();return;}const w=Math.min(560,window.innerWidth-32);panel.style.width=w+"px";panel.style.left=Math.max(16,Math.min(window.innerWidth-w-16,r.left+r.width/2-w/2))+"px";panel.style.top=(r.bottom+12)+"px";}
 function open(){panel.hidden=false;input.setAttribute("aria-expanded","true");position();}
 function close(){panel.hidden=true;input.setAttribute("aria-expanded","false");}
 input.addEventListener("focus",open);input.addEventListener("click",open);
 form.addEventListener("submit",e=>{e.preventDefault();const word=input.value.trim();if(word)remember(word);open();});
 document.addEventListener("pointerdown",e=>{if(!panel.contains(e.target)&&!form.contains(e.target)&&!mobile?.contains(e.target))close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)close();});
 if(mobile)mobile.addEventListener("click",()=>{requestAnimationFrame(()=>{if(!form.classList.contains("mobile-search-open")&&mobile.getAttribute("aria-expanded")!=="true"){if(!panel.hidden){close();return;}form.classList.add("mobile-search-open");mobile.setAttribute("aria-expanded","true");input.focus();}else if(form.classList.contains("mobile-search-open"))open();else close();});});
 window.addEventListener("resize",position);window.addEventListener("scroll",position,{passive:true});
 render();
});
