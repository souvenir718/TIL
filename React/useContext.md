# useContext



### Context란

`context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있다.` - React 공식문서

일반적으로 React에서 데이터는 props를 통해 부모에서 자식에게 전달되지만 어플리케이션 안의 여러 컴포넌트들에게 props를 전달해줘야 하는 경우 **context**를 사용하면 명시적으로 props를 넘겨주지 않아도 공유할 수 있게 해준다.

`useContext`를 호출한 컴포넌트는 **context** 값이 변경되면 항상 리렌더링 된다.



- `createContext` : context 객체를 생성한다.
- `Provider` : 생성한 context를 하위 컴포넌트에게 전달하는 역할을 한다.
- `Consumer` : context의 변화를 감시하는 컴포넌트다.



### 예제

**App.js**

```jsx
import React, { createContext } from "react";
import Children from "./Children";

// AppContext 객체를 생성한다.
export const AppContext = createContext();

const App = () => {
  const user = {
    name: "김수빈",
    job: "개발자"
  };

  return (
    <>
      <AppContext.Provider value={user}>
        <div>
          <Children />
        </div>
      </AppContext.Provider>
    </>
  );
};

export default App;
```



**Component.js**

```jsx
import React from "react";
import { AppContext } from "./App";

const Children = () => {
  return (
      <AppContext.Consumer>
        {(user) => (
          <>
            <h3>AppContext에 존재하는 값의 name은 {user.name}입니다.</h3>	// 김수빈
            <h3>AppContext에 존재하는 값의 job은 {user.job}입니다.</h3>	// 개발자
          </>
        )}
      </AppContext.Consumer>
  );
};

export default Children;

// 아래 방법으로 이용하면 코드가 간결하게 해결된다.

import React, { useContext } from "react";
import { AppContext } from "./App";

const Children = () => {
  const user = useContext(AppContext);
  return (
    <>
      <h3>AppContext에 존재하는 값의 name은 {user.name}입니다.</h3>	// 김수빈
      <h3>AppContext에 존재하는 값의 job은 {user.job}입니다.</h3>		// 개발자
    </>
  );
};

export default Children;
```

