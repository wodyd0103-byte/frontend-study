# 🎨 LECTURE_12 — React Native 스타일링 & 레이아웃

> StyleSheet · Flexbox · 입력·버튼 · 목록 렌더링 · 서버 연동 · Day 12/13
>
> ⚠️ **예습 정리본** — 수강 전에 교안(70p)만 보고 미리 정리한 자료입니다. 실습 코드는 아직 작성하지 않았습니다.

## 개요

11강의 '정적 화면'을 **'입력받고 반응하는 화면'**으로, 다시 **'서버 데이터로 채우는 화면'**으로 끌어올리는 강의. StyleSheet를 배열·조건으로 제대로 쓰는 법, RN Flexbox가 웹 CSS와 어디서 갈라지는지(기본 방향이 세로!), TextInput·TouchableOpacity로 입력과 터치를 받고 useState로 상태를 관리하는 법, map·FlatList로 목록을 그리는 법, useRef로 포커스·스크롤을 직접 조작하는 법, 마지막으로 json-server에 fetch를 붙여 진짜 데이터를 받아오는 것(에뮬레이터에서는 `localhost`가 아니라 `10.0.2.2`!)까지 다룬다.

### 학습 목표 (2p)

1. StyleSheet로 스타일을 체계적으로 적용할 수 있다 — 인라인 vs StyleSheet, 배열 합치기
2. RN의 Flexbox로 화면을 배치할 수 있다 — 기본 방향이 세로(column)
3. TextInput + useState로 입력값을 관리할 수 있다 — 제어 컴포넌트, onChangeText
4. TouchableOpacity·Button으로 버튼을 만들 수 있다 — onPress
5. 배열을 map으로 목록 화면으로 렌더링할 수 있다 — 반복 카드 줄
6. 서버(json-server)에서 데이터를 받아 목록을 채울 수 있다 — fetch + useEffect · 10.0.2.2
7. useRef로 화면 요소를 직접 조작할 수 있다 — 포커스·스크롤 제어

---

## 1. StyleSheet (4~9p)

### 1-1. 인라인 vs StyleSheet (5p)

RN 스타일은 'JS 객체'로 쓴다. 적용 방법은 두 가지.

| | 방식 | 코드 | 언제 |
|---|---|---|---|
| ① | **인라인** — 태그에 바로 | `<Text style={{ fontSize: 18, color: 'gray' }}>안녕</Text>` | 짧고 일회성일 때 · 빠르게 시험 |
| ② | **StyleSheet** — 한곳에 이름으로 | `<Text style={styles.title}>안녕</Text>` | 반복·정리가 필요할 때 · 기본으로 사용 |

```tsx
const styles = StyleSheet.create({
  title: { fontSize: 18, color: 'gray' },
});
```

> `StyleSheet.create`로 묶으면 CSS class 묶음처럼 관리가 쉽다. **기본은 StyleSheet, 잠깐 시험할 때만 인라인.**

### 1-2. 표기법·단위 — 웹 CSS와 다른 점 (6p)

| | 규칙 | CSS | RN |
|---|---|---|---|
| ① | **camelCase** 속성 이름 | `background-color` / `margin-top` | `backgroundColor` / `marginTop` |
| ② | **단위 없음** — 숫자만 | `font-size: 16px` / `margin-top: 8px` | `fontSize: 16` / `marginTop: 8` |
| ③ | **값이 글자면 따옴표** | — | `color: 'red'` · `backgroundColor: '#4a90e2'` · `fontWeight: 'bold'` |

숫자는 화면 독립 단위(**dp**)로 해석된다 — px·rem·em은 없다. 단, **퍼센트는 문자열**로: `width: '100%'`.

### 1-3. 스타일 여러 개 합치기 — 배열 (7p)

`style`에 **배열**을 주면 여러 스타일을 합쳐 적용한다.

```tsx
// StyleSheet 스타일 두 개 합치기
<View style={[styles.box, styles.active]} />

// StyleSheet + 인라인 혼합
<View style={[styles.box, { borderColor: 'red' }]} />

const styles = StyleSheet.create({
  box:    { width: 100, height: 100, backgroundColor: '#ccc' },
  active: { backgroundColor: '#4a90e2' },
});
```

> **뒤에 오는 것이 우선** — 겹치는 속성은 뒤가 덮어쓴다. (위 예에서 배경은 `#4a90e2`)

### 1-4. 조건에 따라 스타일 바꾸기 (8p)

배열 안에서 `&&`를 쓰면 상태에 따라 스타일을 켰다 껐다 할 수 있다.

```tsx
// isActive 참 → styles.active 추가 / 거짓 → 무시
<View style={[styles.box, isActive && styles.active]} />

// 입력이 비면 버튼을 회색으로
<TouchableOpacity style={[styles.button, isEmpty && styles.disabled]} />
```

