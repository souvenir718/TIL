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

### http 메소드

### flux 아키텍쳐

### 웹팩 역할

### 바벨 역할



