# AI_CODING_GUIDE.md

## 1. 문서 목적

이 문서는 firstclass 저장소의 **현재 버거킹 로그인 UI 코드**를 기준으로, 이후 다른 브랜드의 로그인 UI를 추가하거나 수정할 때 AI가 따라야 할 코딩 기준을 정리한 문서이다.

목표는 기존 버거킹 코드를 새로운 방식으로 다시 만드는 것이 아니라,

- 현재 HTML 구조
- 현재 CSS 작성 방식
- 현재 폴더 및 파일 구조
- 현재 네이밍 방식
- 현재 수업에서 사용한 수준

을 최대한 유지하면서 **새로운 브랜드의 디자인과 콘텐츠만 자연스럽게 적용하는 것**이다.

> 기준 파일: Burgerking/login.html, css/default.css, font/css/*.css

---

## 2. 현재 프로젝트 기본 구조

현재 저장소의 주요 구조는 다음과 같다.

~~~text
firstclass/
├─ index.html
├─ css/
│  └─ default.css
├─ font/
│  ├─ BKBulMatPro-Bold.woff
│  ├─ PretendardVariable.woff2
│  ├─ SDGothicNeoRound-eMd.woff
│  ├─ SDGothicNeoRound-gBd.woff
│  ├─ SDGothicNeoRound-hEb.woff
│  └─ css/
│     ├─ bkbulmatpro.css
│     ├─ pretendardvariable.css
│     └─ sdgothicneo.css
└─ Burgerking/
   ├─ login.html
   └─ img/
      ├─ Back_icon.svg
      ├─ Close_icon.svg
      ├─ Eye_icon.svg
      ├─ Kakao_logo_icon.svg
      ├─ Naver_logo_icon.svg
      ├─ apple_logo_icon.svg
      ├─ Samsung_logo_icon.svg
      ├─ checkbox_active.svg
      ├─ checkbox_disabled.svg
      └─ ...
~~~

새 브랜드 화면을 만들 때 먼저 **기존 파일 위치와 이미지 경로를 확인**한다.

임의로 새로운 폴더 구조를 만들거나 기존 파일 구조를 React, Vue, Tailwind 등의 방식으로 변경하지 않는다.

---

## 3. 현재 버거킹 로그인 HTML 구조

현재 Burgerking/login.html은 다음과 같은 구조를 사용한다.

~~~html
<div id="wrap">
    <header>
        <h1>로그인</h1>
        <button class="prev_btn">
            <span class="sr-only">이전버튼</span>
        </button>
    </header>

    <main>
        <h2 class="title">
            <span>안녕하세요:)</span>
            <span>버거킹입니다.</span>
        </h2>

        <form action="">
            <fieldset>
                <legend class="sr-only">로그인화면</legend>

                <label for="email" class="email">이메일 로그인</label>

                <div class="input_box">
                    <input type="email" ...>
                </div>

                <div class="input_box rela">
                    <input type="password" ...>
                    <button type="button" class="pw_btn">
                        <span class="sr-only">비밀번호 보기</span>
                    </button>
                </div>

                <div class="login_option">
                    <label>
                        <input type="checkbox" ...>
                        <span>자동로그인</span>
                    </label>

                    <label>
                        <input type="checkbox" ...>
                        <span>아이디저장</span>
                    </label>
                </div>

                <button type="submit" class="login_btn">로그인</button>
            </fieldset>
        </form>

        <div class="login_link">
            <a href="#">아이디 찾기</a>
            <a href="#">비밀번호 재설정</a>
            <a href="#">회원가입</a>
        </div>

        <div class="sns_login">
            <p>SNS로 간편하게 로그인</p>

            <div class="sns_list">
                <a href="#"><span class="sr-only">카카오로그인</span></a>
                <a href="#"><span class="sr-only">네이버로그인</span></a>
                <a href="#"><span class="sr-only">애플로그인</span></a>
                <a href="#"><span class="sr-only">삼성카드로그인</span></a>
            </div>
        </div>
    </main>
</div>
~~~

### 구조 원칙

새 화면에서도 다음 흐름을 우선적으로 유지한다.

~~~text
#wrap
 ├─ header
 │   ├─ h1
 │   └─ 기능 버튼
 │
 └─ main
     ├─ 화면 제목
     ├─ form
     │   └─ fieldset
     │       ├─ 입력 영역
     │       ├─ 옵션
     │       └─ submit button
     │
     ├─ 관련 링크
     └─ SNS 또는 추가 로그인 영역
~~~

단, 새로운 브랜드의 디자인에서 콘텐츠 의미가 달라지면 HTML 구조도 의미에 맞게 조정한다.

**모양이 같다는 이유만으로 기존 태그를 복사하지 않는다.**

---

## 4. HTML 작성 기준

### 4-1. 기본 구조

새 HTML 파일도 기본적으로 다음 구조를 사용한다.

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ...
</head>
<body>

    <div id="wrap">
        <header>
            ...
        </header>

        <main>
            ...
        </main>
    </div>

</body>
</html>
~~~

한국어 화면이므로 lang="ko"를 사용한다.

---

### 4-2. 의미에 맞는 HTML 사용

현재 코드에서 사용하고 있는 기본 태그를 우선한다.

| 목적 | 우선 사용하는 요소 |
|---|---|
| 페이지 상단 | header |
| 핵심 콘텐츠 | main |
| 제목 | h1~h6 |
| 로그인 입력 | form |
| 입력 그룹 | fieldset |
| 그룹 제목 | legend |
| 입력 이름 | label |
| 텍스트 입력 | input |
| 기능 실행 | button |
| 다른 페이지/화면 이동 | a |
| 반복 콘텐츠 | 필요하면 ul > li |
| 단순 레이아웃 그룹 | div |

div는 의미가 없는 단순 그룹화가 필요할 때 사용한다.

---

### 4-3. 로그인 입력

이메일이나 아이디 입력은 실제 input을 사용한다.

~~~html
<label for="email">이메일</label>
<input
    type="email"
    id="email"
    name="email"
    placeholder="이메일을 입력해주세요."
>
~~~

비밀번호는 type="password"를 사용한다.

~~~html
<input
    type="password"
    id="password"
    name="password"
    placeholder="비밀번호를 입력해주세요."
>
~~~

입력창 옆의 눈 아이콘처럼 **페이지 안에서 기능을 실행하는 요소는 button**을 사용한다.

~~~html
<button type="button" class="pw_btn">
    <span class="sr-only">비밀번호 보기</span>
</button>
~~~

다른 페이지나 기능으로 이동하는 링크라면 a를 사용한다.

---

## 5. 제목 작성 기준

현재 버거킹 코드는 다음과 같이 제목을 사용한다.

~~~html
<header>
    <h1>로그인</h1>
</header>

<main>
    <h2 class="title">
        ...
    </h2>
</main>
~~~

새 브랜드에서도 **글자 크기 때문에 h 태그를 선택하지 않는다.**

- h1: 현재 페이지를 대표하는 제목
- h2: 페이지 안의 주요 콘텐츠 제목
- h3: h2 안의 하위 주제

즉, 새로운 브랜드의 제목이 크다고 해서 무조건 h1을 사용하는 것은 아니다.

---

## 6. 숨김 텍스트

현재 프로젝트에서는 화면에는 보이지 않지만 스크린리더가 읽을 수 있는 텍스트에 sr-only를 사용한다.

~~~html
<span class="sr-only">비밀번호 보기</span>
~~~

default.css에 이미 다음 유틸리티가 정의되어 있으므로 새로운 숨김 클래스를 별도로 만들지 않는다.

~~~css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
~~~

---

## 7. CSS 기본 기준

현재 버거킹 화면은 default.css를 공통 reset으로 사용하고, 화면별 디자인은 login.html의 style 안에서 작성한다.

현재 구조:

~~~html
<link rel="stylesheet" href="../css/default.css">

<style>
    /* 화면별 CSS */
