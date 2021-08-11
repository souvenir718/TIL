# Hook

## Life Cycle

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



---

### 참고

1. [기억보다 기록을](https://kyounghwan01.github.io/blog/React/react-hook/#usestate)