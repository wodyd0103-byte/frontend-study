# 📱 LECTURE_11 — React Native 소개 & 환경 세팅

> 같은 React, 다른 결과물 · 안드로이드 개발 환경 만들기 · View · Text · Image · ScrollView · Day 11/13

## 개요

웹에서 모바일 앱으로 넘어가는 첫 강의(11강). 지금까지 React로 만든 결과물은 브라우저에서 도는 "웹 페이지"였다면, React Native는 **똑같은 React 문법으로 진짜 안드로이드·iOS 앱을 만드는** 도구다. 앞의 절반은 앱을 빌드·실행하기 위한 개발 환경 세팅(JDK 17 · Android Studio · SDK · AVD 에뮬레이터 · 환경변수)에 쓰고, 뒤의 절반에서 프로젝트를 생성해 첫 화면을 띄운 뒤 기본 컴포넌트 네 가지(View · Text · Image · ScrollView)와 StyleSheet 스타일링을 배운다.

### 학습 목표 (2p)

1. React Native가 무엇인지, React(웹)와 어떻게 다른지 설명할 수 있다
2. 안드로이드 앱 개발 환경을 직접 세팅할 수 있다 — JDK · Android Studio · AVD
3. React Native 프로젝트를 만들고 에뮬레이터에서 실행할 수 있다 — `init` · `yarn android`
4. 기본 컴포넌트로 화면을 구성할 수 있다 — View · Text · Image · ScrollView
5. StyleSheet로 화면에 스타일을 입힐 수 있다 — 웹 CSS와 비슷하지만 조금 다른 RN 스타일

---

## 1. React Native란? (4~9p)

### 1-1. 큰 그림 — Android vs iOS (5p)

| 플랫폼 | 기기 | 개발 언어·도구 |
|---|---|---|
| **안드로이드** | 삼성·구글 등 여러 제조사 기기 | Kotlin / Java + Android Studio |
| **iOS** | 아이폰·아이패드 (애플의 OS) | Swift + Xcode (Mac 필요) |
| **React Native** | 양쪽 동시 | JS/TS 한 번 작성으로 Android·iOS 앱 동시 제작 |

두 번 만드는 건 비효율적이다 → **"한 번 작성, 양쪽에서 쓰는"** 방법이 React Native다. 이 수업에서는 Android로 실습한다.

### 1-2. 네이티브(native)란? (6p)

**네이티브 앱** = 그 OS 전용 도구·언어로 만들어 OS 위에서 '직접' 도는 앱.

| 구분 | 특징 |
|---|---|
| **네이티브 앱** | OS의 화면·기능 부품을 직접 사용 → 빠르고 자연스럽다. 카메라·터치·알림·클립 등 기기 기능과 잘 맞물린다 |
| **웹앱 (브라우저)** | 브라우저 안에서 동작 → 기기 기능 접근에 제약, 상대적으로 무겁다 |
| **React Native** | JS/TS로 작성하지만 화면이 **진짜 네이티브 부품으로 변환**된다. 웹을 앱처럼 포장한 것이 아니다 |

내가 쓴 `<View>`·`<Text>`가 실제 네이티브 화면 부품으로 변환된다.

### 1-3. React vs React Native (7p)

| 구분 | React (웹) | React Native (앱) |
|---|---|---|
| 무엇 | UI 만드는 라이브러리 | React로 앱 만드는 프레임워크 |
| 결과물 | 웹 페이지 (브라우저) | 모바일 앱 (안드로이드·iOS) |
| 화면 단위 | `<div>` `<p>` `<img>` (HTML) | `<View>` `<Text>` `<Image>` (컴포넌트) |
| 스타일 | CSS · className | StyleSheet 객체 (`style={}`) |
| 실행 | localhost (브라우저) | 에뮬레이터 · 실제 폰 |

**공통**: 컴포넌트 · props · state · JSX · TypeScript — 9·10강에서 배운 것이 거의 그대로 간다.

### 1-4. React Native의 특징 (8p)

- **크로스 플랫폼** — 하나의 코드로 안드로이드·iOS 앱을 동시에 만들 수 있다
- **네이티브 성능** — 실제 앱에 가까운 성능. 웹뷰로 감싼 앱이 아니다
- **코드 재사용** — React 컴포넌트 방식 그대로. 웹에서 익힌 개념을 다시 활용
- **같은 언어** — 웹에서 쓰던 JS/TS 그대로. 새 언어를 배울 필요가 없다