- **공통 스타일**(`styles.box`)은 앞에
- **바뀌는 부분**만 뒤에서 조건으로 건다
- 거짓이면 배열에서 그냥 무시됨

### 1-5. 자주 쓰는 스타일 속성 (9p)

| 분류 | 속성 |
|---|---|
| **크기** | `width` · `height` |
| **여백** | `margin` · `padding` · `marginTop` · `paddingHorizontal` · `marginVertical` |
| **배경·테두리** | `backgroundColor` · `borderRadius` · `borderWidth` · `borderColor` |
| **글자** | `color` · `fontSize` · `fontWeight` · `textAlign` · `lineHeight` |
| **위치** | `position` · `top` · `left` · `right` · `bottom` |
| **배치(Flex)** | `flex` · `flexDirection` · `justifyContent` · `alignItems` |

---

## 2. Flexbox (10~24p)

### 2-1. RN 레이아웃 = Flexbox가 기본 (11p)

| | 웹 CSS | React Native |
|---|---|---|
| Flex 켜기 | `.container { display: flex; }` — 직접 켜야 한다 | **모든 View가 기본 Flex** — `display: flex` 자체가 없다 |

```tsx
// display: flex 필요 없음
<View>
  <View />
  <View />
</View>
```

**개념은 그대로**: 주축·교차축, `justifyContent`, `alignItems`, `flex: 1`, `gap` — 3강(CSS 심화)에서 배운 것과 같다. 단 **하나 다른 점**이 있다 → 기본 방향.

### 2-2. 가장 큰 차이 — 기본 방향 (12p)

| | 기본값 | 쌓이는 모습 |
|---|---|---|
| 웹 | `row` (가로) | 1 2 3 이 좌 → 우로 |
| **RN** | **`column` (세로)** | 1 2 3 이 위 → 아래로 |

> **"RN은 세로가 기본"** — 이 한 가지만 기억하면 된다. 가로 배치가 필요할 때만 `flexDirection: 'row'`를 직접 준다.

### 2-3. 주축과 교차축 (13p)

| | `'column'` (기본) | `'row'` |
|---|---|---|
| 주축 | ↕ 세로 | ↔ 가로 |
| 교차축 | ↔ 가로 | ↕ 세로 |
| `justifyContent` | 세로(주축) 정렬 | 가로(주축) 정렬 |
| `alignItems` | 가로(교차축) 정렬 | 세로(교차축) 정렬 |

방향이 바뀌면 두 정렬이 가리키는 쪽도 함께 바뀐다. 외울 건 **"justify = 주축, align = 교차축"** 하나.

### 2-4. flexDirection — 쌓는 방향 (14p)

```tsx
const styles = StyleSheet.create({
  // column 기본 — 안 써도 OK
  container: { flex: 1 },
  // 가로가 필요할 때만
  row: { flexDirection: 'row' },
});
```

세로 화면은 그냥 두면 되고(column 기본), **가로 배치가 필요할 때만** `flexDirection: 'row'`.

### 2-5. justifyContent — 주축 정렬 (15p)

주축 방향으로 아이템을 배치. column 기준(세로 주축)이면 세로 방향 정렬을 바꾼다.

| 값 | 결과 |
|---|---|
| `'flex-start'` | 시작점 (기본) |
| `'center'` | 가운데 |
| `'flex-end'` | 끝점 |
| `'space-between'` | 양끝에 붙이고 사이 균등 |
| `'space-evenly'` | 모든 간격 동일 |

> 방향이 row로 바뀌면 justifyContent가 가로 방향을 정렬한다 — 방향만 바뀌고 개념은 같다.

### 2-6. alignItems — 교차축 정렬 (16p)

교차축 방향 정렬. column 기준 교차축 = 가로.

| 값 | 결과 |
|---|---|
| `'stretch'` | 꽉 채움 (기본) |
| `'center'` | 가운데 |
| `'flex-end'` | 끝점 (오른쪽) |

**화면 정중앙**에 두는 자주 쓰는 조합:

```tsx
screen: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
```

### 2-7. flex: 1 — 남은 공간 채우기 (17p)

`flex` 값은 **비율**이다. 남은 공간을 비율대로 나눠 갖는다.

```tsx
// 화면 전체 채우기
screen: { flex: 1 },

// 가로 균등 분배
<View style={{ flexDirection: 'row' }}>
  <View style={{ flex: 1 }} />   {/* 1/3 */}
  <View style={{ flex: 2 }} />   {/* 2/3 */}
</View>
```

- `flex: 1` → 남은 공간 전부 차지
- `flex: 2` → `flex: 1`보다 **2배** 넓게
- 화면을 꽉 채우는 바깥 View엔 보통 `flex: 1`