</style>
~~~

새 화면을 만들 때도 기존 프로젝트의 학습 흐름을 우선한다.

### 기본 순서

1. default.css 연결
2. 필요한 폰트 연결
3. :root에서 색상/폰트 변수 정의
4. 전체 화면 구조 작성
5. 레이아웃 작성
6. 입력 요소 스타일
7. 버튼 스타일
8. 링크/SNS 영역 스타일
9. 반응형 확인

---

## 8. CSS 변수

현재 버거킹 코드에서는 :root에 브랜드 색상과 폰트를 변수로 관리한다.

예:

~~~css
:root {
    --font: "sandoll GoothicNEORound", sans-serif;
    --font-pre: "Pretandard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;

    --primary: #512314;
    --focus: #D62302;
    --baseBolder: #D9CFC6;
    --InputBg: #FFFCF9;
    --errorColor: #C54734;
    --placeholder: #EBE6E2;
    --text: #777853;
    --bg: #F4EBDC;
    --button: #E9DDCD;
}
~~~

새 브랜드를 만들 때는 **버거킹의 색상값을 그대로 복사하지 않는다.**

새 브랜드의 디자인을 확인한 뒤 해당 브랜드에 맞는 값을 변수로 정의한다.

예:

~~~css
:root {
    --primary: 새 브랜드의 주요 색상;
    --bg: 새 브랜드의 배경색;
    --text: 새 브랜드의 본문색;
}
~~~

