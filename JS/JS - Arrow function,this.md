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

 자바스크립트에서 모든 함수는 실행될 때마다 함수 내부에 `this` 라는 객체가 추가된다. `arguments`라는 유사 배열 객체와 함께 함수 내부로 암묵적으로 전달되는 것이다. 그렇기 때문에 자바스크립트에서 `this` 는 함수가 호출된 상황에 따라 그 모습을 달리한다.

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



##### 1.함수를 호출할 때

 특정 객체의 메서드가 아니라 함수를 호출하면, 해당 함수 내부 코드에서 사용된 `this`는 전역객체에 바인됭 된다. `A.B` 일 때 `A` 가 전역 객체가 되므로 `B` 함수 내부에서의 `this` 는 당연히 전역 객체에 바인딩 되는 것이다.

```javascript
var value = 100;
var myObj = {
    value : 1,
    func1 : function(){
        console.log(`func1's this.value: ${this.value}`);
    	var func2 = function() {
            console.log(`func2's this.value : ${this.value}`)
        };
        func2();
    }
};

myobj.func1();
// 출력 : func1's this.value : 1
// 출력 : func2's this.value : 100
```





##### 2. 메서드를 호출할 때

 객체의 프로퍼티가 함수일 경우 메서드라고 부른다. `this` 는 함수를 실행할 때 함수를 소유하고 있는 객체(메서드를 포함하고 있는 인스턴스)를 참조한다. 즉, 해당 메서드를 호출한 객체로 바인딩된다. `A.B` 일 때 `B` 함수 내부에서의 `this`는 `A`를 가리키는 것이다.

```javascript
var myObject = {
    name : "foo",
    sayName : function(){
        console.log(this);
    }
};
myObject.sayName();
// 출력 : Object {name : "foo", sayName : sayName()}
```



##### 3. 생성자 함수를 호출할 때

 그냥 함수를 호출하는 것이 아니라 `new` 키워드를 통해 생성자 함수를 호출할 때는 `this`가 다르게 바인딩 된다. `new` 키워드를 통해서 호출된 함수 내부에서의 `this` 는 객체 자신이 된다. 생성자 함수를 호출할 때의 `this` 바인딩은 함수가 동장하는 방식을 통해 이해할 수 있다.

 `new` 연산자를 통해 함수를 생성자로 호출하게 되면, 일단 빈 객체가 생성되고 `this`가 바인딩 된다. 이 객체는 함수를 통해 생성된 객체이며, 자신의 부모인 프로토타입 객체와 연결되어 있다. 그리고 `return` 문이 명시되어 있지 않은 경우에는 `this`로 바인딩된 새로 생성된 객체가 리턴된다.

```javascript
var Person = function(name) {
    console.log(this);
    this.name = name;
};

var foo = new Person("foo"); // Person
console.log(foo.name) // foo
```



##### 4. apply, call, bind를 통한 호출

 위의 1, 2, 3 방법에 의존하지 않고 `this`를 자바스크립트 코드로 주입 또는 설정할 수 있는 방법이다. 1번째 방법을 통해 세 메서드의 차이점을 파악해보자.

- `bind` 메서드 사용

```javascript
var value = 100;
var myObj = {
    value : 1,
    func1 : function(){
        console.log(`func1's this.value: ${this.value}`);
    	var func2 = function(val1, val2) {
            console.log(`func2's this.value : ${this.value} and ${val1} and ${val2}`)
        }.bind(this, `param1`, `param2`);
        func2();
    }
};

myobj.func1();
// 출력 : func1's this.value : 1
// 출력 : func2's this.value : 1 and param1 and param2
```



- `call` 메서드 사용

```javascript
var value = 100;
var myObj = {
    value : 1,
    func1 : function(){
        console.log(`func1's this.value: ${this.value}`);
    	var func2 = function(val1, val2) {
            console.log(`func2's this.value : ${this.value} and ${val1} and ${val2}`)
        };
        func2.call(this, `param1`, `param2`);
    }
};

myobj.func1();
// 출력 : func1's this.value : 1
// 출력 : func2's this.value : 1 and param1 and param2
```



- `apply` 메서드 사용

```javascript
var value = 100;
var myObj = {
    value : 1,
    func1 : function(){
        console.log(`func1's this.value: ${this.value}`);
    	var func2 = function(val1, val2) {
            console.log(`func2's this.value : ${this.value} and ${val1} and ${val2}`)
        };
        func2.apply(this, [`param1`, `param2`]);
    }
};

myobj.func1();
// 출력 : func1's this.value : 1
// 출력 : func2's this.value : 1 and param1 and param2
```

- `bind` vs `apply` , `call` : 우선 `bind` 는 함수를 선언할 때, `this` 와 파라미터를 지정해줄 수 있으며, `call` 과 `apply` 는 함수를 호출할 때, `this`와 파라미터를 지정해준다.

- `apply` vs `bind`, `call` : `apply` 메서드는 첫번째 인자로 `this` 를 넘겨주고 두번째 인자로 넘겨줘야 하는 파라미터를 배열 형태로 전달한다. `bind` 메서드와 `call` 메서드는 각각의 파라미터를 하나씩 넘겨주는 형태다.





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