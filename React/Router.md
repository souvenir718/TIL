# Router



## 기본적인 사용법

### 준비 및 적용

프로젝트 디렉토리에서 라우터 관련 라이브러리를 설치한다.

```
yarn add react-router-dom
```



라우터 적용은 `index.js`에서 `BrowserRouter`라는 컴포넌트를 사용하여 구현한다.

#### index.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // * BrowserRouter 불러오기
import App from './App';

// * App 을 BrowserRouter 로 감싸기
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```



### Route : 특정 주소에 컴포넌트 연결

사용자가 요청하는 주소에 따라 원하는 컴포넌트를 연결한다.

```react
<Route path="주소" component={컴포넌트 이름}/>
```



#### App.js

```react
import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

  위와 같이 작성했을 때, `/` 경로로 들어가면 `Home` 컴포넌트가 나오고 `/about` 경로로 들어가면 `About` 컴포넌트와 `Home` 컴포넌트가 나온다.

  이는 `/about` 경로가 `/` 규칙과도 일치하기 때문에 발생한 현상이다. 아래와 같이 `exact`를 사용하여 고칠 수 있다.

```react
import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```



### Link : 누르면 다른 주소로 이동

  `Link` 컴포넌트는 클릭하면 다른 주소로 이동시키는 컴포넌트다. 리액트 라우터를 사용할땐  일반 `<a href="...">...</a>` 태그를 사용하면 안된다.  그 이유는 `a` 태그의 기본적인 속성은 페이지를 이동시키면서 아예 새로 불러온다. 이렇게 되면 리액트 앱이 지니고 있는 상태들도 초기화되며 랜더링된 컴포넌트도 모두 사라지고 새로 랜더링 하게 된다. `Link` 컴포넌트는 **HTML5 History API**를 사용하여 브라우저의 주소만 바꿀뿐 페이지를 새로 불러오지 않는다.

```react
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```



## 파라미터와 쿼리

https://react.vlpt.us/react-router/02-params-and-query.html