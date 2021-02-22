# Function



## 사용방법에 따른 함수 종류

|     함수 종류     | 내 용                                                        |
| :---------------: | ------------------------------------------------------------ |
|     일반 함수     | 가장 일반적으로 사용되는 함수                                |
|     중첩 함수     | 함수 안에 함수가 있는 경우를 **중첩**되어 있다고 하며 이 함수 안에 있는 함수를 **중첩함수**라고 한다. |
|     콜백 함수     | 함수의 실행 결과값을 리턴이 아닌 매개변수로 넘어온 함수를 호출해서 넘겨주는 방식을 **콜백**이라 하며,<br />이때 매개변수로 넘어온 함수를 **콜백 함수**라고 한다. |
|    클로저 함수    | 일반적인 함수의 경우 함수 호출에 의해 함수 내부의 실행구문을 모두 실행하게 되면 함수 내부에서 만든 지역변수가<br />자동으로 사라지지만 어떤 경우에는 사라지지 않고 남아있는 경우가 있다. 이러한 현상을 **클로저**라고 하며 이 현상을<br />일으키는 함수를 **클로저 함수**라고 한다. |
| 멤버 함수(메서드) | 멤버 함수는 클래수 내부에 만들어지며 주로 **메서드**라고 부른다. |



## 함수 선언문 방식과 함수 표현식 방식

자바스크립트에서 함수를 만드는 방법은 주로 두가지(**함수 표현식**, **함수 선언식**)가 쓰이며 이 두 방법은 **함수의 이름**과 **호이스팅**에서 차이가 있다.



### 함수 선언식(function statement)

```javascript
example1(); // 함수 호출(호이스팅)

function example1() {
    console.log('hello');
} // 함수 선언
```

- 함수 선언 방식은 함수 리터럴 형식과 같다.
- 함수 선언문은 반드시 함수 **이름**이 명시되어 있어야 한다.
- 함수 이름으로 함수를 호출한다.



### 함수 표현식(function expressions)

```javascript
const example2 = function() { console.log('hello') };
// 변수 example2에 함수 할당

example2(); // 함수 호출
```

- 함수 리터럴로 생성한 함수를 변수에 할당하는 방법을 말하며 함수의 참조값이 `example2`라는 변수로 저장된다.
- 위의 예에서 `example2`는 함수의 이름이 아니고 익명함수이며 함수가 할당된 변수 `example2`를 통해 호출한다.
- 함수 표현식에서 `const example2 = function exam2() { ... }`과 같이 함수에 이름이 지정되어도 호출은 변수 이름을 사용해야 한다.
- 함수 표현식에 이름이 지정하여도 호출 방식에 영향을 미치지 않는다. (호이스팅 되지 않는다.)



### 차이점

#### 호이스팅(hoisting) : 끌어올림

코드에서 함수나 변수를 코드의 하단부에 선언했다고 하더라고 코드의 상단부에서 함수를 호출(실행)할 수 있는 `Javascript`만의 특징.

```javascript
example1(); // 'hello'
example2(); // undefined

function example1() { console.log('hello') } // 함수 선언식
var example2 = function() { console.log('hello') }; // 함수 표현식
```

> 함수 선언식으로 선언된 함수는 호이스팅 되고 표현식으로 선언된 함수는 호이스팅 되지 않는다.



#### 세미콜론(;)의 사용

함수 선언식에서 함수를 선언할 때는 `세미콜론(;)`을 사용하지 않고 함수 표현식으로 함수를 선언할 때는 세미콜론을 붙인다.



## 함수 표현식과 화살표 함수의 차이

**화살표 함수**는 **함수 표현식**의 단축 표현이다. 

```javascript
const square = function(x) { retrun  x * x };
// 화살표 함수 표현식으로 작성하면 아래와 같다.
const square = (x) => { return x * x };
```



### 차이점

#### this의 값이 함수를 정의할 때 결정된다.

**함수 표현식**으로 정의한 함수의 `this` 값은 함수를 **호출**할 때 결정된다. 메서드가 어디서 정의되었는지에 상관없이 `this`는 **' 점 앞의 '** 객체가 무엇인가에 따라 결정된다. **화살표 함수**의 경우, `this`의 값은 함수를 **정의**할 때 결정된다. **화살표 함수** 바깥의 `this` 값이 화살표 함수의 `this` 값이 된다.

```javascript
const obj = {
	say() {
      console.log(this); // [object Object]
      const f = function() { console.log(this); }; // [object Window]
      f();
      const g = () => { console.log(this); } // [object Object]
      g();
    }
};
obj.say();
```

함수 `f`는 `say`라는 함수의 중첩 함수이며 `this`의 값은 전역 객체를 가리킨다.

**화살표 함수 g**의 `this` 값은 함수 `g`를 정의한 익명 함수의 `this`의 값인 객체 `obj`를 가리킨다.

**화살표 함수**는 `call`이나` apply` 메서드를 사용하여 `this`를 바꾸어 호출해도 `this` 값이 바뀌지 않는다.

```javascript
const f = function() { console.log(this.name); };
const g = () => { console.log(this.name); };

const tom = { name: "Tom" };

f.call(tom); // "Tom"
g.call(tom); // ""
```



#### arguments 변수가 없다.

화살표 함수 안에는 `arguments` 변수가 정의되어 있지 않으므로 사용할 수 없다.

```javascript
const f = () => console.log(arguments);
f(); // ReferenceError: arguments is not defined
```



#### 생성자로 사용할 수 없다.

화살표 함수 앞에 `new` 연산자를 붙여서 호출할 수 없다.

```javascript
const Person = (name, age) => { this.name = name; this.age = age };
const tom = new Person("Tom", 18); // TypeError: Person is not a constructor
```



### 화살표 함수 사용시 주의할 점

```react
const Button = () => (
	<button>Hello world!</button>
)
```

화살표 함수의 경우 **괄호()**로 감싸진 부분이 `return` 된다( return문을 작성하지 않아도 return된다.)

반면에, **중괄호{}**로 감싸진 아래와 같은 함수는 `return`문이 없다면 값을 반환하지 않는다.

```react
const Button = () => {
    <button>Hello World!</button>
}

// 값을 반환하기 위해서는 `return` 문을 사용해야 한다.
const Button = () => {
    return <button>Hello World!</button>
}
```



[🔗출처](https://velog.io/@bigbrothershin/JavaScript-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EC%99%80-%EC%82%AC%EC%9A%A9%EC%83%81-%EC%A3%BC%EC%9D%98%ED%95%A0-%EC%A0%90)