> 화면을 꽉 채우는 바깥 View에 `flex: 1`이 없으면 **가운데 정렬이 안 먹는다.**

### 2-8. 여백 — margin · padding · gap (18p)

| | 속성 |
|---|---|
| **margin** (바깥쪽 여백) | `marginTop` · `marginBottom` · `marginHorizontal` · `marginVertical` · `margin` |
| **padding** (안쪽 여백) | `paddingTop` · `paddingBottom` · `paddingHorizontal` · `paddingVertical` · `padding` |
| **gap** (자식 사이 간격) | `gap` |

```tsx
list: { gap: 12 },
card: { padding: 16, marginBottom: 12 },
```

> 항목 여러 개를 띄울 땐 **gap**이 편하다 — 사이에만 여백이 들어가고 첫·끝에 군더더기 여백이 없다.

### 2-9. 자주 쓰는 레이아웃 패턴 (19~20p)

**① 화면 정중앙** — 로그인·빈 화면에 자주

```tsx
screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
```

**② 양끝 배치** — 라벨↔값 · 좌우 버튼 (예: `합계` … `9,500원`)

```tsx
row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
```

**③ 가로 균등 분배** — 버튼 여러 개를 같은 너비로

```tsx
row: { flexDirection: 'row', gap: 8 },  // 바깥
btn: { flex: 1 },                        // 각 버튼
```

**④ 내용 위, 버튼 아래** — 화면 바닥에 고정 버튼

```tsx
<View style={{ flex: 1 }}>
  <ScrollView />          {/* 내용이 위를 채움 */}
  <TouchableOpacity />    {/* 버튼이 아래로 */}
</View>
```

> 오늘 만들 로그인·문의 폼도 이 패턴들의 조합이다.

### 2-10. 실습 화면은 파일로 분리 (21p)

11강과 같은 방식. 화면마다 별도 컴포넌트 파일을 만들고, `App.tsx`는 보여줄 화면만 골라 import한다.

```tsx
// App.tsx
import FlexDemo from './FlexDemo';
// import Login from './Login';

function App() {
  return <FlexDemo />;
  // return <Login />;
}

export default App;
```

### 2-11. 실습 ① — Flexbox 박스 3개 (22~23p)

`src/FlexDemo.tsx` 새 파일로 작성. **주석 친 값을 직접 바꿔가며** 화면을 관찰하는 것이 목적.

```tsx
import { View, Text, StyleSheet } from 'react-native';

function FlexDemo() {
  return (
    <View style={styles.container}>
      <View style={styles.box}><Text>1</Text></View>
      <View style={styles.box}><Text>2</Text></View>
      <View style={styles.box}><Text>3</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',           // 'column' 으로 바꿔보기
    justifyContent: 'space-between', // 'center'
    alignItems: 'center',            // 'flex-start'
  },
  box: {
    width: 60, height: 60,
    backgroundColor: '#cfe3ff',
    justifyContent: 'center', alignItems: 'center',
  },
});

export default FlexDemo;
```

### 2-12. 웹 ↔ RN Flexbox 차이 요약 (24p)

| | 웹 CSS | React Native |
|---|---|---|
| 켜는 법 | `display: flex` 필요 | **모든 View가 기본 Flex** |
| 기본 방향 | `row` (가로) | **`column` (세로) ← 반대!** |
| 속성 이름 | `flex-direction` | `flexDirection` (카멜) |
| 값 표기 | `justify-content: center` | `justifyContent: 'center'` |
| 단위 | `px` 등 | 단위 없는 숫자 (dp) |

**공통**: 주축·교차축 개념, `justifyContent`, `alignItems` — 웹과 동일.

---

## 3. 목록 렌더링 (25~33p)

### 3-1. map — 배열을 목록으로 (26p)

반복되는 카드·목록은 직접 여러 번 쓰지 않는다. 배열을 `map`으로 돌려 컴포넌트로 만든다 (웹과 동일, **태그만 RN**).

```tsx
const fruits = ['사과', '바나나', '포도'];

<View>
  {fruits.map((fruit, index) => (
    <Text key={index}>{fruit}</Text>
  ))}
</View>
```

- `{ }` 안에서 map으로 **배열 → JSX 목록** 변환
- `key` — React가 항목을 구분하는 표식. **id 사용 권장**
- 태그: 웹 `<li>` → RN `<Text>`·`<View>`

### 3-2. 실습 ② — 카드 목록 (27~28p)

```tsx
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const menu = [
  { id: 1, name: '아메리카노', price: 4000 },
  { id: 2, name: '카페라떼',   price: 4500 },
  { id: 3, name: '딸기라떼',   price: 5000 },
];

function MenuListDemo() {
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {menu.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.price}원</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#f2f2f2', borderRadius: 12, padding: 16 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
});

export default MenuListDemo;
```