> "웹 React 개발자가 가장 적은 비용으로 앱을 만드는 길"이 React Native다.

### 1-5. 어떻게 앱이 될까 — Bridge (9p)

우리가 쓰는 `<View>`·`<Text>`는 HTML 태그가 아니다. React Native가 이걸 진짜 네이티브 화면 부품으로 바꿔준다.

```
우리가 작성 (JS/TS)        React Native            네이티브 UI
  <View>                   JS/TS 코드를 읽어         ViewGroup
  <Text>        ──Bridge→  네이티브 화면 부품으로  →  TextView
  <Image>                  변환해준다                ImageView
                                                    (Android 실제 부품)
```

"이런 화면"이라고 적기만 하면, 실제 네이티브 부품으로 바꾸는 일은 React Native가 한다.

---

## 2. 환경 세팅 (10~22p)

### 2-1. 오늘 설치할 것 — 전체 그림 (11p)

**이미 있음** (1강에서 설치): VS Code(편집기) · Node.js·npm(JS 실행·패키지 관리) · yarn(패키지 관리 도구)

**오늘 새로 설치**:

| | 도구 | 용도 |
|---|---|---|
| ① | **JDK 17** | 앱 빌드에 필요한 자바 도구 |
| ② | Python | 필수 아님 — 혹시 몰라 설치 |
| ③ | **Android Studio** | SDK + 에뮬레이터(가상기기) |

> 환경변수(`JAVA_HOME`, `ANDROID_HOME`)를 바꾸므로, 설치 뒤 **터미널과 VS Code를 반드시 다시 켜야** 적용된다.

### 2-2. ① JDK 17 (12~14p)

**JDK(Java Development Kit)** = 자바 프로그램을 빌드·실행하는 도구 모음. 자바 코드를 직접 쓰지 않는데도 필요한 이유는 — 안드로이드 앱을 '빌드'하는 과정(**Gradle**)이 자바 위에서 동작하기 때문.

> ⚠️ **반드시 17**. React Native 권장 버전이며, 더 높은 버전(21 등)은 빌드 오류가 날 수 있다.

설치 순서:
1. https://adoptium.net 접속 (Adoptium Temurin JDK — 무료·로그인 불필요)
2. Temurin 17 (LTS) — Windows · x64 · `.msi` 다운로드
3. 설치 옵션에서 반드시 체크 → **Set JAVA_HOME** · **Add to PATH**
4. 설치 완료

확인 — 새 터미널에서:

```bash
java -version
```

`openjdk version "17.x.x"` 처럼 **17**이 보이면 성공.

**JAVA_HOME 수동 설정** (자동 적용이 안 됐을 때): 시작 → "환경 변수" → 시스템 환경 변수 편집 → [환경 변수]

1. 새로 만들기 — 변수 이름 `JAVA_HOME`, 변수 값 = JDK 17 설치 경로
   (예: `C:\Program Files\Eclipse Adoptium\jdk-17.0.x.x-hotspot`)
2. Path 편집 → 새로 만들기 → `%JAVA_HOME%\bin` 추가
3. 설정 후 터미널·VS Code를 다시 열고 `java -version`으로 17 확인

### 2-3. ② Python 설치 (선택) (15p)

일부 환경·라이브러리 빌드 과정에서 Python이 쓰일 수 있어 미리 설치해 둔다.

1. python.org/downloads/windows 접속
2. Stable Release 설치 파일 다운로드
3. 설치 시 **"Add python.exe to PATH"** 반드시 체크
4. 새 터미널에서 `python --version` 으로 확인

> 필수가 아님. 현재 RN 표준 안드로이드 세팅에서 Python은 필수가 아니다(과거 빌드 스크립트의 흔적). 설치가 막히면 일단 건너뛰고 진행해도 된다.

### 2-4. ③ Android Studio (16~18p)

구글이 만든 안드로이드 앱 공식 개발 도구(IDE). 우리는 여기서 코드를 쓰지 않는다. **두 가지** 때문에 설치한다:

| | | |
|---|---|---|
| ① | **Android SDK** | 앱 빌드에 필요한 도구·라이브러리 모음. Android Studio 설치 시 자동으로 함께 설치된다 |
| ② | **에뮬레이터(AVD)** | 내 컴퓨터 화면에 안드로이드 폰을 띄워 앱을 확인하는 가상기기 |

> 코드 편집 = **VS Code**, 가상 폰으로 앱 확인 = **Android Studio 에뮬레이터**

