# HTTP API



## HTTP

: Hyper Text Transper Protocol, 링크기반(URL)으로 데이터를 요청하고 받겠다는 통신 규약(Protocol)



### HTTP 동작방식

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnIwua%2FbtqC3rtkCRo%2FWVw2qw2qkGYo67ZO23xZu0%2Fimg.png) 



### 특징 및 기능

#### 1. 비연결성(Connectless) + 비상태성(stateless)

: 1번 요청 - 1번 응답 후 연결 해제 (일회성, 비연결성)

- 클라이언트의 이전 상태를 알 수 없다(비 상태성) → 쿠키/세션으로 이전 정보 저장
- 수많은 클라이언트들이 서버로 요청하더라도 최소유지 가능

#### 2. Keep-Alive: HTTP/1.1부터 지원하는 기능

: HTTP의 비연결성을 극복하기 위한 기능

- 지정된 시간동안 연결상태 유지
- 시간안에 클라이언트 재요청시 기존 연결을 이용



### HTTP 요청 패킷 구조

: 요청은 클라이언트 → 서버로 보내는 메시지

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCTmOL%2FbtqC4uJQIqT%2F0q7bYu7IjOsQ4vs02kRSc1%2Fimg.png) 

#### Request Line: 요청 방식(Method) / URI / HTTP 버전

#### Header: 사용자 정보(클라이언트 정보, 요청Body 데이터타입, 응답Body 타입, 문자코드 등)

#### 공백: 헤더와 바디의 구분을 위한 공백(White Space)

#### Body: HTTP Request 요청 메시지(Data)를 담고 있는 부분

- GET 메소드일 경우, 요청 URL에 모두 표현하기에 Body는 빈공간



### HTTP 응답 패킷 구조

: 응답은 서버 → 클라이언트로 보내는 메시지

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FARxV3%2FbtqCZ0DIsvH%2FW7NIWvqPG9yFBMAuKGTbfk%2Fimg.png) 

#### 상태라인: 요청에 대한 처리결과(HTTP 버전 / 응답코드 / 응답메시지 등)

#### Header: 사용자에게 전달한 응답 데이터 정보(데이터 타입, 길이 등)

#### 공백 : 헤더와 바디 구분

#### Body: 요청에 대한 응답데이터, 사용자에게 전달할 데이터 실제 내용 '페이로드'