> `key`는 **고유한 id**를 쓰는 것이 가장 안전하다.

### 3-3. FlatList — map보다 나은 목록 (29~30p)

| | map 방식 | FlatList |
|---|---|---|
| 렌더링 | 배열 전체를 한 번에 | **화면에 보이는 항목만** 그림 |
| 스크롤 | 바깥 ScrollView가 담당 | 스크롤을 직접 담당 (당겨서 새로고침 내장) |
| 성능 | 항목 적을 때 충분 | 수백 개여도 가볍다 |

필수 Props 3가지: **`data`** · **`renderItem`** · **`keyExtractor`**

```tsx
import { FlatList } from 'react-native';

const menu = [
  { id: 1, name: "아메리카노" },
  { id: 2, name: "라떼" },
];

<FlatList
  data={menu}
  keyExtractor={(item) => String(item.id)}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text>{item.name}</Text>
    </View>
  )}
  contentContainerStyle={{ padding: 16, gap: 12 }}
/>
```

| Prop | 역할 |
|---|---|
| `data` | 그릴 배열 |
| `renderItem` | 항목 하나를 어떻게 그릴지 — `{ item }`으로 받음 |
| `keyExtractor` | 고유 key 지정 (map의 key와 같은 역할) |
| `contentContainerStyle` | 목록 안쪽 스타일 (ScrollView와 동일) |

> 섹션으로 묶인 목록엔 `SectionList`를 쓴다 (이름만 알아두기).

### 3-4. 실습 ③ — FlatList 목록 (31~32p)

`menu` 배열(아메리카노 4500 / 카페라떼 5000 / 바닐라라떼 5500)을 FlatList로. 스타일은 앞 카드 목록 것 그대로.

```tsx
export default function FlatListDemo() {
  return (
    <FlatList
      data={menu}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.price}원</Text>
        </View>
      )}
    />
  );
}
```

**점검** — ☐ 목록이 스크롤되는가? ☐ keyExtractor를 빼면 경고가 뜨는가? ☐ 카드 3개가 정확할 때와 목록이 보이는가?

### 3-5. 화면 크기 — Dimensions · useWindowDimensions (33p)

```tsx
// ① Dimensions — 한 번 측정 (화면 회전·변경돼도 자동으로 안 바뀜)
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// ② useWindowDimensions — 자동 반영 ✔ (값 갱신 → 추천)
import { useWindowDimensions } from 'react-native';
const { width, height } = useWindowDimensions();
```

| | 뜻 |
|---|---|
| `'window'` | 앱이 보이는 창 크기 (보통 이것을 사용) |
| `'screen'` | 기기 전체 화면 크기 |

---

## 4. 입력 · 버튼 (34~40p)

### 4-1. 입력값은 useState로 관리 (10강 복습) (35p)

입력창의 값을 화면이 '기억'하려면 상태가 필요하다. 10강의 `useState`를 그대로 쓴다.

```tsx
// 웹 (React)
const [text, setText] = useState('');
<input value={text} onChange={(e) => setText(e.target.value)} />

// React Native ← 더 간단!
const [text, setText] = useState('');
<TextInput value={text} onChangeText={setText} />
```

> 차이는 단 하나 — 웹은 `onChange(e.target.value)`, **RN은 `onChangeText(값)`**. `onChangeText`는 값 자체를 바로 넘겨준다(이벤트 객체에서 꺼내지 않아도 됨).

### 4-2. TextInput — 입력창 (36p)

```tsx
import { TextInput } from 'react-native';

const [text, setText] = useState('');

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="입력해 주세요"
/>
```

| Prop | 역할 |
|---|---|
| `value` | 현재 입력값 (상태) |
| `onChangeText` | 글자 바뀔 때 → 값 자체 전달 |
| `placeholder` | 빈 칸 안내 문구 |

> ⚠️ **`value`만 주고 `onChangeText`를 빼뜨리면 글자가 안 써진다.** `value` + `onChangeText`는 항상 짝.

### 4-3. TextInput 자주 쓰는 속성 (37p)

| 속성 | 값 / 용도 |
|---|---|
| `keyboardType` | `"default"` · `"number-pad"` · `"email-address"` · `"numeric"` |
| `secureTextEntry` | 비밀번호 가림 — `<TextInput secureTextEntry value={pw} onChangeText={setPw} />` |
| `multiline` · `numberOfLines` | 여러 줄 입력 — `<TextInput multiline numberOfLines={4} />` |
| `autoCapitalize` | 자동 대문자. 이메일·아이디는 `"none"`으로 끄는 경우가 많다 |

### 4-4. 버튼 — RN의 버튼 종류 (38p)

