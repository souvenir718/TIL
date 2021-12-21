# Gatsby.js

**Gatsby.js**는 React 기반의 정적  페이지 생성 프레임워크이다 . 



### 정적 웹페이지란?

이미 가지고 있는 정보를 사용자 별로 가공할 필요 없이 일괄적으로 처리하고 그대로 받아오기만 하면 되는 페이지를 의미한다. 이미 작성되어 있는 데이터를 처리하고 html에 뿌려주기만 하기 때문에 빌드시, 속도가 빠르다. 반면 **동적 웹 페이지**는 사용자 별로 데이터를 가공할 필요가 있는 페이지로, 접속시 조건에 맞는 API 요청을 보내 정보를 받아와야 한다. 

**Gatsby**는 데이터소스를 GraphQL로 가져와서 빌드 시점에 미리 포함시켜 버리는 것이기 때문에 포스트를 불러오는 API 서버가 필요하거나 하지 않다. 

블로그의 대부분이 이미 작성된 포스트를 보여주기만 하면 되기 때문에 정적 웹 페이지로 가능하다. 그러나 동적으로 관리해야 되는 부분이 바로 **댓글**이다. 미리 저장할 수 없고, 사용자가 작성하는 시점에 생기는 데이터다. 댓글의 경우는 댓글만 다루는 플러그인으로 관리할 수 있다.



## JAM stack

**Gatsby**는 **JAM Stack**을 활용한 정적 사이트 생성기이다. **JAM Stack**은 Javascript, API, MarkUp Stack의 약자로 Javascript와 API, HTML이나 CSS를 칭하는 MarkUp으로 이루어진 웹 구성 방법이다.



### 동작 원리

![](https://cdn.inflearn.com/public/files/courses/326897/units/75995/0a45a363-2b26-4848-bdc9-a6d05bbe367c/gatsby-lecture-1-1-2.png)

왼쪽 그림과 같이 기존 웹 사이트의 방식은 대부분 서버의 DB 또는 CMS(Content Management System)에서 추출한 데이터를 Front에 뿌려주는 방식이다. 그림과 같이 Client에 데이터를 보여주기 위해 많은 절차를 거쳐야 한다. 그러나 **JAM Stack**을 사용한 방식은 절차가 간단하다.

**JAM Stack**은 CDN(Content Delivery Network)을 통해 웹사이트를 열람할 수 있다.



### 장점

1. 기존 방식보다 빠르게 웹사이트를 제공할 수 있다.

   **JAM Stack**은 렌더링할 화면들을 모두 Pre-Render하여 제공하기 때문에 사용자에게 화면을 보여주기 위해 준비하는 시간을 단축할 수 있다.

![](https://www.bottlehs.com/assets/jamstack-advantage-2.png)

2. 안전한 웹 사이트를 제공할 수 있다.

   **JAM Stack**은 API를 통해 정적 사이트를 생성한다.

   ![](https://www.bottlehs.com/assets/jamstack-advantage-1.png)

   여기서 사용하는 API는 JAM Stack을 활용한 각 프레임워크에서의 마이크로서비스로서, 사이트 생성을 위한 프로세스가 추상화되어 있으므로 공격 노출 범위가 감소하게 된다.



3. 스케일링하기 쉬운 웹사이트를 제공할 수 있다.

   정적 웹사이트에서의 스케일링은 더 많은 지역에서 홈페이지를 제공할 수 있게 하는 의미인데, 미리 빌드된 파일 제공을 담당하는 CDN 서버를 구축하면 비용을 줄일 수 있다.

   ![](https://www.bottlehs.com/assets/jamstack-advantage-3.png)



## Gatsby 특징



### 검색 엔진 최적화와 성능

Javascript가 실행되면 빈 HTML 페이지 안에 마크업을 추가해주는 SPA와 다르게 개발 후 Build 과정에서 마크업이 생성된다. 페이지 내 모든 콘텐츠가 있기에 SEO(Search Engine Optimization)을 잘 챙겨갈 수 있다.

**Gatsby**는 단순히 정적페이지가 아니라 필요에 따라 CSR(Client Side Rendering)과 SSR(Server Side Rendering), lazy loading을 적절히 섞어 사용할 수 있다.





## 개념소개

아래의 그림처럼 **DATA Sources**, **Build**, **Deploy** 세단계로 나눌 수 있다.

![](https://blog.outsider.ne.kr/attach/1/x9607203875.gif.pagespeed.ic.7kg7-qF6Il.png)



### Data Sources

여기서 데이터 소스는 CMS 도구가 될 수 있고 Markdown 파일이나 API를 말한다.



### Build

**Gatsby**는 기본적으로 **GraphQL**을 사용해서 데이터를 가져온다. 코드의 경우는 **React**를 이용해서 컴포넌트 작성하듯이 사용하지만, 공통 레이아웃을 관리하거나 페이지를 생성하거나 데이터 소스와 컴포넌트를 연결하는 기능을 **Gatsby**에서 제공하고 있다.



### Deploy

CMS나 파일 등의 데이터 소스를 GraphQL로 가져와 빌드할 때 정적파일의 데이터로 포함한다.





---

[참고자료](https://velog.io/@mnz/Gatsby-Gatsby-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)