색상 이름은 실제 역할을 나타내도록 작성한다.

---

## 9. 레이아웃 작성 기준

현재 버거킹 화면은 모바일 화면을 기준으로 작성하고 #wrap의 최대/최소 폭을 설정한다.

~~~css
#wrap {
    width: 100%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvb;
    margin: 0 auto;
}
~~~

레이아웃은 우선 현재 프로젝트에서 사용한 기본 CSS를 활용한다.

### 우선 사용할 방법

- display: flex
- justify-content
- align-items
- gap
- padding
- margin
- position: relative
- position: absolute

새로운 라이브러리나 복잡한 레이아웃 기술을 먼저 사용하지 않는다.

---

## 10. position 사용 기준

현재 버거킹 코드에서는 부모를 position: relative로 만들고 버튼을 position: absolute로 배치하는 방식이 사용된다.

예:

~~~css
header {
    position: relative;
}

.prev_btn {
    position: absolute;
    left: 0;
}
~~~

비밀번호 보기 버튼도 입력 영역을 기준으로 위치를 잡는다.

~~~css
.input_box.rela {
    position: relative;
}

.pw_btn {
    position: absolute;
    right: 20px;
    bottom: 12px;
}
~~~

새 화면에서도 **absolute를 먼저 사용하는 것이 아니라, 일반적인 흐름이나 flex로 해결할 수 있는지 먼저 확인한다.**

absolute가 필요하다면 기준이 되는 부모에 position: relative를 설정한다.

---

## 11. 이미지 경로

버거킹 로그인 화면의 이미지는 Burgerking/img/에 있다.

~~~css
.prev_btn {
    background: url(img/Back_icon.svg)
        no-repeat center / auto;
}
~~~

새 브랜드는 브랜드별 이미지 폴더를 분리하는 것을 우선한다.

예:

~~~text
OtherBrand/
├─ login.html
└─ img/
   ├─ logo.svg
   ├─ eye.svg
   └─ ...
~~~

이미지가 존재하지 않는 상태에서 임의의 파일명이나 실제 경로를 만들어내지 않는다.

---

## 12. 폰트

현재 프로젝트에는 다음과 같은 폰트가 연결되어 있다.

- Pretendard Variable
- SDGothicNeoRound
- BKR

버거킹 전용 폰트는 다른 브랜드 화면에 그대로 사용하지 않는다.

새 브랜드의 실제 폰트를 사용할 경우:

1. 폰트 파일이 실제로 존재하는지 확인한다.
2. @font-face 연결 상태를 확인한다.
3. CSS에서 정확한 font-family 이름을 확인한다.
4. 사용할 수 없는 폰트는 임의로 존재한다고 가정하지 않는다.

---

## 13. 클래스 네이밍

현재 버거킹 코드에서는 의미가 비교적 직접적으로 드러나는 클래스명을 사용한다.

예:

~~~text
.title
.input_box
.rela
.login_option
.login_btn
.login_link
.sns_login
.sns_list
.pw_btn
.prev_btn
~~~

새 화면에서도 다음 원칙을 사용한다.

### 좋은 예

~~~text
.login_btn
.password_box
.social_login
.login_option
.close_btn
~~~

### 피해야 할 예

~~~text
.box1
.box2
.red
.big
.left
.test
~~~

클래스명은 **모양보다 역할**을 기준으로 정한다.

---

## 14. 기존 코드 재사용 기준

새 브랜드 로그인 UI를 만들 때 버거킹 코드 전체를 복사한 뒤 색상만 바꾸는 방식은 기본 방법으로 사용하지 않는다.

먼저 다음을 구분한다.

### 유지할 것

- 기본 HTML 구조
- header / main 구조
- 로그인 form의 기본 방식
- fieldset / legend
- input / label / button 사용 방식
- sr-only
- reset CSS
- flex를 이용한 기본 레이아웃 방식
- 현재 프로젝트의 파일 구조

### 브랜드에 따라 변경할 것

- 로고
- 색상
- 폰트
- 제목과 문구
- 입력창 디자인
- 버튼 디자인
- SNS 로그인 종류
- 아이콘
- 배경
- 간격
- 모서리
- 브랜드별 UI 요소

즉,

**구조와 코딩 방법은 유지하되 디자인과 콘텐츠는 새 브랜드에 맞게 변경한다.**

---

## 15. 새 화면 제작 작업 순서

