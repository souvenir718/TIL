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

화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 일반 함수와 달리 언제나 상위 스코프의 this를 가리킨다.`Lexical this`라고 한다.

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

: 해당 javascript 코드에 엄격모드를 적용한다.

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



## OOP

`다시`

1. 다형성 
   - 선언되어있는 하나의 메소드를 오버라이딩하여 여러가지의 기능으로 동작시킬 수 있다.
2. 캡슐화
   - 데이터와 데이터 구조를 묶음으로써 외부에 데이터를 노출시키지 않는 데이터 은닉화가 가능하다.
3. 상속
   - 상속 관계에 있는 두 클래스에서 자식 클래스가 부모 클래스의 메소드를 상속받아 사용함으로써 코드의 재사용이 가능하다.
4. 추상화
   - 클래스에 대해 공통 속성이나 기능을 묶어 이름을 붙인다.



## 웹팩 역할

## 바벨 역할



