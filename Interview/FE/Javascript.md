# Javascript



## 브라우저 렌더링 과정

1. 사용자가 특정 페이지에 접속하여 HTML을 서버로부터 내려받으면, 브라우저의 엔진에서는 이를 파싱한다.
2. HTML 파싱을 진행하면서 DOM 트리를 만든다. 이때 StyleSheet를 내려받으며 CSS 파싱을 통해 CSSOM(CSS Object Model) 트리를 만든다.
3. DOM 트리와 CSSOM 트리를 결합하여 렌더 트리를 만들고 화면을 뿌려준다.
4. 위 과정을 진행하면서 javascript를 만나면 자바스크립트 런타임 환경에 넘겨 결과 값을 받는다.
   - 이 과정 중 DOM 파싱은 중단된다.
5. 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의 수치를 재계산하여 렌더 트리를 재생성하는 과정을 `Reflow` 과정이라고 하면 이 과정이 끝난 후 재생성된 렌더 트리를 다시 그리게 되는데 이 과정을 `Repaint`라고 한다
   - Reflow가 이루어졌다고 항상 Repaint가 되는 것은 아니며, `background-color`, `visibility`, `outline` 등 레이아웃 수치에 영향을 끼치지 않는 것은 repaint 과정만 진행한다.



## 화살표 함수

화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 일반 함수와 달리 언제나 상위 스코프의 this를 가리킨다.`Lexical this`라고 한다. 화살표함수는 프로토타입 프로퍼티를 가지고있지않기때문에 생성자 함수로 사용이어렵고, (일반함수는 생성자 함수로 사용 가능) 일반함수에서는 함수가 실행될때 암묵적으로 arguments변수가 전달되어 사용할 수 있지만, 화살표 함수에서는 arguments변수가 전달되지않는다.

```javascript
let obj = {
  myVar: 'foo',
  
  myFunc: function() { 
    console.log(this.myVar);   // foo
 
    setTimeout(function() {
      console.log(this.myVar); // undefined
    }, 1000)
  }
}
obj.myFunc();

// bind를 사용한 해결
let obj = {
  myVar: 'foo',
  
  myFunc: function() { 
    console.log(this.myVar);	// foo
  
    setTimeout(function() {
      console.log(this.myVar);	// foo
    }.bind(this), 1000)
  }
}
obj.myFunc()

// 화살표함수를 통한 해결
let obj = {
  myVar: 'foo',
  
  myFunc: function() { 
    console.log(this.myVar);	// foo
  
    setTimeout(() => {
      console.log(this.myVar);	// foo
    }, 1000)
  }
}
obj.myFunc()
```



## 호이스팅

: 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것

- 자바스크립트 함수는 실행되기 전에 함수 안에 필요한 변수값들을 모두 모아서 **유효 범위의 최상단**에 선언한다.
  - 자바스크립트 Parser가 함수 실행 전 해당 함수를 훑는다.
  - 함수 안에 존재하는 변수/함수 선언에 대한 정보를 기억하고 있다가 실행시킨다.
- 함수 내에서 아래쪽에 존재하는 내용 중 필요한 값들을 끌어올린다.
  - 실제 메모리와 코드에는 변화가 없음. Parser 내부적으로 끌어올려서 처리



### 대상

- var 변수 선언과 함수선언문에서만 호이스팅이 일어난다.
  - var 변수/함수의 선언만 끌어올려지며, 할당은 끌어올려지지 않는다.
  - let/const 변수 선언과 함수표현식에서는 호이스팅이 발생하지 않는다.

```javascript
/*
	var 변수 vs let/const 변수
*/
console.log('hello');
var myname = 'subin';
let myname2 = 'subin2';

// 호이스팅 결과

var myname;				// 호이스팅
console.log('hello');
myname = "subin";		// 할당
let myname2 = 'subin2'
```



### 함수선언문과 함수표현식의 차이

- 함수선언문은 호이스팅에 영향을 받지만, 함수표현식은 호이스팅에 영향을 받지 않는다.
  - **함수선언문**은 코드를 구현한 위치와 관계없이 호이스팅에 따라 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어 올려진다.
  - **함수표현식**은 함수선언문과 달리 선언과 호출 순서에 따라서 정상적으로 함수가 실행되지 않을 수 있다.