설치 순서:
1. developer.android.com/studio 접속
2. Download → Windows 설치 파일 받기
3. 설치 마법사 → 반드시 체크: **Android Virtual Device** (에뮬레이터용)
4. 설치 방식은 **Standard** 로 진행 (SDK 자동 설치)
5. 첫 실행 시 추가 다운로드 진행 — 기다린다

> 완료 기준: Android Studio 시작 화면이 뜨면 설치 완료. 여기서 SDK 확인 + 가상기기 생성을 진행한다.
> ※ 다운로드 용량이 크다. 설치 중 인터넷 연결 유지.

**SDK 확인 (SDK Manager)** — 시작 화면 → More Actions → SDK Manager

1. `SDK Platforms` 탭 — 최신 안드로이드 버전 하나가 체크되어 있는지 확인
2. `SDK Tools` 탭 — 아래 항목 체크 후 Apply
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android SDK Command-line Tools (latest)
   - Android Emulator
3. **Android SDK Location 경로 메모** → 다음 슬라이드에서 사용

```
// SDK Location 예시
C:\Users\사용자명\AppData\Local\Android\Sdk
```

이 경로를 정확히 복사해 두면 다음 `ANDROID_HOME` 설정이 쉽다.

### 2-5. ANDROID_HOME 환경변수 (19p)

시작 → "환경 변수" → 시스템 환경 변수 편집 → [환경 변수]

1. 새로 만들기 — 변수 이름 `ANDROID_HOME`, 변수 값 = 앞에서 메모한 SDK 경로
2. Path 편집 → 새로 만들기 → `%ANDROID_HOME%\platform-tools` 추가

> ※ 경로 오타가 가장 흔한 실수 — SDK Manager에 보이는 경로를 그대로 복사한다.

완료 후 확인: 모든 창 [확인]으로 닫은 후 **터미널·VS Code를 다시 열고**

```bash
adb --version
```

Android Debug Bridge 버전이 뜨면 성공.

### 2-6. 환경변수 적용 확인 (20p)

환경변수를 바꿨으면 반드시 **새 터미널**에서 확인한다. (열려 있던 터미널·VS Code는 닫았다가 다시 연다)

| 확인 | 명령 | 성공 기준 |
|---|---|---|
| ① JDK | `java -version` | `openjdk version "17.x.x"` 처럼 **17** |
| ② Android | `adb --version` | Android Debug Bridge 버전 표시 |

**adb가 안 잡히면**: `ANDROID_HOME` 경로·Path의 platform-tools 추가를 다시 확인 → 터미널 또는 컴퓨터를 다시 시작.

둘 다 정상 출력되면 환경 세팅 절반은 끝났다.

### 2-7. ④ 가상기기(AVD) 만들기 · 실행 (21~22p)

**AVD**(Android Virtual Device) = 컴퓨터에서 돌아가는 가상 안드로이드 폰.

1. 시작 화면 → More Actions → **Virtual Device Manager**
2. **+ Create Virtual Device** 클릭
3. Phone → Pixel 계열 등 적당한 모델 선택 → Next
4. 시스템 이미지: Recommended 탭에서 하나 선택 (미다운로드 항목은 ↓ 아이콘으로 받기)
5. Next → Finish — 목록에 기기가 생기면 성공

실행: Virtual Device Manager → 만든 기기의 ▶ 버튼 클릭 → 잠시 기다리면 화면에 '안드로이드 폰'이 뜬다. 홈 화면이 보이면 성공 — 마우스로 조작 가능.

> 💡 **핵심 순서: 에뮬레이터가 먼저, `yarn android`는 나중.**
> 가상기기를 먼저 켜둔 뒤 `yarn android`를 실행해야 앱이 설치된다. 이 순서를 틀리면 앱이 가상기기에 뜨지 않는다.

tips: 처음 부팅은 느리다 — 기다린다 / 자주 쓰면 켜둔 채 유지 / 너무 느리면 더 가벼운 기기로 재생성.

---

## 3. 프로젝트 생성 · 실행 (23~28p)

### 3-1. 프로젝트 생성 (24p)

```bash
npx @react-native-community/cli@latest init MyApp
```

| 조각 | 의미 |
|---|---|
| `npx @react-native-community/cli` | RN 프로젝트 생성 도구 (전역 설치 X, 1회성) |
| `init MyApp` | MyApp 이름의 프로젝트 폴더 생성 |
| `.tsx / TypeScript` | 기본으로 생성됨 — 패키지 매니저를 묻는다면 yarn 선택 |

