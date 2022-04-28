# Javascript



### 화살표 함수

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



### 호이스팅

## this

this는 함수를 호출할 때 결정된다. 함수를 호출할 때 this가 특별한 동작을 하지 않을때는 보통 window를 호출한다. 함수를 호출할 때, 객체가 붙을 경우에는 `this`는 객체가 된다. 

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



### closure

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

위의 코드에서 정의한 `getClosure()`는 함수를 반호나하고 반환된 함수는 내부에서 선언된 변수를 참조하고 있다. 이 참조된 변수는 함수 실행이 끝났다고 해서 사라지지 않고, 제대로 값을 반환하는 것을 볼 수 있다.

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





### http 메소드

### 이벤트 루프





### flux 아키텍쳐

### 웹팩 역할

### 바벨 역할