```javascript
/*
	함수선언문 vs 함수표현식
*/
foo();
foo2();

function foo() {			// 함수선언문
    console.log('foo');
}
var foo2 = function() {		// 함수 표현식
    console.log('foo2');
}

// 호이스팅 결과

var foo2;

function foo() {			// 함수선언문
    console.log('foo');
}

foo();
foo2(); // Error;

foo2 = function() {		// 함수 표현식
    console.log('foo2');
}
```



### var vs let vs const

|                      | var  | let  | const |
| :------------------: | :--: | :--: | :---: |
|     global scope     |  O   |  X   |   X   |
|     script scope     |  X   |  O   |   O   |
| function local scope |  O   |  O   |   O   |
|     block scope      |  X   |  O   |   O   |
|        재선언        |  O   |  X   |   X   |
|        재할당        |  O   |  O   |   X   |



### 블록스코프

: 블록`{}` 이 생성될 때마다 새로운 스코프가 형성되는 것을 의미한다.

- 블록 스코프 레벨에서 선언된 변수는 외부에서 사용이 불가능하며 해당 개념은 일반적인 스코프의 개념과 동일하다.
- 블록 스코프 레벨 변수 생성 키워드로는 `let/const`가 있다.

<br/>



## this

: this는 자신이 소한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.

this는 함수를 호출할 때 결정된다(호출 방식에 따라 특정 객체를 바인딩한다). 함수를 호출할 때 this가 특별한 동작을 하지 않을때는 보통 window를 호출한다. 함수를 호출할 때, 객체가 붙을 경우에는 `this`는 객체가 된다. 

```javascript
const obj = {
    name: 'subin',
    sayName() {
        console.log(this.name);
    }
};

obj.sayName(); // subin
const sayN = obj.sayName;
sayN(); // ''

const obj = {
    name: 'subin',
    sayName: () => {
        console.log(this.name);
    }
};
obj.sayName(); // ''
// 화살표 함수일 경우 this는 window를 가르킨다.

function Human(name){
    this.name = name;
}
new Human('subin');
// this는 객체 자기 자신을 가르킨다. Human { name: 'subin'}

function sayName(){
    console.log(this.name);
}
sayName(); // ''
sayName.bind({name: 'subin'})()	// subin
sayName.apply({name: 'subin'})	// subin
sayName.call({name: 'subin'})	// subin
```

### apply, call, bind가 무엇이고 왜 사용하는지

- apply와 call은 this를 바인딩할 때 사용하며, 매개변수가 apply는 배열, call은 배열이 아닌 차이점이 있다.
- bind는 함수를 실행하는 것이 아닌 새로운 함수를 리턴해주기때문에 실행을 위해서는 따로 호출해줘야한다.



## closure

: 자신을 감싸고 있는 외부 함수의 변수에 접근할 수 있는 내부의 함수를 모두 클로저라 하며, 이러한 클로저의 사용을 통해 전역 변수의 사용을 억제하 수 있고 OOP의 장점인 캡슐화가 가능하여 데이터의 은닉화가 가능하다.

: 클로저는 독립적인 변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 `기억한다.`(MDN)

흔히 함수 내에서 함수를 정의하고 사용하면 클로저라고 하며, 대개 정의한 함수를 리턴하고 사용은 바깥에서 한다.

```javascript
function getClosure(){
    const text = 'closure';
    return function(){
        return text;
    }
}
const closure = getClosure();
console.log(closure()); // closure
```

위의 코드에서 정의한 `getClosure()`는 함수를 반환하고 반환된 함수는 내부에서 선언된 변수를 참조하고 있다. 이 참조된 변수는 함수 실행이 끝났다고 해서 사라지지 않고, 제대로 값을 반환하는 것을 볼 수 있다.

#### 클로저를 통한 은닉화