생성 후 `cd MyApp` 으로 이동. VS Code로 열기: File → Open Folder → MyApp

> **이름 규칙**: 영문만 — 한글·공백 금지.

### 3-2. 프로젝트 폴더 구조 (25p)

```
MyApp/
├─ App.tsx          ← 우리가 만드는 첫 화면 (여기부터 수정)
├─ index.js         앱의 시작점 (App을 불러와 실행)
├─ package.json     패키지·실행 명령
├─ node_modules/    설치된 부품 모음
├─ android/         안드로이드 네이티브 부분 (직접 열 일 거의 없음)
└─ ios/             iOS 네이티브 부분 (Mac에서 사용)
```

**웹과 다른 점**: `android/`·`ios/` 폴더가 새로 보인다. RN이 앱으로 빌드할 때 쓰는 부분 — 우리가 직접 고칠 일은 거의 없다. 우리는 **App.tsx부터** 고친다. (웹에서 App.tsx 고치던 흐름과 같다)

### 3-3. 에뮬레이터에서 앱 실행 (26p)

앞에서 켜 둔 가상기기가 실행 중인 상태에서, MyApp 폴더의 터미널에 입력:

```bash
yarn android
```

빌드 → 설치 → 앱 실행. 처음에는 시간이 꽤 걸린다 — 기다린다.
**성공 모습**: 가상 폰 화면에 React Native 기본 화면이 나타난다.

안 되면 확인: 에뮬레이터가 **먼저** 켜져 있는지 / `adb --version`이 되는지 / MyApp 폴더 **안에서** 실행했는지.

### 3-4. 실행 흐름 정리 (27p)

React Native 앱은 두 부분이 함께 돈다: **Metro 서버**(JS 코드 전달) + **앱**(화면 표시)

| 명령 | 역할 | 언제 |
|---|---|---|
| `yarn android` | **빌드 · 설치 · 실행** — 앱을 빌드해 에뮬레이터에 설치하고 실행 | 처음 한 번 / 라이브러리를 새로 설치했을 때 |
| `yarn start` | **Metro 서버만 켜기** — 이미 설치된 앱이 있을 때. 저장하면 화면 자동 갱신 | 이후 코드 수정 시 |

> 처음 한 번 `yarn android`(설치) → 이후 코드 수정은 Metro가 켜진 상태에서 저장 → 라이브러리 추가 시 다시 `yarn android`

### 3-5. 첫 화면 수정해보기 (28p)

`App.tsx` — 기존 내용을 지우고 아래로 교체:

```tsx
import { View, Text } from 'react-native';

function App() {
  return (
    <View style={{ marginTop: 80, alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>나의 첫 React Native 앱</Text>
    </View>
  );
}

export default App;
```

저장하면 가상기기 화면이 자동으로 바뀐다. (안 바뀌면 Metro에서 `r` 키로 새로고침)

- 글자는 반드시 **`<Text>` 안에** — 웹과 가장 다른 점
- 스타일은 **`style={{ }}` 객체**로 (className 아님)

---

## 4. 기본 컴포넌트 (29~36p)

### 4-1. 웹 ↔ RN 대응표 (30p)

| 웹 (HTML) | RN (컴포넌트) | 역할 |
|---|---|---|
| `<div>` | `<View>` | 영역·묶음 (container) |
| `<p>` `<span>` | `<Text>` | 글자 — 모든 텍스트는 여기에 |
| `<img>` | `<Image>` | 이미지 |
| (스크롤 영역) | `<ScrollView>` | 넘치는 내용 스크롤 |
| `class="..."` | `style={...}` | 스타일 — CSS 대신 JS 객체 |

컴포넌트는 반드시 `import { View, Text, ... } from 'react-native'` 로 가져와 쓴다.

### 4-2. View — 화면의 묶음 (31p)

다른 컴포넌트를 담는 상자. 웹의 `<div>`에 해당한다.

```tsx
import { View, Text } from 'react-native';

<View style={{ padding: 20 }}>
  <Text>안의 내용</Text>
</View>
```

- **레이아웃의 뼈대** — View 안에 View를 넣어 영역을 겹겹이 구성한다
- **기본 방향: 세로** — 자식들을 세로로 쌓는다 (웹 flex 기본이 가로였던 것과 반대)

### 4-3. Text — 모든 글자는 Text 안에 (32p)