| | 특징 | 주요 props |
|---|---|---|
| **Button** | 플랫폼 기본 모양. 설치 없이 바로 사용. **모양 변경 어려움** | `onPress`, `title` |
| **TouchableOpacity** ✔ | 누르면 살짝 투명. View+Text를 감싸 꾸밈. **오늘 주로 사용** | `style`, `onPress` + Text |
| **Pressable** | 눌림·호버 등 다양한 상태에 반응 가능. 나중에 필요할 때 | `onPress`, `style` |

**공통**: 누르면 `onPress`에 연결한 함수가 실행된다.

### 4-5. Button — 가장 기본 버튼 (39p)

```tsx
import { Button } from 'react-native';

<Button title="확인" onPress={handlePress} />
```

| Prop | 역할 |
|---|---|
| `title` | 버튼에 보일 글자 (Text 따로 안 넣음) |
| `onPress` | 누를 때 실행할 함수 |
| ⚠️ 한계 | 배경색·크기·둥근 모서리 거의 못 바꾼다 · Android/iOS 모양이 다름 |

> 동작만 빠르게 확인할 때 → Button. 디자인이 필요하면 → **TouchableOpacity**.

### 4-6. TouchableOpacity — 나만의 모양 버튼 (40p)

```tsx
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity style={styles.button} onPress={handlePress}>
  <Text style={styles.buttonText}>로그인</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
});
```

- 버튼 글자는 반드시 **`<Text>` 안에**
- 누르면 잠깐 투명해져 '눌렀다' 느낌
- `style`로 모양 자유롭게 — 오늘 실습 버튼은 전부 이 방식

> ⚠️ `onPress={handleLogin}` — **함수를 괄호 없이.** `handleLogin()`은 즉시 실행되어 버린다.

---

## 5. Ref & 추가 (41~47p)

### 5-1. Ref란? & useRef (42p)

| | state | ref |
|---|---|---|
| 하는 일 | 값을 바꿔 다시 그림 (useState → 값이 바뀌면 컴포넌트가 재렌더링) | **요소를 직접 조작** (useRef → 요소를 가리켜 `focus()`·`scrollTo()` 직접 호출) |
| 화면 | 보여주는 값 관리 | ref가 바뀌어도 **재렌더링 없음** |

사용 순서 3단계:

```tsx
// ① ref 만들기
const inputRef = useRef(null);

// ② 요소에 연결
<TextInput ref={inputRef} />

// ③ 조작
inputRef.current.focus();
```

> `ref.current` = 연결된 실제 요소. **`?.`** 은 아직 연결 안 됐을 때(null) 안전하게 넘기는 표기.

### 5-2. useRef 사용 — TextInput 포커스 (43p)

```tsx
import { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

function RefDemo() {
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <TextInput
        ref={inputRef}
        placeholder="여기에 입력"
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />
      <TouchableOpacity onPress={() => inputRef.current?.focus()}>
        <Text>입력칸으로 포커스</Text>
      </TouchableOpacity>
    </View>
  );
}
```

버튼을 누르면 커서가 입력칸으로, 키보드가 올라온다.

### 5-3. Ref 활용 — 다음 칸 포커스 · 스크롤 (44p)

**① 입력 후 '다음 칸'으로 포커스 이동**

```tsx
const pwRef = useRef<TextInput>(null);

<TextInput
  placeholder="이메일"
  onSubmitEditing={() => pwRef.current?.focus()}
/>
<TextInput ref={pwRef} secureTextEntry />
```

`onSubmitEditing` — 키보드의 완료/다음을 눌렀을 때.

**② ScrollView 스크롤 제어**

```tsx
const scrollRef = useRef<ScrollView>(null);

<ScrollView ref={scrollRef}> ... </ScrollView>
<Button title="맨 아래로" onPress={() => scrollRef.current?.scrollToEnd()} />
```

긴 화면을 버튼 한 번으로 맨 아래로 이동.

### 5-4. KeyboardAvoidingView — 키보드가 가릴 때 (45p)

입력창을 누르면 키보드가 화면 아래쪽을 덮는다. 입력창이 가려지면 `KeyboardAvoidingView`로 감싼다.

```tsx
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  ...입력창들...
</KeyboardAvoidingView>
```

- 키보드 높이에 맞춰 화면을 자동으로 밀어 올려 가리지 않게 한다
- `behavior`는 플랫폼마다 권장값이 다르다 — `Platform.OS`로 분기
- 안드로이드는 보통 지정 안 해도 자연스럽게 동작

### 5-5. SafeAreaView — 노치·상태바 피하기 (46p)

최신 폰은 위에 노치·상태바, 아래에 제스처 바가 있다. `SafeAreaView`로 감싸면 '안전 영역' 안에만 그려진다.

