/* All shopping sections stay visible; legacy menu links scroll to their sections. */
document.addEventListener('DOMContentLoaded',()=>{
 const allowed=new Set(['wishlist','orders','history','coupons','points']);
 const go=()=>{const key=location.hash.slice(1)||new URLSearchParams(location.search).get('menu');if(!allowed.has(key))return;const target=document.getElementById(key);if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));};
 go();window.addEventListener('hashchange',go);window.addEventListener('popstate',go);
});
