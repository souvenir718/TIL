# URL & URI

<img src="https://media.vlpt.us/images/jch9537/post/51dcc312-8ecb-4048-80df-cbde40865e7a/image.png" style="zoom:80%;" />

  위에 그림에서 보이는 것처럼 URI는 URL과 URN을 포함하고 있다.

- URI는 Uniform Resource Identifier
- URL은 Uniform Resource Locator
- URN은 Uniform Resource Name

의 약자다. 자원의 식별자(URI), 위치(URL), 이름(URN)으로 유추할 수 있다.



### URI : 통합 자원 식별자

  인터넷에 있는 자원을 나타내는 유일한 주소다. **URI**의 존재는 인터넷에서 요구되는 기본조건으로서 인터넷 프로토콜에 항상 붙어다닌다. **UR**I의 하위개념으로 URL, URN이 있다.



### URL : 파일식별자, 유일 자원 지시기

  네트워크 상에서 자원이 어디 있는지를 알려주기 위한 규약이다. 즉, 컴퓨터 네트워크와 검색 메커니즘에서의 위치를 지정하는 웹 리소스에 대한 참조다. 흔히 웹 사이트 주소로 알고 있지만, **URL**은 웹 사이트 주소뿐만 아니라, 컴퓨터 네트워크상의 자원을 모두 나타낼 수 있다. 그 주소에 접속하려면 해당 URL에 맞는 프로토콜을 알아야 하고, 그와 동일한 프로토콜로 접속해야 한다.



### URN : 통합 자원 이름

  **URN**은 콘텐츠를 이루는 한 리소스에 대해, 그 리소스의 위치에 영향 받지 않는 유일무이한 이름 역할을 한다. **URN**은 리소스를 여기저기 옮기더라도 문제없이 동작한다. 리소스가 그 이름을 변하지 않게 유지하는 한, 여러 종류의 네트워크 접속 프로토콜로 접근해도 문제없다.

> **URN**은 아직 채택되지 않았으나 **URL**의 한계로 인해 착수되었다. **URL**은 주소로, 실제 이름이 아니다. 이 뜻은 특정 시점에 어떤것이 위치한 곳을 알려주는 것이다. 예를 들면 **http://mygumi.tistory.com/19** 링크가 있을때, 주소를 **http://mygumi.tistory.com/test/19**로 **URL**을 바꾸었다면, 다른 사람은 페이지를 찾을 수 없게 된다. 이런식으로 리소스가 옮겨지면 해당 **URL**로는 더이상 찾을 수가 없다. 이런 문제를 예방할 수 있는 방법은 리소스의 위치와 상관없이 그 리소스를 가리키는 실제 이름을 사용하는 것이다.(**URN**)

<img src="https://media.vlpt.us/images/jch9537/post/88b0c8ac-5870-4cbc-b613-7dd39f510f31/image.png" style="zoom:67%;" />

  위의 예시에서 보면, **http://opentutorials.org:3000/main** 여기까지는 URL이고(URI이기도 하다.) **http://opentutorials.org:3000/main?id=HTML&page=12** 이건 URI이다. 이유는 **URL은 자원의 위치**를 나타내주고, **URI는 자원의 식별자인데** `?id=HTML&page=12`는 위치를 나타내는 것이 아닌 `id`값이 `HTML`이고 `page`가 `12`인 것을 나타내주는 식별하는 부분이기 때문이다.



### 차이에 대한 이해를 위한 다른 예

  '**자원의 위치**'라는 것은 결국 '**하나의 파일 위치**'를 나타낸다.

- **http://img0.gmodules.com/ig/images/korea/logo.gif** 는 **logo.gif**라는 인터넷 상의 자원 위치를 의미한다. 이는 **URI**이면서 **URL**이라고 말할 수 있다.

- **http://endic.naver.com/endic.nhn?docid=1232950** 에서는 **http://endic.naver.com/**란 서버에 위치한 `endic.nhn`파일은 query string인 `docid`의 값에 따라 여러가지 결과는 나타낸다. 여기서 **URL**은 `endic.nhn`의 위치를 표기한 **http://endic.naver.com/endic.nhn**까지이다. 내가 원하는 정보에 도달하기 위해서는 `?docid=1232950`이라는 식별자가 필요하다. 결국 위의 **http://endic.naver.com/endic.nhn?docid=1232950** 주소는 **URI**이긴 하지만 **URL**은 아니다.





---

**출처**

1. https://mygumi.tistory.com/139
2. https://velog.io/@jch9537/URI-URL