```tsx
import { SafeAreaView } from 'react-native';

<SafeAreaView style={{ flex: 1 }}>
  ...화면 내용...
</SafeAreaView>
```

- 보통 각 화면의 **가장 바깥**을 SafeAreaView로 감싼다
- 더 정확한 제어가 필요하면 `react-native-safe-area-context` 라이브러리를 쓴다

### 5-6. 조건부 렌더링 (10강 복습) (47p)

상태에 따라 화면 일부를 보였다 숨겼다 할 때. (웹과 동일, **태그만 RN**)

```tsx
// ① && — 참일 때만 보이기
{message !== '' && <Text>{message}</Text>}

// ② 삼항 — 둘 중 하나
{isOk
  ? <Text>완료</Text>
  : <Text>대기 중</Text>}
```

> ⚠️ **10강에서 본 함정**
> ❌ `{count && <Text>...</Text>}` — count가 0이면 화면에 0이 찍힘
> ✅ `{count > 0 && <Text>...</Text>}` — 참/거짓 조건으로

---

## 6. 실습 — 로그인 화면 (48~59p)

### 6-1. 실습 ④ — 입력 · 버튼 · 상태 (49p)

로그인 화면 전에 작은 흐름을 먼저 익힌다. **입력 → 버튼(onPress) → 상태 변경 → 화면 갱신.**

```tsx
const [name, setName] = useState('');
const [greeting, setGreeting] = useState('');

<View style={styles.box}>
  <TextInput
    style={styles.input}
    value={name}
    onChangeText={setName}
    placeholder="이름"
  />
  <TouchableOpacity
    style={styles.button}
    onPress={() => setGreeting(`${name}님 안녕하세요!`)}
  >
    <Text style={styles.buttonText}>인사하기</Text>
  </TouchableOpacity>
  {greeting !== '' && <Text>{greeting}</Text>}
</View>

// styles
box:    { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
input:  { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
button: { '#4a90e2', borderRadius: 8, padding: 12, alignItems: 'center' },
```

이 흐름이 로그인 화면의 뼈대다.

### 6-2. 실습 ⑤ — 로그인 화면 (50~56p)

오늘 배운 StyleSheet · Flexbox · TextInput · TouchableOpacity · useState를 **모두 합쳐** 로그인 화면을 만든다.
**만들 파일**: `src/Login.tsx` → `App.tsx`에서 `import Login` 후 렌더

**만들 화면**: 화면 가운데 흰 카드 / '로그인' 제목 / 이메일 입력칸 / 비밀번호 입력칸(●●●로 가림) / 로그인 버튼 / 결과 메시지(비면 안내, 채우면 환영)

```tsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      setMessage('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }
    setMessage(`${email} 님 환영합니다!`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>로그인</Text>

        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력해 주세요"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        {message !== '' && <Text style={styles.message}>{message}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f2f2f2' },
  card:   { backgroundColor: '#ffffff', borderRadius: 16, padding: 24 },
  title:  { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  label:  { fontSize: 14, color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 16, marginBottom: 16,
  },
  button: {
    backgroundColor: '#4a90e2', borderRadius: 8,
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  message: { marginTop: 16, fontSize: 15, color: '#2c7a2c', textAlign: 'center' },
});

export default Login;
```

**코드 설명** (55p)

| | 포인트 |
|---|---|
| 상태 3개 | `email`·`password` — 두 입력칸의 값 (제어 컴포넌트) / `message` — 버튼을 눌렀을 때 보여줄 안내·환영 문구 |
| `handleLogin` | 입력이 비면 안내 메시지 후 `return`(중단), 둘 다 있으면 환영 메시지를 상태에 저장 |
| 레이아웃·입력칸 | `screen`에 `flex:1` + `justifyContent:'center'` → 카드가 세로 가운데. `value`+`onChangeText`로 상태 연결, 비밀번호는 `secureTextEntry` |
| 버튼·메시지 | TouchableOpacity + onPress로 handleLogin 실행. `{message !== '' && ...}`로 메시지가 있을 때만 표시 |

**결과 점검 체크리스트** (56p)

- ☐ 카드가 화면 세로 가운데에 보이는가?
- ☐ 이메일·비밀번호 입력칸에 글자가 입력되는가?
- ☐ 비밀번호 입력칸이 ●●●로 가려지는가?
- ☐ 빈칸으로 로그인을 누르면 안내 메시지가 뜨는가?
- ☐ 둘 다 채우고 누르면 "○○ 님 환영합니다!"가 뜨는가?
- ☐ 입력칸을 눌렀을 때 키보드가 입력칸을 가리지 않는가?
- ☐ (실험) `secureTextEntry`를 지우면 비밀번호가 그대로 보이는가? → 원복

