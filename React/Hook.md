# Hook

## Life Cycle

리액트는 컴포넌트 기반의 View를 중심으로 한 라이브러리다. 각각의 컴포넌트에는 라이프사이클(수명주기)가 존재하고 수명은 보통 페이지에서 렌더링되기 전 준비과정에서부터 페이지에서 사라질때 끝이 난다. 컴포넌트가 처음 실행될때인 Mount, 데이터에 변화가있을때인 Update, 컴포넌트가 제거 될때인 Unmount이렇게 세개로 나눌 수 있다.

- 마운트 : DOM이 생성되고 브라우저 상에서 나타나는 것을 뜻한다.
- 업데이트 
  - props가 바뀌는 경우
  - state가 바뀌는 경우
  - 부모 컴포넌트가 리렌더링 되는 경우
  - 강제로 렌더링할 경우
- 언마운트 : DOM에서 제거되는 것을 뜻한다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F7lN4q%2FbtqzrHl8aDe%2FEtexE1KAyeO0GK31awPcW0%2Fimg.png) 





## 규칙

1. 리액트 함수의 제일 상단에 작성한다.
   - 조건문, 내부함수, 반복문 안에서는 사용하지 않는다.
2. 리액트 함수 안에서만 사용한다.



## useState

1. useState에 여러 state값을 넣는 예시

```jsx
import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: ""
  });

  // 비구조화 할당을 통한 값 추출
  const { name, nickname } = inputs; 

  const onChange = e => {
    const { value, name } = e.target; 
    // 기존 값을 복사 후 변경할 값만 변경
    setInputs({
      ...inputs, 
      [name]: value
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: ""
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```



2. 배열인 state일 때

   - 배열에 불변성을 지키면서 값을 추가할 때

   ```jsx
   setArray([...array, newArray]);
   
   // 다른 방법으로는 concat 함수를 이용하여 재할당하는 방법
   setArray(array.concat(user));
   ```

   - 배열의 특정 요소를 제거할 때

   ```jsx
   const onRemove = id => {
       setArray(array.filter(user => user.id !== id))
   }
   ```

   - 배열의 특정 값을 수정할 때

   ```jsx
   const onToggle = id => {
       setArray(
       	array.map(user => user.id === id ? {...user, active: !user.active} : user)
       )
   }
   ```

   

## useRef

1. 리액트에서 특정 `dom`을 선택할 때(class에서는 `React.createRef`를 사용)

```jsx
function refEx() {
  const nameInput = useRef();

  const onReset = () => {
    nameInput.current.focus();
  };

  return (
    <input
      name="name"
      placeholder="이름"
      onChange={onChange}
      value={name}
      ref={nameInput}
    />
  );
}
```

> **ref**객체의 `.current` 값은 우리가 원하는 `dom`을 가리키고 `input`을 포커싱하는 `focus`메소드를 호출한다.



2. 컴포넌트 안에서 조회 및 수정하는 변수를 관리
   - 스크롤위치, window 함수(`setTimeout, setInterval`) 값은 컴포넌트 변수로 관리가 불가능하다.
   - **이를 통해서는 컴포넌트가 리랜더링 되지 않는다.**
   - 값 변경에 따라 렌더될 필요 없는 state에 적절하다.

```jsx
const scrollHeight = useRef(100);

const scrollHeightReset = () => {
    scrollHeight.current = 0;
}
```



## useEffect

컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 하는 Hook이다.

- 컴포넌트가 마운트되거나 언마운트 혹은 업데이트 됐을때, 특정 작업을 처리할 수 있다.
- 첫번째 인수로 실행할 콜백함수를 넣고 두번째 인수로 검사하고자 하는 특정 값이나 빈 배열을 넣는다.
- 의존성 배열 검사할 때 얕은 비교를 진행한다.
  - 참조 타입인 객체, 배열, 함수의 경우 내부 프로퍼티가 동일하다하여도 리렌더링이 발생한다.
  - useCallback을 써서 참조 대상인 함수가 리렌더링이 발생할 때마다 새롭게 생성하지 않도록 한다.

```jsx
useEffect(() => {
  console.log("컴포넌트가 화면에 나타남");
  console.log("마운트");
  return () => {
    console.log("컴포넌트가 화면에서 사라짐");
    console.log("언 마운트");
  };
}, []);
// 마지막 배열 없으면 처음 시작할때만 호출 (componentdidmount)
// 마지막 배열 없으면 컴포넌트 사라질때 cleanup 함수 호출됨
```

