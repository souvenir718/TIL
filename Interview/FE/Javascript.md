# Javascript



### 화살표 함수가 무엇이고 왜 사용하는지

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

