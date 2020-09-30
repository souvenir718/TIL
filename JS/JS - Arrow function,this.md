# 화살표 함수

### ES6 이전 함수를 표현하는 방법

#### 함수 표현식과 함수 선언

```javascript
// 함수 선언
function foo() { }
 
// 함수 표현식
const boo = function() { } // 익명함수를 변수 foo에 참조
```

> 함수 표현식으로 선언된 함수는 함수 표현식을 선언하기 전에는 함수를 호출 할 수 없다.



### 화살표 함수의 다른 점

```javascript
const func1 = function(num) { const num = 10; };
const func1 = (num) => { const num = 10; }; // function 키워드 생략 가능
```

> function 키워드를 생략 할 수 있따.
>
> 함수의 매개변수가 1개라면 괄호를 생략할 수 있다.
>
> 함수 바디가 표현식 하나라면 중괄호와 return문을 생략할 수 있다.
>
> ```javascript
> const func2 = num => `입력된 숫자는 ${num}입니다.`;
> ```

- 화살표 함수를 사용하면 중첩함수 안에서 `this` 를 사용할 수 있다.

> 자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 값 이외에, `arguments` 객체와 `this`를 암묵적으로 전달 받는다.



### this

- `this` 는 현재 실행 문맥을 뜻한다.

  - 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 `this`에 바인딩할 객체가 동적으로 결정

  ```javascript
  console.log(this === window) // true
  ```

  > 위 코드는 `console.log`를 호출한 것이 window이기 때문에 true를 리턴한다.

  ```javascript
  const hello = {
      hi : function() {
          console.log(this === window);
      },
  }
  hello.hi(); // false
  ```

  > 위 코드에서 `this`는 `hi`이므로 false를 리턴한다.

  

- 함수 호출 방식과 this 바인딩

```javascript
var foo = function() {
    console.log(this);
};

// 1. 함수 호출
foo();

// 2. 메소드 호출
var obj = { func : foo };
obj.func();

// 3. 생성자 함수 호출
var instance = new foo();
```

> 1. 함수호출에서 this는 **window**  `window.foo();`
>    - 내부함수는 일반함수, 메소드, 콜백함수에 상관없이 this는 전역객체를 바인딩한다.
> 2. 메소드 호출에서 this는 **obj**
> 3. 생성자 함수 호출에서 this는  **instance**

- 자바스크립트는 this를 명시적으로 바인딩할 수 있는 apply, call, bind 메소드를 제공한다.





### arguments

- `arguments` 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 유사배열객체
  - 함수 내부에서 지역변수처럼 사용

```javascript
function multiply(x, y) {
    console.log(arguments);
    return x * y;
}

multiply();			// {}
multiply(1); 		// { '0' : 1 }
multiply(1, 2);		// { '0' : 1, '1' : 2 }
multiply(1, 2, 3);	// { '0' : 1, '1' : 2, '2' : 3 }
```

> 매개변수(parameter)는 인수(argument)로 초기화된다.
>
> - 매개변수보다 인수를 적게 전달했을때 인수가 전달되지 않은 매개변수는 `undefined`로 초기화된다.
> - 더 많이 전달된 경우네는 초과된 인수는 무시된다.
>
> 런타임 시 호출된 함수의 인자 갯수에 따라 동작을 달리 정의할 필요가 있을 때 `arguments` 객체가 유용하다.

- 유사배열객체(array-like object)
  - length 프로퍼티를 가진 객체를 말한다.
  - 배열이 아니므로 배열 메소드를 사용하는 경우 에러가 발생한다.