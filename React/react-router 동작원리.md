# react-router 동작원리



## 클라이언트 사이드 라우팅

**클라이언트 사이드 라우팅**이란 서버에게 별다른 요청을 보내지 않고 클라이언트의 브라우저 단에서만 여러 페이지들을 왔다 갔다 방문할 수 있는 기능을 말한다.



### 구현 핵심 요소

- 현재 URL에 맞는 UI를 렌더링할 수 있어야 한다.
- 페이지의 리로드 없이 다른 페이지를 방문할 수 있는 네비게이션 기능이 있어야 한다.
- 사용자의 액션에 의해 URL이 변경될 때 이를 감지하고 처리할 수 있어야 한다.



## \<BrowserRouter>, \<Router> 컴포넌트

**\<BrowserRouter>**는 React 웹 애플리케이션 개발 시 클라이언트 사이드 라우팅을 위해 라우팅 관련 컴포넌트들의 최상단에 위치시켜야 하는 컴포넌트로, `react-router-dom` 패키지에 속해 있다. **\<Router>** 컴포넌트를 래핑한 컴포넌트로 **\<Router>** 컴포넌트를 렌더링할 때, `props`로 `history` 객체를 전달하는데, 이 객체는 history 패키지의 `createBrowserHistory()`함수를 호출함으로써 생성된다.  **history** 객체는 HTML5 history API 기반으로 브라우저에서 쉽게 네비게이션 기능을 구현할 수 있도록 API를 제공한다.



### \<Router>

\<Router> 컴포넌트는 마운트 되는 순간에 props로 전달받은 history 객체의 프로퍼티인 location 객체를 자신의 지역상태에 저장한다. 그리고 props로 전달받은 history 객체를 구독하여 브라우저의 현재 URL이 변경될 때마다 자신의 지역 상태에 해당하는 location 객체가 새로운 location 객체가 되도록 한다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbQoWT9%2FbtqNqdkcKIF%2FUOhoaTws6GK4m0jUeFPucK%2Fimg.png) 



## \<Switch>

**\<Switch>**는 브라우저의 현재 URL과 매칭되는 첫번째 \<Route> 엘리먼트를 렌더링하기 위한 컴포넌트다. RouterContext의 location 객체 정보와 children props로 전달받은 각 자식 엘리먼트의 path props 정보를 하나씩 비교한다. 그 과정에서 첫번째로 매칭되는 \<Route> 자식 엘리먼트를 렌더링한다. 

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkT8DE%2FbtqNouA0hXr%2FQiZXsIGiQTJ6NpwVYiHV6k%2Fimg.png) 



## \<Route>

**\<Route>**는 props로 전달받는 path의 값이 브라우저의 현재 URL과 매칭될 때 특정 컴포넌트를 렌더링하는 컴포넌트다. RouterContext의 location 객체 정보와 props로 전달받은 path 값을 비교한다. 만약 매칭이 된다면 component props로 전달받은 컴포넌트를 렌더링하고 아닐 경우 null을 렌더링한다. 

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpVUsh%2FbtqNmcG9d5u%2FF6P0Hixg6eSt2S9vk8h1x0%2Fimg.png) 



## \<Link>

**\<Link>** 는 페이지의 리로드 없이 네비게이션을 수행하기 위한 컴포넌트다. \<a> 태그로 렌더링되지만, 먼저 preventDefault() 함수를 호출하여 기본 동작을 막고 href에 설정된 경로의 페이지를 리로드 하는 것이다.



## 동작원리

1. 브라우저를 켜서 처음 서버에 접속하면 \<Router> 컴포넌트의 지역 상태가 history.location 객체로 초기화된다.
2. 이제 유저는 \<Link> 컴포넌트에 의해 렌더링된 a태그를 클릭하거나 브라우저의 특정 액션을 수행함으로써 현재 URL을 바꿀 수 있다.(페이지 리로드 없는 네비게이션)
3. 앞서 history 객체를 이용하여 설정해둔 구독 매커니즘에 의해 \<Router> 컴포넌트의 지역 상태인 location 개겣가 새로운 것으로 변겨오딘다.
4. \<Router> 컴포넌트가 리렌더링 되고, 그 결과 RouterContext의 값이 새로 구성되면서 트리의 하위에 존재하는 각종 라우팅 관련 컴포넌트들이 렌더링된다.
   - \<Switch> 컴포넌트는 현재 URL과 자식 엘리먼트들의 path props값을 다시 매칭해서 렌더링할 엘리먼트를 다시 선택한다.
   - \<Route> 컴포넌트는 현재 URL과 path props 값을 다시 매칭해서 match 객체, location 객체, history 객체를 렌더링할 컴포넌트에게 넘겨준다. 이때, match객체와 location 객체는 history 객체와 달리 참조값이 다른 새로운 객체다.



---

[참고1](https://it-eldorado.tistory.com/113)