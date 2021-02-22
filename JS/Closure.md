# Closure



### 정의

Closure(클로저)는 **두 개의 함수로 만들어진 환경**으로 이루어진 특별한 객체의 한 종류다. 여기서 **환경**이라 함은 클로저가 생성될 때 그 **범위**에 있던 여러 지역 변수들이 포함된 **context**를 말한다. 이 클로저를 통해서 자바스크립트에 없는 private 속성/메소드, public 속성/메소드를 구현할 수 있는 방안을 마련할 수 있다.



### 클로저 생성

- 클로저 생성 조건
  1. 내부 함수가 익명함수로 되어 외부 함수의 반환값으로 사용된다.
  2. 내부 함수는 외부 함수의 실행환경에서 실행된다.
  3. 내부 함수에서 사용되는 변수 `x` 는 외부 함수의 변수 스코프에 있다.

```javascript
function outer() {
    var name = 'closure';
    function inner() {
        console.log(name);
    }
    inner();
}
outer();
// 출력 : closure
```



`outer` 함수를 실행시키는 `context` 에는 `name` 이라는 변수가 존재하지 않는다는 것을 확인할 수 있다. 비슷한 맥락에서 코드를 변경해볼 수 있다.



```javascript
var name = 'Warning';
function outer(){
    var name = 'closure';
    return function inner(){
        console.log(name);
    };
}
var callFunc = outer();
callFunc();
// 출력 : closure
```



위 코드에서 `callFunc` 를 클로저라고 한다. `callFunc` 호출에 의해 `name` 이라는 것이 `console` 에 찍히는데, 찍히는 값은 `Warning` 이 아니라 `closure` 라는 값이다. 즉, `outer` 함수의 `context` 에 속해있는 변수를 참조하는 것이다. 여기서 `outer` 함수의 지역변수로 존재하는 `name` 변수를 `free variable(자유변수)` 라고 한다.



이처럼 외부 함수 호출이 종료되더라도 외부 함수의 지역 변수 및 변수 스코프 객체의 체인 관계를 유지할 수 있는 구조를 **클로저**라고 한다. 보다 정확히는 외부 함수에 의해 반환되는 내부 함수를 가리키는 말이다.



---



### 스코프

: 변수의 유효 범위



자바스크립트(ES6)는 **함수 레벨과 블록 레벨**의 **lexical 스코프** 규칙을 따른다.



- 스코프 레벨

  : 자바스크립트는 전통적으로 함수레벨 스코프를 지원해왔고 가장 최신 명세인 ES6(ECMAScript 6)부터 블록 레벨 스코프를 지원하기 시작했다.



- 함수 레벨 스코프

  : 자바스크립트에서 `var` 키워드로 선언된 변수나, `함수 선언식` 으로 만들어지는 함수는 `함수 레벨 스코프` 를 갖는다. 즉, **함수 내부 전체**에서 유효한 식별자가 된다.

```javascript
function foo() {
    if(true){
        var color = 'blue';
    }
    console.log(color);
}
foo();
// 출력 : blue
```

 위의 코드에서 `var color`가 블록 레벨 스코프였다면 `color` 변수는 `if` 문이 끝날때 파괴되고 `console` 에서 잘못된 참조로 에러가 발생할 것이다. 그렇지만 `color`는 함수 레벨의 스코프이기 때문에 `foo` 함수 내부 어디에서든 에러 발생 없이 참조할 수 있다.



- 블록 레벨 스코프

  : ES6의 `let` , `const` 키워드는 블록 레벨 스코프 변수를 만들어 준다.

```javascript
function foo() {
    if(true){
        let color = 'blue';
        console.log(color); // 출력 : blue
    }
    console.log(color); // ReferenceError : color is not defined
}
foo();
```

 `let color` 를 `if` 블록 내부에서 선언하였기 때문에 `if` 블록 내부에서 참조할 수 있으며 그 밖의 영역에서 잘못된 참조로 에러가 발생한다.