```javascript
function Hello(name){
    this._name = name;
}

Hello.prototype.say = function(){
    console.log(`Hello ${this._name}`);
}

const hello1 = new Hello('수빈');
const hello2 = new Hello('빈수');

hello1.say(); // Hello 수빈
hello2.say(); // Hello 빈수
hello1._name = '변경';
hello1.say(); // Hello 변경

/*
	위의 코드에서 _name 변수는 외부에서 쉽게 변경이 가능하다. 
	클로저를 이용하여 이러한 접근을 제한할 수 있다.
*/
function hello(name){
    const _name = name;
    return function(){
        console.log(`Hello ${_name}`)
    }
}

const hello1 = hello('수빈');
const hello2 = hello('빈수');

hello1(); // Hello 수빈
hello2(); // Hello 빈수

/*
	클로저는 각자의 환경을 갖는다. 클로저를 통해 내부 변수를 참조하는 동안에는 변수가 차지하는 메모리를 회수하지 않는다.
	따라서 클로저 사용이 끝나면 참조를 제거하는 것이 좋다.
*/
hello1 = null;
hello2 = null;
```



## HTTP 메소드

: 클라이언트가 웹 서버에게 사용자 요청의 목적이나 종류를 알리는 수단

1. **GET** : 리소스를 조회할 때 사용,
   - 서버에 전달하고 싶은 데이터는 query를 통해 전달
2. **POST **: 요청 데이터 처리, 주로 데이터 생성에 사용
3. **PUT** : 리소스를 대체(데이터를 덮어쓴다.)
4. **PATCH** : 리소스의 일부만 변경할 때 사용
5. **DELETE** : 리소스 삭제에 사용
6. **HEAD** : GET과 동일하지만 응답에 body 없이 응답코드와 헤더만 응답
   - 클라이언트가 서버의 정상 작동 여부를 확인할 때 사용



## 이벤트 루프

: 자바스크립트는 단일 스레드기반 언어여서 한번에 하나씩 밖에 실행할 수 있지만, `Web API, Callback Queue, Event Loop`덕분에 멀티스레드처럼 보여진다.



#### Web API

: JS Engine 밖에 있으며 브라우저에서 제공하는 API로, Ajax, Timeout 등이 있다. `Call Stack`에서 실행된 비동기 함수는 Web API를 호출하고 Web API는 콜백함수를 Callback Queue에 밀어넣는다.



#### Callback Queue

: 비동기적으로 실행된 콜백함수가 보관되는 영역이다.

> ex) setTimeout에서 타이머 완료후 실행되는 함수, addEventListener에서 이벤트가 발생했을 때 실행되는 함수 등이 보관된다.



#### Event Loop

: `Call Stack`과 `Callback Queue`의 상태를 체크하여 **Call Stack이 빈 상태가 되면 Callback Queue의 첫번째 콜백을 Call Stack으로 밀어넣는다.**

>**진행과정**
>
>- V8 엔진에서 코드가 실행되면, Call Stack에 쌓인다.
>- Stack의 선입후출의 룰에 따라 제일 마지막에 들어온 함수가 먼저 실행되며, Stack에 쌓여진 함수가 모두 실행된다.
>  - 비동기함수가 실행된다면, Web API가 호출된다.
>  - Web API는 비동기함수의 콜백함수를 Callback Queue에 밀어넣는다.
>  - Event Loop는 Call Stack이 빈 상태가 되면 Callback Queue에 있는 첫번째 콜백을 Call Stack으로 이동시킨다.



## 이벤트 버블링, 캡처링, 위임

### 이벤트 버블링

: 특정 화면 요소에서 이벤트가 발생했을 때, **해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미**

### 이벤트 캡쳐링

: 이벤트 버블링과는 반대 방향으로 진행되는 이벤트 전파방식(이벤트 리스너를 등록할때 `capture: true`로 설정)

- 특정 이벤트가 발생했을 때, 최상위 요소인 body태그에서 해당 태그를 찾아 내려간다.



> **event.stopPropagation()**
>
> : 이벤트가 전파되는 것을 막는다. 
>
> - 이벤트 버블링의 경우: 클릭한 요소의 이벤트만 발생시키고 상위 요소로 이벤트를 전달하는 것을 방해
> - 이벤트 캡쳐링의 경우: 크릭한 요소의 최상위 요소의 이벤트만 동작시키고 하위 요소들로 이벤트를 전달하지 않는다.