RN에서 가장 다른 점:

```tsx
✅ <Text>안녕하세요</Text>
❌ <View>안녕하세요</View>   // 에러!
```

웹은 `<div>`에 글자를 바로 넣을 수 있었지만, RN에서 글자는 오직 `<Text>` 안에서만 표시된다.

**Text 중첩 — 일부만 강조**:

```tsx
<Text>
  가격:
  <Text style={{ fontWeight: 'bold' }}>
    9,000원
  </Text>
</Text>
```

Text 안에 Text를 중첩해 일부만 굵게·색 다르게 할 수 있다.

### 4-4. Image — 이미지 (33p)

**인터넷 주소 이미지**:

```tsx
<Image
  style={{ width: 100, height: 100 }}
  source={{ uri: 'https://...' }}
/>
```

**프로젝트 파일 이미지**:

```tsx
<Image source={require('./assets/logo.png')} />
```

> ⚠️ **인터넷 이미지는 width·height 필수!** 안 주면 크기 0 → 화면에 보이지 않는다.

source 형태 주의:

```tsx
❌ source="url"
✅ source={{ uri: 'url' }}   // 중괄호 두 번 — 바깥은 JSX 표현식, 안은 객체
```

### 4-5. ScrollView — 스크롤 영역 (34p)

화면을 넘치는 내용은 그냥 두면 잘린다. `ScrollView`로 감싸면 스크롤된다.

```tsx
import { ScrollView, Text } from 'react-native';

<ScrollView>
  <Text>내용 1</Text>
  <Text>내용 2</Text>
  ... 많은 내용 ...
</ScrollView>
```

- **기본: 세로 스크롤** — 세로로 긴 화면을 만들 때 바깥을 ScrollView로 감싼다
- 가로 스크롤: `horizontal` 속성 추가
- **`style` vs `contentContainerStyle`** — `style`은 ScrollView 자체(배경 등), `contentContainerStyle`은 내부 정렬·여백

### 4-6. StyleSheet — RN의 스타일 (35p)

RN 스타일은 CSS 파일이 아니라 **JS 객체**로 쓴다. `StyleSheet.create({})`로 스타일 묶음을 만든다.

```tsx
import { StyleSheet, View, Text } from 'react-native';

<View style={styles.box}>
  <Text style={styles.title}>제목</Text>
</View>

const styles = StyleSheet.create({
  box:   { padding: 20, backgroundColor: '#ffffff' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
```

사용법: ① `StyleSheet.create({})`로 스타일 묶음 만들기 → ② `style={styles.이름}`으로 적용. CSS의 class 묶음과 비슷한 느낌.

### 4-7. CSS와 다른 점 (36p)

| CSS | RN (StyleSheet) |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size: 16px` | `fontSize: 16` (단위 없이 숫자) |
| `margin-top: 8px` | `marginTop: 8` |
| 두 단어는 하이픈(-) | 두 단어는 대문자로 이어 붙임 (**camelCase**) |

**Flexbox**: 모든 View는 기본으로 flex 컨테이너다 (`display:flex`를 안 써도 됨). 기본 방향은 **세로(column)** — 웹이 기본 가로였던 것과 반대.

---

## 5. 실습 (37~43p)

### 5-1. 화면은 파일로 분리 (38p)

화면마다 **별도 컴포넌트 파일**을 만들고, `App.tsx`는 보여줄 화면만 골라 import한다.

```tsx
// App.tsx
import Profile from './Profile';
// import MyScreen from './MyScreen';

function App() {
  return <Profile />;
  // return <MyScreen />;
}

export default App;
```

- 보고 싶은 화면만 **주석을 풀어 전환** → 만든 화면 파일이 모두 그대로 보존된다
- 9강에서 배운 import · export를 그대로 재사용 — 스타일은 파일 안 StyleSheet라 충돌 없음
- 화면 이동(내비게이션)은 다음 강의 마지막에서 — 그전까지는 이 방식으로 화면 전환

### 5-2. 실습 ① — 프로필 화면 (39~42p)

**만들 화면**: 프로필 사진(원형) · 이름·직업 · '소개' 카드 · '관심 분야' 카드 · 전체를 세로 스크롤
**만들 파일**: `src/Profile.tsx` → `App.tsx`에서 렌더

사용하는 컴포넌트: `ScrollView`(세로 스크롤 화면 전체) · `Image`(원형 프로필 사진) · `Text`(이름·직업·카드 제목·설명) · `View`(카드 영역 — 흰 배경·둥근 모서리) · `StyleSheet`(스타일 정의)

```tsx
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

