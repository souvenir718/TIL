# Class ( JS Flow )

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20210103074458242.png) 

> `instance`는 (prototype) 메소드로는 접근이 가능하다.
>
> - `instance.__proto__.push()`
>
> `instacne`는 `static` 메소드나 프로퍼티로는 접근이 가능하나 this를 자신으로서 쓸 수 없다. => 접근이 불가능하다.



```javascript
function Person(name, age) {
    this._name = name;
    this._age = age;
}
// static method
Person.getInformations = function(instance) {
    return {
        name : instance._name,
        age : instance._age
    };
}

// (prototype) method
Person.prototype.getName = function() {
    return this._name;
}
Person.prototype.getAge = function() {
    return this._age;
}

var gomu = new Person('고무', 30);

console.log(gomu.getName()); // 고무
console.log(gomu.getAge()); // 30

console.log(gomu.getInformations(gomu)); // Error
console.log(Person.getInformations(gomu)); // OK
```

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20210103075454753.png) 



## Class 상속

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20210103075525743.png) 

```javascript
function Person(name, age) {
    this.name = name || '이름없음';
   	this.age = age || '나이모름';
}

Person.prototype.getName = function() {
    return this.nae;
}
Person.prototype.getAge = function() {
    return this.age;
}

function Employee(name, age, position) {
    this.name = name || '이름없음';
   	this.age = age || '나이모름';
    this.position = position || '직책모름';
}

Employee.prototype.getName = function() {
    return this.nae;
}
Employee.prototype.getAge = function() {
    return this.age;
}
Employee.prototype.getPosition = function() {
    return this.position;
}
```

> 위의 겹치는 부분 아래처럼 해결

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20210103075900284.png) 

- **Employee.prototype = new Person()**
  - 없어진 생성자 복구 **Employee.prototype.constructor = Employee**

```javascript
function Person(name, age) {
    this.name = name || '이름없음';
   	this.age = age || '나이모름';
}

Person.prototype.getName = function() {
    return this.nae;
}
Person.prototype.getAge = function() {
    return this.age;
}

function Employee(name, age, position) {
    this.name = name || '이름없음';
   	this.age = age || '나이모름';
    this.position = position || '직책모름';
}

Employee.prototype = new Person(); // 덮어씌어진다.
Employee.prototype.constructor = Employee;
Employee.prototype.getPosition = function() {
    return this.position;
}

var gomu = new Empolyee('고무', 30, 'CEO');
console.dir(gomu);
/*
	age : 30
	name : "고무",
	position : "CEO"
*/
```

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20210103080807884.png) 

- **Bridge** 이용

```javascript
function Person(name, age) {
    this.name = name || '이름없음';
   	this.age = age || '나이모름';
}

Person.prototype.getName = function() {
    return this.nae;
}
Person.prototype.getAge = function() {
    return this.age;
}

function Employee(name, age, position) {
    this.name = name || '이름없음';
   	this.age = age || '나이모름';
    this.position = position || '직책모름';
}

function Bridge() {}
Bridge.prototype = Person.prototype;
Employee.prototype = new Bridge();
Employee.prototype.constructor = Employee;

Employee.prototype.getPosition = function() {
    return this.position;
}

var gomu = new Employee('고무', 30, 'CEO');
console.dir(gomu);
```

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20210103080851140.png) 

- 위의 내용을 함수로 구현

```javascript
var extendClass = (function() {
    function Bridge(){}
    return function(Parent, Child) {
        Bridge.prototype = Parent.prototype;
        Child.prototype = new Bridge();
        Child.prototype.constructor = Child;
    }
})();
// 클로저 - 즉시실행함수
extendClass(Person, Employee);
```



---

출처 : [JS - Flow](https://www.inflearn.com/course/%ED%95%B5%EC%8B%AC%EA%B0%9C%EB%85%90-javascript-flow/dashboard)