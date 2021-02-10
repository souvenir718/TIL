

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

페이지 주소를 정의할 때는 파라미터와 쿼리 이렇게  두가지 방법으로 나뉘어 진다.

```
파라미터 : /profiles/velopert
쿼리 : /about?details=true
```

일반적으로 파라미터는 **특정 id나 이름**을 가지고 조회할 때 사용하고, 쿼리의 경우는 어떤 키워드를 **검색**하거나, 요청을 할 때 **필요한 옵션을 전달**할 때 사용된다.



### URL Params

**Profile** 페이지에서 파라미터를 사용해보면 `/profiles/velopert` 이런식으로 username을 넣어줄 때 해당 값을 파라미터로 받아올 수 있다.

#### src/Profile.js

```react
import React from 'react';

// 프로필에서 사용 할 데이터
const profileData = {
  velopert: {
    name: '김민준',
    description:
      'Frontend Engineer @ Laftel Inc. 재밌는 것만 골라서 하는 개발자'
  },
  gildong: {
    name: '홍길동',
    description: '전래동화의 주인공'
  }
};

const Profile = ({ match }) => {
  // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조합니다.
  const { username } = match.params;
  const profile = profileData[username];
  if (!profile) {
    return <div>존재하지 않는 유저입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
```

  파라미터를 받아올 땐 **match** 안에 들어있는 params 값을 참조한다. **match** 객체 안에는 현재의 주소가 `Route` 컴포넌트에서 정한 규칙과 어떻게 일치하는지에 대한 정보가 들어있다.

  아래는 `Profile`을 `App` 에서 적용해보는 코드다. path 규칙에는 `/profiles/:username` 이라고 너어주면 username에 해당하는 값을 파라미터로 넣어주어서 `Profile` 컴포넌트에서 **match props**를 통하여 전달받을 수 있다.

```react
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';

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
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default App;
```



### Query

  **Query**는 Route 컴포넌트에게 props에 전달되는 **location** 객체에 있는 **seach** 값에서 읽어올 수 있따. **location** 객체는 현재 앱이 갖고 있는 주소에 대한 정보를 지니고 있다.

```json
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

  **search** 값은 문자열 형태로 되어있다. 이 값을 객체형태로 변환해주어야 하는데 이것은 `qs` 라는 라이브러리로 쉽게 할 수 있다.

```
$ yarn add qs
```

 `About` 컴포넌트에서 **search** 값에 있는 detail 값을 받아와서 해당 값이 `true`일 경우 추가정보를 보여주도록 구현한다.

#### src/About.js

```react
import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const detail = query.detail === 'true'; // 쿼리의 파싱결과값은 문자열입니다.

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.</p>
      {detail && <p>추가적인 정보가 어쩌고 저쩌고..</p>}
    </div>
  );
};

export default About;
```





## 서브 라우트

  **서브 라우트**는 라우트 내부의 라우트를 만드는 것이다. 



### 서브 라우트 만들어보기

  `Profiles` 컴포넌트를 만들어서 그 안에 유저들의 프로필 링크들과 프로필 라우트를 함께 렌더링 해보자.

#### src/Profiles.js

```react
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>유저를 선택해주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

  위 코드에서 첫번째 **Route** 컴포넌트에서 `component` 대신에 `render`가 사용되었다. 이처럼 컴포넌트뿐 아니라 **JSX** 자체를 렌더링할 수 있다. 그 다음, `Profiles` 를 위한 링크와 라우트를 `App`에서 생성해준다.(기존에 있던 `Profiles` 라우트는 제거한다.)

```react
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';

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
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
    </div>
  );
};

export default App;
```

 

## 리액트 라우터 부가기능



### 1. history 객체

  **history** 객체는 라우트로 사용된 컴포넌트에게 `match`, `location`과 함께 전달되는 **props** 중 하나다. 이 객체를 통하여, 컴포넌트 내에 구현하는 메소드에서 라우터에 직접 접근할 수 있다. (ex. 뒤로가기, 특정 경로로 이동, 이탈 방지 등..)



#### src/HistorySample.js

```react
import React, { useEffect } from 'react';

function HistorySample({ history }) {
  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    console.log(history);
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
}

export default HistorySample;
```



#### src/App.js

```react
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

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
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/history" component={HistorySample} />
    </div>
  );
};

export default App;
```



### 2. withRouter HoC

  **withRouter HoC**는 라우트 컴포넌트가 아닌 곳에서 `match`, `location`, `history` 를 사용할 때 쓰면 된다.

#### src/WithRouterSample.js

```react
import React from 'react';
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

  위의 컴포넌트를 `Profiles`에서 렌더링 해보자.

#### src/Profiles.js

```react
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>유저를 선택해주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
```

  **withRouter**를 사용하면 자신의 부모 컴포넌트 기준의 `match` 값이 전달된다. 



### 3. Switch

  **Switch**는 여러 `Route` 들을 감싸서 그 중 규칙이 일치하는 라우트 단 하나만을 렌더링 시켜준다. **Switch**를 사용하면 아무것도 일치하지 않았을때 보여줄 **Not Found** 페이지를 구현할 수 있다.

#### App.js

```react
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

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
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route
          // path 를 따로 정의하지 않으면 모든 상황에 렌더링됨
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
```



### 4. NavLink

  **NavLink**는 `Link`랑 비슷한데 만약 현재 경로와 `Link`에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용할 수 있는 컴포넌트다.

#### src/Profiles.js

```react
import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <NavLink
            to="/profiles/velopert"
            activeStyle={{ background: 'black', color: 'white' }}
          >
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profiles/gildong"
            activeStyle={{ background: 'black', color: 'white' }}
          >
            gildong
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>유저를 선택해주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
```

  만약 스타일이 아니라 CSS 클래스를 적용하고 싶을때는 `activeStyle` 대신 `activeClassName`을 사용하면 된다.



### 5. etc

**o Redirect **: 페이지를 리디렉트 하는 컴포넌트

**o Prompt **: 이전에 사용했던 hisory.block의 컴포넌트 버전

**o Route Config **: JSX 형태로 라우트를 선언하는 것이 아닌 `Angular`나 `Vue`처럼 배열 / 객체를 사용하여 라우트 정의하기.

**o Memory Router **: 실제로 주소는 존재하지 않는 라우터로, 리액트 네이티브나 임베디드 웹앱에서 사용하면 유용하다.



**[출처](https://react.vlpt.us/react-router/02-params-and-query.html)**