### 이벤트 위임

: 하위 요소에 각각 이벤트를 붙이지 않고, **상위 요소에서 하위 요소의 이벤트들을 제어**하는 방식

- 새롭게 추가된 리스트 아이템에 일일이 이벤트 리스너를 달아줘야 하는 작업은 번거롭기 때문에 이벤트 위임을 통해 처리



## Throttle과 Debounce

`Throttle` : 이벤트를 일정한 주기마다 발생하도록 하는 기술

`Debounce` : 이벤트를 그룹화하여, 특정시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술



## flux 아키텍쳐

: 



## use strict

: 자바스크립트 언어의 문법을 보다 엄격히 적용하여 기존에는 무시되던 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다

- 장점
  - 예외를 발생시키는 몇가지 일반적인 코딩을 잡아낸다.
  - 실수로 전역 변수를 만드는 것이 불가능하다.
  - 함수의 매개변수 이름을 고유하게 한다.
  - this는 전역 컨텍스트에서 undefined가 된다.
- 단점
  - function.arguments에 접근할 수 없다.
  - 서로 다른 엄격 모드로 작성된 스크립트를 병합하면 문제가 발생할 수 있다.



## RESTful API

REST는 HTTP URI를 통해 자원을 명시하고 HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD기능을 적용하는 것을 의미한다.

REST API는 REST를 기반으로 서비스 API를 구현한 것이다.



## Promise

비동기 동작을 다루기 위한 패턴으로, 비동기 요청을 보내면 성공 또는 실패가 다양한 형태로 발생한다. 프로미스를 사용하면 이러한 성공(resolve)이나 실패(reject)를 편리한 방식으로 환원할 수 있다.

new 연산자와 함께 호출한 promise의 인자로 넘겨주는 콜백함수는 호출할 때 바로 실행, 그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있으면 둘 중 하나가 실행되기 전까지는 다음 **then or catch** 구문으로 넘어가지 않는다. pending, fulfilled, rejected 3가지 상태를 가진다. 



### callback 

: callback을 통해서 어떠한 비동기 처리를 했을때, callback 함수를 실행시킴으로써 비동기 작업이 완료되며, callback에서 작성한 어떠한 행동을 실행할 수 있다.

- 문제점
  - callback 함수는 함수의 매개변수인 함수로 주로 비동기 처리에서 동기처리를 할때 사용하는데, 중첩이 많아질수록 가독성이 안좋아진다.



### callback vs Promise

`callback`을 사용하여 비동기 로직의 결과값을 처리하기 위해서는 `callback` 안에서만 처리를 해야하고, callback 밖에서는 비동기에서 온 값을 알 수가 없다. `Promise`를 사용하면 비동기에서 온 값이 `Promise` 객체에 저장되기 때문에 코드 작성이 용이하다.

`Promise` 는 비동기 처리만을 위해 만들어졌기 때문에 resolve나 reject 함수들이 잘 정의되어 있고 잘 활용하면 되지만 `callback pattern`은 자유도가 높으나 코드가 복잡해지고 에러 처리 같은 작업이 어렵다.



### Async, Await와 Promise

promise를 사용할 때는 .catch()문으로 에러 핸들링 가능 but async/await은 에러 핸들링 기능이 따로 없어 try-catch() 문을 활용해야한다.

promise는 .then() 지옥의 가능성이 있어, 코드가 길어질수록 async/await문을 사용하면 가독성이 좋다



## Prototype

프로토타입이란 객체가 만들어지기 위해서는 자신을 만드는데 사용된 원형인 프로토타입 객체를 만든다. 이때 만들어진 객체 안에 __proto__ 속성이 자신을 만들어낸 원형을 의미하는 프로토타입 객체를 참조하는 숨겨진 링크가 있다. 그 링크를 프로토타입이라고 한다. 어떤 데이터의 __proto__ 프로퍼티 내부에서 다시 __proto__ 프로퍼티가 연쇄적으로 이어진것을 프로토타입 체인(prototype chain)이라 하고, 이 체인을 따라가며 검색하는 것을 프로토타입 체이닝(prototype chaining) 이라고 한다.



