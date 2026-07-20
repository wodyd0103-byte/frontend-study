# 🏨 HOTELPROJECT — 호텔 예약 사이트

프론트엔드 기초 과정 산출물 프로젝트. 피그마 시안(데스크톱/모바일)을 기준으로 HTML · CSS · JavaScript(바닐라)만으로 호텔 홈페이지와 **실시간 예약 흐름 전체**를 구현했습니다. 백엔드는 json-server(`db.json`)를 사용합니다.

- 진행 기간: 2026-07-13 ~ 07-16 (8강 fetch 수업 직후 과제·실습 주간)
- 사용 기술: HTML5 · CSS3(반응형) · Vanilla JS · Web Components(customElements) · Fetch API · Swiper 12(CDN) · json-server · localStorage

## 📁 폴더 구조

```
HOTELPROJECT/
└── src/
    ├── html/
    │   ├── HOME.html             메인 — 히어로 슬라이더 · ROOMS · EVENT · BEST HOTEL
    │   ├── RESERVATION1.html     예약안내 — 객실·시즌별 요금표 + 안내/환불 규정
    │   ├── RESERVATION2.html     실시간예약 — 객실 선택 (4개 밴드)
    │   ├── RESERVATION3.html     STANDARD 예약 상세 (data-room-id="1")
    │   ├── RESERVATION3-2.html   DELUXE 예약 상세 (data-room-id="2")
    │   ├── RESERVATION3-3.html   PREMIUM 예약 상세 (data-room-id="3")
    │   ├── RESERVATION3-4.html   SWEET 예약 상세 (data-room-id="4")
    │   ├── RESERVATION4.html     예약 상세 변형 — 입실/퇴실 날짜 프리셋 데모
    │   └── RESERVATION5.html     예약 등록 — 예약자 정보 입력 폼 + 확인용 달력
    ├── css/
    │   ├── style.css             실제 스타일시트 (1,350줄 · CSS 변수 · 미디어쿼리 5곳)
    │   ├── componenet.css        피그마 CSS 내보내기 (컴포넌트) — 참고용, 링크 안 함
    │   └── Pages.css             피그마 CSS 내보내기 (페이지) — 참고용, 링크 안 함
    ├── js/
    │   ├── Header.js             <my-header> 웹 컴포넌트 — 메뉴 데이터 배열 + 모바일 서브내브
    │   ├── Footer.js             <my-footer> 웹 컴포넌트
    │   ├── HOME.js               ROOMS/EVENT 프리모드 슬라이더 + 객실 이미지 확대 모달
    │   ├── RESERVATION1.js       요금표 렌더 — rooms/price/season 3개 fetch를 Promise.all로
    │   ├── RESERVATION2.js       객실 밴드 렌더 — rooms fetch → 상세 페이지 링크
    │   └── reservation.js        공용 예약 엔진 (547줄) — 달력 · 요금 계산 · 폼 제출
    └── images/                   히어로/객실/이벤트 사진, SNS 아이콘, 배지, TOP 버튼
```

## 🔀 페이지 흐름

```
HOME.html
 └─ 헤더 RESERVATION 메뉴
     ├─ 예약안내  → RESERVATION1.html   (요금표 · 취소/환불 규정)
     └─ 실시간예약 → RESERVATION2.html  (객실 4종 밴드)
                      └─ 객실 클릭 → RESERVATION3 / 3-2 / 3-3 / 3-4
                                      (달력에서 입실·퇴실 선택 + 추가 인원 → 합계 계산)
                                      └─ 예약하기 → localStorage("booking")에 담아
                                          RESERVATION5.html (예약자 정보 입력)
                                          └─ 예약하기 → POST /reservation → 완료 안내 → HOME
```

## 🗄 데이터 (db.json · json-server)

| 컬렉션 | 내용 | 사용처 |
|--------|------|--------|
| `rooms` | 객실 4종 (스탠다드 78㎡ · 디럭스 94㎡ · 프리미엄 105㎡ · 스위트 200㎡), 기준/최대 인원, 설명, 이미지 목록 | R1 요금표 · R2 밴드 · R3 상세 |
| `season` | 비수기(10.01~06.30) · 성수기(07.01~09.30) | 날짜별 요금 판정 |
| `holiday` | 공휴일 20건 | 달력 휴일 표시 · 휴일 요금 |
| `price` | 객실×시즌별 주중/주말/휴일 요금 8건 | 요금표 · 합계 계산 |
| `reservation` | 예약 내역 (예약 완료 시 POST로 추가) | 달력 "예약완료" 날짜 차단 |

## ⚙️ 핵심 구현 포인트

- **공용 예약 엔진 하나로 5개 페이지 처리** — `reservation.js`가 `<body data-room-id="N">`만 읽어 객실별 상세 페이지(3, 3-2~4)와 등록 폼(5)을 모두 구동. 갤러리·달력·요금까지 데이터(db.json) 기반이라 객실이 늘어도 HTML만 복제하면 됨.
- **달력 직접 구현** — 이전/다음 달 이동(과거 달 진입 차단), 입실→퇴실 범위 선택, 예약완료·휴일 날짜 표시 및 선택 차단, 최대 5박 제한(초과 시 안내 오버레이).
- **날짜별 요금 계산** — 시즌 판정(연도 경계를 넘는 비수기 10.01~06.30 처리) × 주중/주말(금·토)/공휴일 단가를 1박씩 합산, 추가 인원 1명당 20% 가산.
- **페이지 간 상태 전달** — 객실 상세에서 선택한 예약 정보를 `localStorage("booking")`로 등록 폼에 넘기고, POST 성공 시 제거 (8강 localStorage + fetch 실습의 실전 적용).
- **웹 컴포넌트 헤더/푸터** — 메뉴를 데이터 배열로 분리한 `<my-header>`. 모바일에서는 호버 드롭다운 대신 현재 섹션이 미리 펼쳐지는 서브내브로 전환.
- **에러 대비** — 모든 fetch에 try/catch, 실패 시 "json-server 실행 확인" 안내 문구 표시. 제출 버튼 중복 클릭 방지(disabled).
- **모바일 반응형** — 요금표는 축소 대신 드래그 스크롤, 등록 폼 달력은 데스크톱 전용(모바일은 입실/퇴실 텍스트 필드로 대체).

## ▶️ 실행 방법

```bash
# 저장소 루트(FRONTEND)에서 json-server 실행 (port 3000)
npm start   # 또는 npx json-server db.json

# VS Code Live Server로 HOTELPROJECT/src/html/HOME.html 열기 (port 5500)
```

두 서버가 동시에 떠 있어야 요금표·예약 기능이 동작합니다.

## 🎨 디자인 출처

피그마 시안 「호텔예약」 데스크톱/모바일 — `componenet.css` · `Pages.css`는 피그마에서 내보낸 원본 CSS로, 수치 참고용으로만 보관하고 실제 스타일은 `style.css`에 직접 작성했습니다.