function Profile() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image style={styles.avatar} source={{ uri: 'https://i.pravatar.cc/200' }} />
      <Text style={styles.name}>김리액트</Text>
      <Text style={styles.job}>프론트엔드 개발자</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>소개</Text>
        <Text style={styles.cardText}>
          React로 웹을 배우고, 이제 React Native로 앱을 만들고 있습니다.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>관심 분야</Text>
        <Text style={styles.cardText}>UI 디자인 · 모바일 앱 · 사용자 경험</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:    { backgroundColor: '#f2f2f2' },
  container: { alignItems: 'center', padding: 24 },
  avatar:    { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  name:      { fontSize: 24, fontWeight: 'bold' },
  job:       { fontSize: 16, color: '#666666', marginBottom: 24 },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardText:  { fontSize: 15, color: '#444444', lineHeight: 22 },
});

export default Profile;
```

**코드 설명** (42p):

| 컴포넌트 | 포인트 |
|---|---|
| `ScrollView` | `style` = ScrollView 자체 배경 / `contentContainerStyle` = 내부 정렬·여백 (가운데·padding) |
| `Image` | 원형: `width=height=120`에 `borderRadius:60` → 동그라미. 인터넷 이미지라 **width·height 필수** (없으면 안 보임) |
| `View` (card) | 흰 배경·둥근 모서리로 카드 모양. `width:'100%'`로 가로를 채운다 |
| `Text` | 이름·직업·카드 제목·설명 — 화면의 **모든 글자는 Text 안에** |
| `StyleSheet` | 스타일을 한곳에 모아 `styles.이름`으로 적용. CSS class 묶음과 비슷 |

### 5-3. 실습 ② — 나만의 화면 (43p)

**만들 파일**: `src/MyScreen.tsx` → `App.tsx`에서 `import MyScreen` 후 `<MyScreen />` 렌더

주제 고르기 (직접 정해도 OK): 나를 소개하는 명함 / 내가 좋아하는 것(영화·음악·취미…) / 가보고 싶은 여행지 / 추천 한 가지(책·앱·맛집) / 반려동물·좋아하는 동물 / 나만의 상품 소개(가상)

**완성 기준 4가지**:
1. 전체를 `ScrollView`로 감싸 실제로 스크롤되게
2. 이미지 1개 이상 — `width`·`height` 지정해 보이게
3. 내용 카드(`View`) 2개 이상 — 제목 + 설명을 담기
4. 스타일은 `StyleSheet.create`로 정의

> 정답 코드는 없음 — 오늘 배운 컴포넌트를 조합해 직접 만든다.

---

## 6. 자주 하는 실수 (44p)

**환경 세팅**

- ❌ 환경변수 바꾸고 터미널·VS Code 그대로 사용 → 다시 켜야 적용
- ❌ JDK 17이 아님 — `java -version`으로 확인, 높은 버전은 빌드 오류
- ❌ `ANDROID_HOME` 경로 오타 — SDK Manager 경로를 그대로 복사
- ❌ 에뮬레이터 안 켜고 `yarn android` → 가상기기 먼저 실행
- ❌ 프로젝트 폴더 밖에서 명령 실행 / 이름에 한글·공백

**컴포넌트 · 스타일**

- ❌ 글자를 Text 없이 View 안에 직접 → 에러
- ❌ `<div>` `<p>` `<img>` 웹 태그 사용 → View·Text·Image로
- ❌ `className` 사용 → `style={{ ... }}` 객체로
- ❌ `style="color:red"` 문자열 → `style={{ color: 'red' }}`
- ❌ 인터넷 Image에 width·height 안 줌 → 크기 0으로 안 보임

---

## 7. 오늘 정리 (45p)

- **React Native** — 같은 React, 결과물만 웹 페이지에서 앱으로 바뀐다
- **환경 세팅** — JDK 17 · Android Studio · SDK · 환경변수 · 에뮬레이터
- **프로젝트 생성·실행** — `npx init` → 에뮬레이터 먼저 → `yarn android`
- **기본 컴포넌트** — View · Text · Image · ScrollView (웹 태그 대신 컴포넌트)
- **StyleSheet** — CSS 파일 대신 JS 객체로 스타일 정의 · camelCase

**다음 →** RN Flexbox 레이아웃 · 스타일링 심화 · 데이터 연동 (12강)