## forEach vs Map

두 메소드 다 배열의 모든 원소를 돌면서 해당 요소에 관한 작업을 실행하는데, forEach는 원본을 변경시키는데, map은 새로운 배열을 반환한다.



## 실행 컨텍스트

: 실행할 코드에 제공할 환경 정보들을 모아놓은 객체

`실행 컨텍스트`는 동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 객체를 구성하고 콜 스택에 쌓아올렸다가, 가장 위에 있는 컨텍스트와 관련이 있는 코드를 실행하는 식으로 전체 코드의 환경과 순서를 보장한다.

### 종류

- 전역 컨텍스트(Global Context)

  - 함수 안에서 실행되는 코드가 아니라면 모든 스크립트는 전역 컨텍스트에서 실행된다.
  - 전역 컨텍스트 안에 포함되는 모든 코드들의 실행 가능한 코드들은 순서대로 스택에 쌓이게 되며 LIFO로 실행하게 된다.

- 함수 컨텍스트(Functional Context)

  - 함수 컨텍스트는 선언된 함수가 **호출이 될때**를 기점으로 생성되고, 함수의 모든 동작이 종료되면 소멸된다.

    > 클로저를 사용한다면 스코프가 소멸하지 않고 이용할 수 있다.

  - 각각의 함수는 함수 컨텍스트를 가지지만 함수가 호출이 되어야만 생성이 된다.



### 구성

- VariableEnvironment
  - 현재 컨텍스트 내의 **식별자들에 대한 정보**(Environment Record), **외부 환경정보**(Outer Environment Reference) 정보를 담고 있다.
  - 초기에는 LexicalEnvironment와 동일한 값을 갖지만, 변경사항이 반영되지 않는다.
- LexicalEnvironment
  - 현재 컨텍스트 내의 **식별자들에 대한 정보**(Environment Record), 외부 환경정보(Outer Environment Reference) 정보를 담고 있다.
  - 변경 사항이 반영된다.
- ThisBinding : 식별자가 바라봐야할 대상 객체(지정되지 않을 경우 전역 객체가 저장된다.)

> **Environment Record** : 함수 안의 코드가 실행되기 전에 현재 컨텍스트와 고나련된 코드의 식별자 정보가 저장된다.(매개변수 이름, 함수 선언, 변수명 등..)
>
> - 코드가 실행되기 전에 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명 등을 모두 알고 있게 된다.(호이스팅)
>
> **Outer Environment Reference **: 상위 스코프를 가리키며 현재 `Environment Record`보다 바깥에 있는 `Environment Record`를 참고한다.
>
> - 자바스크립트 엔진이 현재 렉시컬 환경에서 변수를 찾을 수 없다면 외부 환경에서 찾는 것을 뜻한다.

```js
ExecutionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {},
        OuterEnvironmentReference: {}
    },
    VariableEnvironment: {
        EnvironmentRecord: {},
        OuterEnvironmentReference: {}
    },
    ThisBinding: null
}
```





## 웹팩 역할

웹팩은 프로젝트의 구조를 분석하고 자바스크립트 모듈을 비롯한 관련 리소스들을 찾은 다음 이를 브라우저에서 사용할 수 있는 번들로 묶고 패킹하는 **모듈 번들러(Module bundler)**다. 모듈 번들러는 여러개의 나누어져 있는 파일들을 하나로 만들어주는 라이브러리이고, 웹페이지를 보여주기 위해 수많은 파일을 서버에 개별적으로 요청하는 것이 아닌 하나로 줄여서 요청하여 코드를 압축하고 최적화해준다. 



## 바벨 역할

바벨은 모든 실행환경에서 자바스크립트가 정상적으로 동작할 수 있도록 ES6 코드를 ES5코드로 변환해주고, 리액트의 JSX, TS 까지 변환해주는 자바스크립트 컴파일러이다. 특정 버전이상에만 실행되는 코드 or 특정 브라우저에서는 실행되지 않는 코드들을 정상적으로 동작하게 만들어준다. 

