# var, let, const

### 1. 변수 선언 방식

- `var` 는 변수 선언 방식에 있어서 큰 단점이 있다.

```javascript
var name = 'page';
console.log(name); //page
var name = 'javascript';
console.log(name) // javascript
```

> 변수를 한번 더 선언했음에도 에러가 나지 않고 다른 값이 출력된다.
>
> 코드량이 많아진다면 값이 바뀌거나 어디에서 어떻게 사용되는지 알 수 없다.
>
> &#10132; 이를 보완하기 위해 추가된 `let` 과 `const` 다.



```javascript
let name = 'page';
console.log(name); // page
let name = 'javascript';
console.log(name);
// Uncaught SyntaxError : Identifier 'name' has already been declared
```

> `name` 이 이미 선언되었다는 에러가 나온다(`const` 도 마찬가지 에러)



#### `let` 과 `const` 의 차이점은?

- `immutable` 여부

  - `let` 은 변수에 재할당이 가능하다

  ```javascript
  let name = 'page';
  console.log(name); // page
  
  name = 'react';
  console.log(name); // react
  ```

  - `const` 는 변수 재선언, 변수 재할당 모두 불가능하다.

  ```javascript
  const name = 'page';
  console.log(name); // page
  
  const name = 'javascript';
  // Uncaught SyntaxError : Identifier 'name' has already been declared
  
  name = 'react';
  // Uncaught TypeError : Assignment to constant variable
  ```



### 2. 호이스팅(Hoisting)

> 호이스팅이란, `var` 선언문이나 `function` 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성을 말한다.



- `var` 로 선언된 변수와는 달리 `let` 으로 선언된 변수를 선언문 이전에 참조하면 참조에러가 발생한다.

```javascript
console.log(foo); // undefined
var foo;

console.log(bar); // Error : Uncaught ReferenceError : bar is not defined
let bar;
```

> 이는 `let` 으로 선언된 변수는 스포프 시작에서 변수의 선언까지 일시적 사각지대에 빠지기 때문이다.

- 변수는 `선언 단계`  > `초기화 단계` > `할당 단계` 에 걸쳐 생성되는데

  - `var` 는 선언 단계와 초기화 단계가 한번에 이루어진다.

  ```javascript
  console.log(foo); // undefined
  
  var foo;
  console.log(foo); // undefined
  
  foo = 1; // 여기서 할당 단계가 실행
  console.log(foo); // 1
  ```

  > `var` 는 스코프의 선두에서 선언 단계와 초기화 단계가 실행된다.
  >
  > 따라서, 변수를 선언하기 이전에 변수를 참조할 수 있다.

  - `let` 은 선언 단계와 초기화 단계가 분리되어 진행된다.

  ```javascript
  console.log(foo); // ReferenceError : foo is not defined
  
  let foo; // 여기서 초기화 단계가 실행된다.
  console.log(foo); // undefined
  
  foo = 1;
  console.log(foo); // 1
  ```

  > `let` 은 스코프의 선두에서 선언 단계가 실행된다.
  >
  > 선언 단계에서는 변수가 초기화(메모리 공간 확보, undefined로 초기화) 되지 않았다.
  >
  > 따라서 변수를 선언하기 이전에 참조할 수 없다.



### 정리

- 변수 선언에는 기본적으로 `const` 를 사용!
- 재할당이 필요한 경우에 한정해 `let` 을 사용하는 것이 좋다!
- 재할당하는 경우는 생각보다 흔하지 않아서 `const` 를 사용하면 보다 안전하다.



[출처](https://velog.io/@bathingape/JavaScript-var-let-const-%EC%B0%A8%EC%9D%B4%EC%A0%90)