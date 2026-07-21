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
| 8강 | [비동기 · fetch](notes/08_비동기fetch_정리.md) | localStorage · async/await · fetch CRUD · 정규식 · 모달 · Swiper |
| 9강 | [React 기초](notes/09_React기초_정리.md) | 컴포넌트 · JSX · props · useState · Vite · TypeScript |
| 10강 | [React 심화 (진행 중 ~18p)](notes/10_React심화_정리.md) | 조건부 렌더링 · 리스트/map/key · (예정: useEffect · CRUD · Router) |

## 🛠 일자별 실습 (DAY1 ~ DAY7)

각 DAY 폴더는 그날 수업이 끝난 시점의 프로젝트 스냅샷입니다 (`kopo14-project/src` 아래 html / css / js).

| 폴더 | 수업일 | 주요 실습 |
|------|--------|----------|
| `DAY1/` | 1~2강 | 자기소개 카드 · 시맨틱 포트폴리오 · 폼 · 표 |
| `DAY2/` | 2~3강 | 문의하기 폼 · KBO 순위표 · 반응형 포트폴리오 |
| `DAY3/` | 3~4강 | 드롭다운 · 카드 호버 · 이미지 줌 오버레이 · Font Awesome · 미니 갤러리 · 한 페이지 사이트 |
| `DAY4/` | 5강 | 메뉴판 · 계산기 · 윈도우 계산기 ver2 · 카드 추가(DOM 삽입) |
| `DAY5/` | 6강 | 투두 리스트 · JS 클릭 드롭다운 · 웹 컴포넌트(MyHeader/MyFooter) · 계산기 ver3 |
| `DAY6/` | 7강 | 달력 2종(확장판: 오늘·주말·달 이동) · 배열 메서드 연습 · MyCard 컴포넌트 · localStorage · json-server(db.json) |
| `DAY7/` | 8강 | fetch CRUD(users) · 게시판 CRUD(도전과제, 수정 모드 포함) · 정규식 검증 · 모달 · Swiper 슬라이더 |

## ⚛️ React 실습 (React/kopo14-app)

9~10강부터는 DAY 스냅샷 대신 Vite + React 19 + TypeScript 프로젝트 하나(`React/kopo14-app`)에서 실습을 진행합니다. App.tsx가 섹션별 쇼케이스로 구성되어 한 화면에서 모든 실습을 확인할 수 있습니다.

| 섹션 | 컴포넌트 | 내용 |
|------|----------|------|
| 9-1 | Card · CardPractice | props(interface) 재사용 카드 · ★ 난이도 |
| 9-2 | MenuCard · Menu | string/number/boolean props + 삼항 |
| 9-3 | Counter | useState 카운터 (+1/초기화/-1) |
| 9-4 | Preview | 제어 컴포넌트 input · 글자 수 |
| 10-1 | Toggle | 조건부 렌더링 (삼항 + &&) |
| 10-2 | TodoAdd | 상태 배열 + map/key + 새 배열 교체 |
| 10-3 | TodoAdd2 | 자율과제 완주 — 삭제(filter) · 완료 토글(map+spread) · 완료 카운터 |

실행: `cd React/kopo14-app && yarn && yarn dev`

## 🏨 HOTELPROJECT — 호텔 예약 사이트 (2026.07.13 ~ 07.16)

피그마 시안(호텔예약 데스크톱/모바일) 기반 산출물 프로젝트. 메인(HOME) + 예약안내(요금표) + 실시간예약(객실 선택 → 객실별 달력 예약 → 예약자 등록 폼 → POST /reservation)의 **예약 흐름 전체를 바닐라 JS로 완성**했습니다. 직접 구현한 달력(시즌·주중/주말/휴일 요금, 예약된 날짜 차단, 5박 제한), 웹 컴포넌트 헤더/푸터, localStorage 페이지 간 상태 전달, 모바일 반응형까지 포함합니다.

👉 구조도·페이지 흐름·핵심 구현 설명: [HOTELPROJECT/README.md](HOTELPROJECT/README.md)

## ⭐ 하이라이트

- **계산기 ver1 → ver3 발전 과정** — 기본 사칙연산(`DAY4/calculator`)에서 시작해, 버튼식 상태 머신(`DAY4/calculator_ver2`)을 거쳐, 부동소수점 오차 보정·자릿수 제한·에러 상태·연속 `=` 지원까지 갖춘 완성형(`DAY5/calculator_ver3`)으로 발전
- **투두 리스트** (`DAY5/todo`) — 이벤트 위임 · 완료/전체 카운터 · 완료만 삭제 · Enter 입력 · 빈 목록 안내
- **웹 컴포넌트** (`DAY5/MyHeader.js`) — `customElements`로 여러 페이지가 공유하는 헤더/푸터 구현

## 실행 방법

VS Code에서 폴더를 열고 Live Server 확장으로 각 DAY의 `kopo14-project/src/index.html`을 실행합니다.
