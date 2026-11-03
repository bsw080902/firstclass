document.addEventListener("DOMContentLoaded",()=>{
  // 탭은 페이지 내부 링크로만 동작하며, 클릭 후 선택 상태를 고정하지 않습니다.
  const form=document.querySelector("#support-form");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    document.querySelector("#support-message").textContent="학습용 화면이므로 문의가 실제로 전송되지는 않습니다.";
  });
});
