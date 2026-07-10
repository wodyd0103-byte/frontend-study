# 웹 프론트엔드 기초 — 학습 기록

HTML → CSS → JavaScript 프론트엔드 기초 과정(총 13일)의 강의 노트와 일자별 실습 코드입니다.

## 📚 강의 노트

| 강 | 노트 | 핵심 키워드 |
|----|------|------------|
| 1강 | [HTML 기초](notes/01_HTML기초_정리.md) | 개발환경 · 문서 구조 · 시맨틱 태그 |
| 2강 | [CSS 기초](notes/02_CSS기초_정리.md) | 선택자 · 박스 모델 · 단위 · display |
| 3강 | [CSS 심화](notes/03_CSS심화_정리.md) | Flexbox · Grid · position · 반응형 |
| 4강 | [CSS 인터랙션](notes/04_CSS인터랙션_정리.md) | transition · transform · 드롭다운 · keyframes |
| 5강 | [JS 기초](notes/05_JS기초_정리.md) | 변수 · 조건문 · 함수 · querySelector · 이벤트 |
| 6강 | [JS 심화](notes/06_JS심화_정리.md) | DOM 조작 · 이벤트 위임 · matchMedia · 웹 컴포넌트 |
| 7강 | [배열 메서드 · 달력 · json-server](notes/07_배열객체달력json-server_정리.md) | map · filter · find · Date · 달력 · json-server |

## 🛠 일자별 실습 (DAY1 ~ DAY5)

각 DAY 폴더는 그날 수업이 끝난 시점의 프로젝트 스냅샷입니다 (`kopo14-project/src` 아래 html / css / js).

| 폴더 | 수업일 | 주요 실습 |
|------|--------|----------|
| `DAY1/` | 1~2강 | 자기소개 카드 · 시맨틱 포트폴리오 · 폼 · 표 |
| `DAY2/` | 2~3강 | 문의하기 폼 · KBO 순위표 · 반응형 포트폴리오 |
| `DAY3/` | 3~4강 | 드롭다운 · 카드 호버 · 이미지 줌 오버레이 · Font Awesome · 미니 갤러리 · 한 페이지 사이트 |
| `DAY4/` | 5강 | 메뉴판 · 계산기 · 윈도우 계산기 ver2 · 카드 추가(DOM 삽입) |
| `DAY5/` | 6강 | 투두 리스트 · JS 클릭 드롭다운 · 웹 컴포넌트(MyHeader/MyFooter) · 계산기 ver3 |
| `DAY6/` | 7강 | 달력 2종(확장판: 오늘·주말·달 이동) · 배열 메서드 연습 · MyCard 컴포넌트 · localStorage · json-server(db.json) |

## ⭐ 하이라이트

- **계산기 ver1 → ver3 발전 과정** — 기본 사칙연산(`DAY4/calculator`)에서 시작해, 버튼식 상태 머신(`DAY4/calculator_ver2`)을 거쳐, 부동소수점 오차 보정·자릿수 제한·에러 상태·연속 `=` 지원까지 갖춘 완성형(`DAY5/calculator_ver3`)으로 발전
- **투두 리스트** (`DAY5/todo`) — 이벤트 위임 · 완료/전체 카운터 · 완료만 삭제 · Enter 입력 · 빈 목록 안내
- **웹 컴포넌트** (`DAY5/MyHeader.js`) — `customElements`로 여러 페이지가 공유하는 헤더/푸터 구현

## 실행 방법

VS Code에서 폴더를 열고 Live Server 확장으로 각 DAY의 `kopo14-project/src/index.html`을 실행합니다.