> 마운트시에 하는 주요 작업
>
> - `props`로 받은 값을 컴포넌트의 로컬 상태로 설정
> - 외부 API 요청(REST API 등)
> - 라이브러리 사용(D3, Video.js 등..)
> - `setInterval`을 통한 반복작업, `setTimeout`을 통한 작업 예약

> 언마운트시에 하는 주요 작업
>
> - `setInterval`을 통한 반복작업, `setTimeout`을 통한 작업 clear하기(`clearInterval`, `clearTimeout`)
> - 라이브러리 인스턴스 제거



## useLayoutEffect

: DOM이 변경되고나서 동기적으로 실행이 된다. 브라우저가 화면을 그리기 전에 실행이 되기 때문에 스크롤 위치를 얻어오거나 다른 DOM 엘리먼트의 스타일을 조작할 때 사용하면 효율적이다.

- DOM이 업데이트 되면 바로 동기적으로 실행이 되고 이 과정은 브라우저가 화면에 렌더링하기 이전에 수행되어 사용자는 업데이트 되기 전의 화면을 보지 않게 된다.



### useEffect vs useLayoutEffect

: 렌더링 이전에 무언가를 하고 싶다면 `useLayoutEffect`를 사용하고 렌더링 이후에 무언가를 하고 싶다면 `useEffect`를 사용

- useEffect
  - 화면에 그려진 후 비동기적으로 실행된다. 따라서 이벤트 핸들러 설정과 같이 렌더링 이후에 진행해야하는 작업에 적합하다.
  - 컴포넌트 렌더링 - 화면 업데이트 - useEffect 실행
  - 비동기적 실행
- useLayoutEffect
  - 렌더링 직후 화면이 업데이트 되기 전에 동기적으로 실행된다. 따라서 DOM 변경과 같이 렌더링이 이루어지기 전에 진행해야 하는 작업에 적합하다.
  - 컴포넌트 렌더링 - useLayoutEffect - 화면 업데이트
  - 동기적으로 실행
  - 렌더링 직후 DOM요소의 값을 읽을 때 유용



## useMemo - 연산한 값 재사용

- 성능 최적화를 위해 연산된 값을 **useMemo** 훅으로 재사용한다.
- 다른 함수에 의해 리렌더링으로 불필요하게 호출되는 함수를 **useMemo**로 감싼다.

```jsx
// users값이 바뀌지 않았다면 한번만 호출됨
const count = useMemo(() => countActiveUsers(users), [users]);

const result = useMemo(() => sum(stringList), [stringList, sum]);
```



## useCallback - 함수 재사용

- **useMemo**는 특정 변수에 대한 결과값을 재사용하면, **useCallback**은 특정 함수를 새로 만들지 않고 재사용할 때 사용한다.

- 보통 컴포넌트 내 함수들은 컴포넌트가 리렌더링될때마다 새로 만들어진다.

```jsx
const onRemove = id => {
  setUsers(users.filter(user => user.id !== id));
};

// 위에서 아래처럼사용

const onRemove = useCallback(
  id => {
    setUsers(users.filter(user => user.id !== id));
  },
  [users]
);
```



### React.memo

`useCallback` 사용만으로 하위 컴포넌트의 리렌더링을 막을 수 없다. 하위 컴포넌트가 참조 동일성에 의존적인, 최적화된 Purecomponent이어야만 불필요한 리렌더링을 막을 수 있다.

`React.memo`는 `shouldComponentUpdate` 가 기본으로 내장된 함수형 컴포넌트로 보면 된다. 얕은 비교 연산을 통해 동일한 참조 값의 prop이 들어온다면 리렌더링을 방지시킨다.

`React.memo`는 고차 컴포넌트(HOC:Higher Order Component)로 `React.PureComponent`와 비슷하지만 class가 아니라 함수형 컴포넌트이다. 함수 컴포넌트가 동일한 props로 동일한 결과를 렌더링한다면, `React.memo`를 호출하고 결과를 메모이징하도록 래핑하여 성능향상을 확인할 수 있다. 

`React.memo`는 props 변화에만 영향을 준다. props가 갖는 복잡한 객체에 대하여 얕은 비교만을 수행하는 것이 기본 동작이며 다른 비교 동작을 원한다면 두번째 인자로 별도의 비교 함수를 제공하면 된다.

> **shouldComponentUpdate()**
>
> : props 또는 state가 새로운 값으로 갱신되어서 렌더링이 발생하기 직전에 호출된다.



---

### 참고

1. [기억보다 기록을](https://kyounghwan01.github.io/blog/React/react-hook/#usestate)