AI는 새 브랜드 로그인 UI를 만들 때 다음 순서를 따른다.

### STEP 1. 기존 코드 확인

먼저 다음 파일을 확인한다.

~~~text
Burgerking/login.html
css/default.css
font/css/*.css
~~~

필요한 경우 기존 이미지 폴더도 확인한다.

---

### STEP 2. 새 디자인 분석

Figma 또는 이미지에서 다음을 먼저 확인한다.

- 페이지 제목
- 상단 버튼
- 메인 제목
- 설명 문구
- 입력 항목
- 체크박스/옵션
- 로그인 버튼
- 관련 링크
- SNS 로그인
- 로고
- 아이콘
- 색상
- 폰트
- 화면 폭
- 간격

화면을 보고 바로 코드를 작성하지 않는다.

---

### STEP 3. HTML 구조 결정

디자인을 콘텐츠 의미로 바꾼다.

예:

~~~text
상단 제목
→ header + h1

로그인 입력
→ form + fieldset

입력 이름
→ label

텍스트 입력
→ input

로그인 실행
→ button

다른 화면 이동
→ a

반복되는 SNS 목록
→ 필요하면 ul + li 또는 현재 프로젝트의 구조
~~~

---

### STEP 4. HTML 먼저 작성

CSS를 작성하기 전에 HTML 구조가 화면의 콘텐츠와 기능을 표현하는지 확인한다.

특히 다음을 확인한다.

- h1이 무엇인지
- form이 어디까지인지
- label과 input이 연결되어 있는지
- button과 a를 올바르게 구분했는지
- 장식용 요소와 실제 콘텐츠를 구분했는지

---

### STEP 5. CSS 작성

HTML 구조가 정해진 뒤 CSS를 작성한다.

작성 순서는 가능한 한 다음을 따른다.

~~~text
전체 화면
→ header
→ main
→ 제목
→ form
→ input
→ option
→ button
→ link
→ SNS
→ 반응형
~~~

---

### STEP 6. 실제 실행 확인

코드 작성 후 다음을 확인한다.

- 이미지가 정상적으로 나오는가?
- 폰트가 적용되는가?
- CSS 파일 경로가 맞는가?
- 화면이 가로로 넘치지 않는가?
- 버튼 위치가 맞는가?
- input 크기가 맞는가?
- 모바일 화면에서 문제가 없는가?

문제가 생기면 먼저 **코드 문제인지 경로 문제인지 파일 저장 문제인지** 구분한다.

---

## 16. AI가 코드를 수정할 때의 원칙

사용자가 이미 작성한 코드가 있다면 처음부터 전체 코드를 새로 작성하지 않는다.

먼저 다음을 확인한다.

1. 현재 코드에서 잘 작성된 부분
2. 실제 문제가 있는 부분
3. 문제가 발생하는 이유
4. 수정해야 할 위치
5. 사용자가 직접 수정할 수 있는지

사용자가 직접 수정해볼 수 있는 문제라면 먼저 **수정 위치와 힌트**를 제공한다.

완성 코드가 필요한 경우에만 수정된 전체 또는 일부 코드를 제공한다.

---

## 17. AI가 절대로 하지 말아야 할 것

### 17-1. 사용자의 기존 코드를 이유 없이 전면 재작성하지 않는다.

현재 코드가 학습 과정의 결과이므로 코드 스타일을 존중한다.

### 17-2. 새로운 프레임워크를 임의로 사용하지 않는다.

다음 기술을 요청받지 않았다면 먼저 사용하지 않는다.

- React
- Vue
- Tailwind
- Bootstrap
- SCSS
- 기타 UI 라이브러리

현재 프로젝트는 HTML/CSS 중심의 학습 프로젝트이다.

### 17-3. 존재하지 않는 이미지 경로를 만들지 않는다.

~~~css
background: url(img/new-logo.svg);
~~~

처럼 실제 파일이 확인되지 않은 상태에서 파일이 존재한다고 가정하지 않는다.

### 17-4. 존재하지 않는 폰트를 만들어내지 않는다.

실제 폰트 파일과 @font-face 연결을 먼저 확인한다.

### 17-5. 디자인을 보지 않고 임의로 UI를 결정하지 않는다.

Figma 또는 참고 이미지가 있다면 먼저 디자인의 구조와 콘텐츠를 분석한다.

---

## 18. 현재 코드에서 확인된 주의사항

현재 버거킹 코드에는 향후 수정할 때 확인해야 할 부분이 있다.

### 18-1. Pretendard CSS 파일명

현재 login.html에는 다음 경로가 작성되어 있다.

~~~html
<link rel="stylesheet" href="../font/css/pretendard.css">
~~~

하지만 저장소에는 현재 다음 파일이 존재한다.

~~~text
font/css/pretendardvariable.css
~~~

따라서 실제 실행 환경에서 폰트가 적용되지 않는다면 먼저 **파일명과 경로가 일치하는지 확인**한다.

이 문제를 새 브랜드 코드를 작성하면서 임의로 숨기거나 무시하지 않는다.

---

### 18-2. CSS 오타 또는 문법 확인

현재 코드에는 다음과 같이 CSS에서 확인이 필요한 부분이 있다.

~~~css
background: url(img/Back_icon.svg)
no-repeat scroll center/auto;
~~~

또한 다음과 같은 표현도 있다.

~~~css
.login_link a {
    display: inline flex;
}
~~~

새 코드를 작성할 때는 기존 코드의 표현을 무조건 복사하지 말고 **실제로 유효한 CSS인지 확인**한다.

단, 기존 코드를 리팩터링하는 것이 목적이 아니라면 문제를 발견했다고 해서 전체 코드를 임의로 재작성하지 않는다.

---

### 18-3. HTML 속성 중복 확인

현재 코드에는 다음과 같이 checked가 중복되어 있다.

~~~html
<input type="checkbox" checked class="check sr-only" checked>
~~~

새 코드를 작성할 때는 동일한 속성을 불필요하게 반복하지 않는다.

---

## 19. 코드 작성 스타일

현재 프로젝트에서는 들여쓰기를 4칸 기준으로 작성하고 있다.

~~~html
<main>
    <h2 class="title">
        제목
    </h2>

    <form action="">
        ...
    </form>
</main>
~~~

새 코드에서도 읽기 쉬운 들여쓰기를 유지한다.

주석은 필요한 경우에만 작성하고, 주석만 봐도 해당 영역의 역할을 알 수 있도록 한다.

예:

~~~html
<!-- 이메일 로그인 -->
<!-- 비밀번호 -->
<!-- SNS 로그인 -->
~~~

---

## 20. 최종 체크리스트

새 브랜드 로그인 UI를 만들고 나면 다음을 확인한다.

### HTML

- [ ] lang="ko"가 맞는가?
- [ ] h1이 페이지 대표 제목을 나타내는가?
- [ ] header, main의 역할이 명확한가?
- [ ] 로그인 입력은 form 안에 있는가?
- [ ] label과 input이 연결되어 있는가?
- [ ] 기능 실행은 button을 사용하는가?
- [ ] 화면 이동은 a를 사용하는가?
- [ ] 필요한 경우 fieldset과 legend를 사용하는가?
- [ ] 숨겨진 텍스트가 필요한 버튼에 sr-only가 있는가?

### CSS

- [ ] default.css가 연결되어 있는가?
- [ ] 필요한 폰트 파일과 경로가 실제로 존재하는가?
- [ ] 색상과 폰트를 CSS 변수로 관리하는가?
- [ ] flex로 해결할 수 있는 레이아웃을 불필요하게 absolute로 만들지 않았는가?
- [ ] absolute를 사용할 경우 기준 부모가 있는가?
- [ ] 이미지 경로가 실제 파일과 일치하는가?
- [ ] 모바일 화면에서 가로 스크롤이 생기지 않는가?
- [ ] 클래스명이 역할을 설명하는가?

### 프로젝트

- [ ] 기존 폴더 구조를 불필요하게 변경하지 않았는가?
- [ ] 기존 버거킹 코드 스타일을 지나치게 벗어나지 않았는가?
- [ ] 새로운 라이브러리를 임의로 추가하지 않았는가?
- [ ] 사용하지 않는 코드를 복사하지 않았는가?
- [ ] 실제 파일과 존재하지 않는 파일을 구분했는가?

---

## 21. 가장 중요한 원칙

이 프로젝트에서 AI의 역할은 **사용자의 코드를 대신 만드는 것보다 사용자가 기존 코드를 이해하고 새로운 화면에 적용할 수 있도록 돕는 것**이다.

따라서 새로운 브랜드 로그인 UI를 만들 때 다음 기준을 가장 우선한다.

> **버거킹 코드의 구조와 작성 방식을 학습 기준으로 유지하고, 새로운 브랜드의 콘텐츠와 디자인만 필요한 만큼 변경한다.**

그리고 코드가 기존 방식과 달라져야 하는 경우에는 단순히 다른 코드를 제시하지 말고,

**왜 기존 방식으로 해결하기 어려운지 → 어떤 방법이 필요한지 → 그 방법이 기존 코드와 어떻게 연결되는지**

를 먼저 설명한다.
