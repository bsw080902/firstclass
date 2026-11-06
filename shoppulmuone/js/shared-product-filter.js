/* BEST · NEW · DAILY: category page filter reused without changing existing product cards. */
document.addEventListener('DOMContentLoaded', () => {
 const configs = [
  {selector: '#best-products', type:'best'},
  {selector: '.new-list-grid', type:'new'},
  ...Array.from(document.querySelectorAll('.daily-product-grid')).map((_,i)=>({selector:'.daily-product-grid',index:i,type:'daily'}))
 ];
 const sections = [
  ['혜택','benefit',[['bundle','골라담아 할인'],['free','무료배송'],['discount','할인']]],
  ['브랜드','brand',[['풀무원식품','풀무원식품'],['올가','올가'],['풀무원지구식단','풀무원지구식단']]],
  ['인증제품','cert',[['gap','GAP농산물우수관리'],['haccp','HACCP식품의약품안전처'],['haccp-integrated','HACCP안전관리통합인증'],['animal','동물복지'],['pesticide','무항생제축산물']]],
  ['보관방법','storage',[['frozen','냉동'],['chilled','냉장'],['room','실온']]]
 ];
 function createFilter() {
  const aside=document.createElement('aside');aside.className='category-filter';aside.setAttribute('aria-label','상품 상세 필터');
  const form=document.createElement('form');form.className='shared-filter-form';form.noValidate=true;
  const top=document.createElement('div');top.className='category-filter-top';
  top.innerHTML='<h2>필터</h2><button type="reset" class="category-filter-reset">초기화</button>';form.append(top);
  sections.forEach(([title,name,choices])=>{
   const details=document.createElement('details');details.className='category-filter-section';details.open=true;
   const summary=document.createElement('summary');summary.textContent=title;details.append(summary);
   const options=document.createElement('div');options.className='category-filter-options';
   choices.forEach(([value,label])=>{
    const item=document.createElement('label'),checkbox=document.createElement('input'),span=document.createElement('span');
    checkbox.type='checkbox';checkbox.name=name;checkbox.value=value;span.textContent=label;
    item.append(checkbox,span);options.append(item);
   });
   details.append(options);form.append(details);
  });
  const price=document.createElement('details');price.className='category-filter-section';price.open=true;
  price.innerHTML='<summary>가격</summary><div class="category-price-filter"><label class="sr-only">최소가격<input name="minPrice" type="number" min="0" inputmode="numeric" placeholder="최소가격"></label><span aria-hidden="true">~</span><label class="sr-only">최대가격<input name="maxPrice" type="number" min="0" inputmode="numeric" placeholder="최대가격"></label><button type="submit" aria-label="가격 필터 적용"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="7.3"/><path d="m16 16 5 5"/></svg></button></div>';
  // Accessible labels are visually hidden without hiding the number inputs.
  price.querySelectorAll('.sr-only').forEach(label=>{const input=label.querySelector('input');label.before(input);label.remove();});
  price.querySelectorAll('input').forEach(input=>input.setAttribute('aria-label',input.name==='minPrice'?'최소가격':'최대가격'));
  form.append(price);
  const msg=document.createElement('p');msg.className='category-filter-message';msg.setAttribute('role','status');msg.setAttribute('aria-live','polite');form.append(msg);
  const empty=document.createElement('p');empty.className='shared-filter-empty';empty.hidden=true;empty.textContent='선택한 조건에 맞는 상품이 없습니다. 확인되지 않은 상품 정보는 필터 결과에 포함되지 않습니다.';
  aside.append(form);return {aside,form,msg,empty};
 }
 function setup(grid,config) {
  if(!grid || grid.closest('.shared-filter-layout'))return;
  const parent=grid.parentElement;
  const layout=document.createElement('div');layout.className='shared-filter-layout catalog-filter-scope';
  const content=document.createElement('div');content.className='shared-results-content';
  const ui=createFilter();
  if(config.type==='best'){
   const head=parent.querySelector('.best-results-head');
   if(head)content.append(head);
  }else if(config.type==='new'){
   const head=parent.querySelector('.new-all-heading');
   if(head)content.append(head);
  }
  grid.before(layout);content.append(grid,ui.empty);layout.append(ui.aside,content);
  const checkboxSelection=name=>Array.from(ui.form.querySelectorAll('input[name="'+name+'"]:checked')).map(i=>i.value);
  const getCards=()=>Array.from(grid.children).filter(el=>el.matches('article'));
  const cardValue=(card,selector)=>card.querySelector(selector)?.textContent?.trim()||'';
  let scheduled=false;
  function apply(){
   scheduled=false;
   const brands=checkboxSelection('brand'),benefits=checkboxSelection('benefit'),certs=checkboxSelection('cert'),storage=checkboxSelection('storage');
   const minRaw=ui.form.elements.minPrice.value,maxRaw=ui.form.elements.maxPrice.value;
   const min=minRaw===''?0:Number(minRaw),max=maxRaw===''?Infinity:Number(maxRaw);
   if(min>max){ui.msg.textContent='최소가격은 최대가격보다 클 수 없습니다.';return}
   const unsupported=benefits.some(x=>x!=='discount')||certs.length>0||storage.length>0;
   ui.msg.textContent=unsupported?'일부 혜택·인증·보관 정보는 상품 데이터가 등록되지 않아 결과에 표시되지 않을 수 있습니다.':'';
   const cards=getCards();
   let visible=0;
   cards.forEach(card=>{
    const brand=cardValue(card,config.type==='new'?'.new-list-info > p:first-child':'.best-product-brand');
    const priceText=cardValue(card,config.type==='new'?'.new-list-price strong':'.best-product-price strong');
    const amount=Number(priceText.replace(/[^0-9]/g,''))||0;
    const discount=cardValue(card,config.type==='new'?'.new-list-discount':'.best-product-discount');
    const metadata=card.dataset;
    const ok=(!brands.length||brands.includes(brand))
     &&(!benefits.includes('discount')||!!discount)
     &&(!benefits.includes('bundle')||(metadata.benefits||'').split(',').includes('bundle'))
     &&(!benefits.includes('free')||(metadata.benefits||'').split(',').includes('free'))
     &&(!certs.length||certs.some(x=>(metadata.certifications||'').split(',').includes(x)))
     &&(!storage.length||storage.includes(metadata.storage||''))
     &&(!(minRaw!==''||maxRaw!=='')||(amount>0&&amount>=min&&amount<=max));
    if(card.hidden===ok)card.hidden=!ok;
    if(ok)visible++;
   });
   ui.empty.hidden=visible!==0;
   grid.dispatchEvent(new CustomEvent('product-filter-change'));
  }
  const schedule=()=>{if(!scheduled){scheduled=true;queueMicrotask(apply)}};
  ui.form.addEventListener('change',schedule);
  ui.form.addEventListener('submit',e=>{e.preventDefault();schedule()});
  ui.form.addEventListener('reset',()=>setTimeout(schedule,0));
  new MutationObserver(schedule).observe(grid,{childList:true});
  apply();
 }
 configs.forEach(c=>{
  const grids=document.querySelectorAll(c.selector);
  if(grids.length)setup(grids[c.index||0],c);
 });
});