### 6-3. 실습 ⑥ — 자율: 문의 폼 (57~59p)

로그인 화면에서 익힌 구조(입력칸 + 버튼 + 결과)를 응용해 **문의 폼** 화면을 직접 완성한다.
**만들 파일**: `src/Inquiry.tsx` → `App.tsx`에서 `import Inquiry` 후 렌더

**만들 화면**: 이름 입력칸 / 이메일 입력칸 / 문의 내용 입력칸(여러 줄) / 보내기 버튼 / 버튼 누른 뒤 입력 내용을 아래에 요약

**완성 기준 6가지**

1. 입력칸 3개 이상(이름·이메일·문의), 각각 `useState`로 관리
2. 문의 내용은 `multiline` 사용
3. 이메일칸은 `keyboardType='email-address'`
4. 보내기 버튼은 TouchableOpacity + onPress
5. 버튼 누르면 입력값을 합쳐 결과 메시지 (비면 안내)
6. 스타일은 `StyleSheet.create`로 정의해 적용

**지켜야 할 규칙**: 화면의 모든 글자는 `<Text>` 안에 · 웹 태그(div·p·input)·className은 쓰지 않는다.

**도전 항목** (59p)

1. **글자 수 표시** — `{content.length}`
2. **보낸 뒤 입력칸 비우기** — `setName('')`
3. **버튼 비활성 느낌** — 배열 스타일 + 조건
4. **카드 여러 개로 분리**

> 정답 코드는 제공하지 않는다 — 배운 컴포넌트를 조합해 직접 만든다.

---

## 7. 데이터 연동 (60~68p)

### 7-1. 코드 속 배열에서 서버로 (61p)

앞에서 만든 카페 메뉴 목록의 `menu`는 코드 안에 직접 적은 작은 **'정적 데이터'**. 실제 앱은 데이터가 서버에 있고, 앱이 받아와 보여준다.

```tsx
// 정적 데이터 (지금까지)
const menu = [ { id: 1, name: '아메리카노', price: 4000 }, ... ];

// → 서버에서 받아오기 (오늘)
fetch('http://10.0.2.2:3000/menu')
```

**새로 익힐 것 ①** 서버 주소가 다르다 — localhost가 아니라 **`10.0.2.2`**
**새로 익힐 것 ②** 언제 부르나 — 화면이 뜰 때 한 번 (**`useEffect`**)

> fetch 사용법은 8강 웹과 똑같다 — 새로운 건 주소와 타이밍 둘뿐.

### 7-2. json-server 다시 켜기 (62p)

**① db.json — 메뉴 데이터**

```json
{
  "menu": [
    { "id": 1, "name": "아메리카노", "price": 4000 },
    { "id": 2, "name": "카페라떼",   "price": 4500 },
    { "id": 3, "name": "딸기라떼",   "price": 5000 }
  ]
}
```

**② 설치 & 실행**

```bash
yarn add json-server@0.17.4
```

```json
// package.json scripts
"start": "json-server --watch db.json --host 0.0.0.0"
```

```bash
yarn start
```

> `--host 0.0.0.0` : 에뮬레이터 등 다른 기기에서도 접근 허용.
> 브라우저에서 `http://localhost:3000/menu`로 데이터가 보이면 성공.

### 7-3. RN의 주소 문제 — 10.0.2.2 (63p)

에뮬레이터에서 `'localhost'`는 내 PC가 아니라 **'에뮬레이터 자기 자신'**을 가리킨다.

| | |
|---|---|
| 내 PC | 서버가 여기서 돌고 있음 (`localhost:3000`) |
| 에뮬레이터 | localhost = 자기 자신 → **내 PC 서버에 닿지 못함** |

```tsx
// ❌ 웹 (8강)
fetch('http://localhost:3000/menu')

// ✅ RN
fetch('http://10.0.2.2:3000/menu')
```

안드로이드 에뮬레이터는 **'내 PC(호스트)'를 `10.0.2.2`로 부른다.**

> `localhost` ↔ `10.0.2.2` 차이만 바뀐다 — 나머지(fetch 사용법)는 웹과 똑같다.

### 7-4. HTTP 통신 허용 — usesCleartextTraffic (64p)

안드로이드는 보안을 위해 `http://` 통신을 기본 차단한다(자물쇠 걸린 https만 허용). json-server는 http라 **한 번 허용**해야 한다.

**어디를 고치나**: `android / app / src / main / AndroidManifest.xml`
**무엇을 고치나**: `<application>` 태그 안 `usesCleartextTraffic` 값을 `true`로

```xml
<!-- 바꾸기 전 -->
<application android:usesCleartextTraffic="${usesCleartextTraffic}">

<!-- 바꾼 후 -->
<application android:usesCleartextTraffic="true">
```

> 따옴표 안의 값만 `true`로 — 그 줄 말고 다른 곳은 손대지 않는다.
> 고친 뒤 **`yarn android`로 다시 빌드** — 설정 변경은 새로 빌드해야 적용된다.

### 7-5. useEffect로 화면 뜰 때 한 번 (65p)

데이터는 화면이 처음 뜰 때 한 번만 받아오면 된다 → **`useEffect`** (10강).

```tsx
// ❌ 콜백을 async로 만들면 안 됨
useEffect(async () => { ... }, []);

// ✅ 안에 async 함수를 만들어 즉시 호출
useEffect(() => {
  const load = async () => { ... await ... };
  load();
}, []);
```

- `useEffect(() => {...}, [])` — 의존성 배열 `[]`이면 **처음 한 번만** 실행
- `await`로 서버 응답을 기다리고, **`try/catch`로 실패에 대비**

> 의존성 배열 `[]`을 빠뜨리면 계속 다시 부른다 — 꼭 넣는다.

### 7-6. 상태 · useEffect · fetch — 전체 코드 (66~67p)

```tsx
import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

interface MenuItem { id: number; name: string; price: number }

function MenuList() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch('http://10.0.2.2:3000/menu');
        const data = await res.json();
        setMenu(data);
      } catch (e) {
        console.log('불러오기 실패', e);
      }
    };
    loadMenu();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {menu.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.price}원</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#f2f2f2', borderRadius: 12, padding: 16 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
});

export default MenuList;
```

- 화면을 그리는 부분은 앞 '카드 목록'과 똑같다 — **데이터 출처만 서버로 바뀐 것**
- `res.json()` — 응답을 배열로 바꾼 뒤 `setMenu`에
- `useState<MenuItem[]>([])` — 처음엔 빈 목록, 받아오면 채워진다
- 빈 배열일 땐 아무것도 안 보이다가, `setMenu` 후 목록이 그려진다

### 7-7. 실습 ⑦ — 정적 목록을 서버 데이터로 (68p)

**진행 순서**

1. `db.json` 작성 (menu 배열 — 예시 그대로)
2. `yarn start`로 json-server 실행 (`--host 0.0.0.0`)
3. 정적 menu 배열을 지우고 `useState` + `useEffect` + `fetch`로 교체
4. 주소는 `http://10.0.2.2:3000/menu`
5. 앱을 실행해 메뉴가 그대로 보이는지 확인

**만들 파일**: `src/MenuList.tsx` · `db.json`

**결과 점검** — ☐ json-server가 실행 중인가? ☐ 메뉴 3개가 정적일 때와 목록이 보이는가? ☐ 주소가 `10.0.2.2`로 되어 있는가? ☐ (실험) db.json에 메뉴를 추가하면 앱에도 늘어나는가? ☐ (실험) price를 바꾸면 앱 숫자도 바뀌는가?

---

## 8. 자주 하는 실수 (69p)

**데이터 연동**

- ❌ 주소를 `localhost`로 → **`10.0.2.2:3000`**
- ❌ 서버를 안 켬 → `yarn start` 먼저
- ❌ `useEffect` 콜백을 async로
- ❌ 의존성 배열 `[]`을 빠뜨림
- ❌ `res.json()`을 안 함

**스타일 · 레이아웃**

- ❌ 단위를 붙임 — `'16px'` → `16`
- ❌ 케밥 표기 — `background-color` → `backgroundColor`
- ❌ 가로 배치가 안 됨 — 기본이 column → `flexDirection: 'row'`
- ❌ 퍼센트를 숫자로 — `100` → `'100%'`

**입력 · 버튼**

- ❌ `onChange`를 씀 → **`onChangeText`**
- ❌ `value`만 주고 `onChangeText`를 안 줌
- ❌ 버튼 글자를 Text 없이
- ❌ `onPress`에 함수 즉시 실행 — `handleLogin()` → **`handleLogin`**
- ❌ 비밀번호가 그대로 보임 — `secureTextEntry` 빠뜨림

---

## 9. 오늘 정리 (70p)

- **StyleSheet** — JS 객체 · 카멜 표기 · 단위 없음 — 배열·조건으로 합쳐 적용
- **Flexbox** — 기본 방향이 column — `justifyContent`·`alignItems`·`flex`로 배치
- **입력 · 버튼** — TextInput·TouchableOpacity로 입력받고 반응하는 화면
- **목록 · Ref** — map·FlatList로 목록 렌더링, useRef로 요소 직접 조작
- **데이터 연동** — fetch + useEffect로 json-server 데이터 받기 (`10.0.2.2`)

**다음 →** 화면 이동 & 라이브러리 — 여러 화면을 오가는 Navigation, 기능을 더하는 라이브러리 (13강)
