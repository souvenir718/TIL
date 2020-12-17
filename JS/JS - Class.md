# Class

  ES6에서 자바스크립트에는 존재하지 않았던 클래스가 도입되었다. Java의 클래스와는 다른 기능이다. 자바스크립트는 기본적으로 프로토타입 기반의 언어이기 때문에 새로 도입된 클래스도 프로토타입 기반이다. 



### 클래스는 선언문 또는 표현식으로 선언할 수 있다.

```javascript
// 클래스 선언문
class name {
    ...
};

// 클래스 표현식
let name = class {
    ...
};

let name = class inner_name {
    ...
};

console.log(typeof name) // 출력 : function
```

  자바스크립트 엔진은 `class` 키워드를 만나면 `Class 오브젝트`를 생성한다. `Class 오브젝트` 도 마찬가지로 `String`, `Function` 과 같은 하나의 오브젝트 타입이다.

> 표현식으로 선언했을 때의 inner-name은 클래스 내부에서 자신을 호출할 때 사용한다.



### Class Keyword 특징

1. 클래스의 선언부는 `let` , `const` 와 마찬가지로 호이스팅은 되지만 `temporal dead zone` 이 형성된다.

> Teamporal dead zone : `일시적 사각지대`란 의미로 변수의 스코프와 관련이 있다. let으로 선언된 변수는 스코프의 시작에서부터 변수의 선언까지 TDZ에 빠진다.

```javascript
let foo = new Foo();

class Foo {
    
};
// Error : use before declaration
```

  클래스를 선언한 다음, `new` 키워드를 통해 인스턴스를 생성할 수 있다.



2. 클래스의 코드는 'use strict'를 선언하지 않아도 strict 모드에서 실행된다.
3. 메서드를 작성할 때, function 키워드와 콜론(:)을 작성하지 않는다.
4. 메서드 사이에 콤마를 작성하지 않는다.

```javascript
class Student {
    getName(){
        console.log("name");
    }
    getScore(){
        console.log("score");
    }
};

let student = new Student();
student.getName(); // 출력 : name
student.getScore(); // 출력 : score
```



5. 생성자 함수를 통해 인스턴스를 생성하면 window에 설정되지만 class 키워드를 통해 생성하면 window에 설정되지 않는다.



### Sugar Syntax

  `Class` 키워드는 `sugar syntax` 라고 했다. 자바스크립트는 기본적으로 `prototype` 기반의 언어이기 때문에 엔진이 `prototype` 에 메서드들을 연결한다. 즉, 클래스에서 메서드를 추가하면 자동으로 `prototype` 에 추가되는 것이다.  자바스크립트에서는 프로토타입을 사용해서 클래스 밖에서도 메서드를 추가할 수 있다.

```javascript
Student.prototype.newMethod = function() {
    console.log("Add new Method");
}
student.newMethod(); // 출력 : Add new Method
```



`new` 연산자는 `constructor` 를 호출받으면서 받은 인자들을 `constructor` 의 파라미터로 전달한다.

```javascript
class Student {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
    
    getName(){
        return this.name;
    }
}

let student = new Student("JBee", 100);
console.log(s.name); // JBee
console.log(s.score); // 100
console.log(s.getName()); // JBee
```

  위 코드에서 볼 수 있듯이 `class` 키워드로 선언한 클래스에 대해서 `new` 키워드를 통해 인스턴스를 생성할 수 있다. 

> new 키워드가 실행되는 매커니즘은 다음과 같다.
>
> 1. constructor는 우선적으로 빈(empty) 오브젝트(인스턴스)를 생성한다.
> 2. 넘겨받은 파라미터를 생성한 빈 오브젝트의 프로퍼티에 설정한다.
> 3. 인스턴스를 먼저 생성하므로, constructor 내부에서는 this keyword를 통해 인스턴스 자신을 가리킬 수 있다.
> 4. constructor에 별도의 return이 설정되어 있지 않으면 new를 실행한 곳으로 해당 클래스의 인스턴스를 반환한다.



### extends keyword

  자바스크립트에서도 `extends` 라는 키워드를 통해 클래스 간의 상속이 가능해졌다. 상속받은 클래스의 메소드를 사용할 수 있다.

```javascript
class Foo {
    getName() {
        console.log("Foo");
    }
}

class Bar extends Foo {
    
}
let bar = new Bar();
bar.getName(); // 출력 : Foo
```

  

  `super` 키워드를 통해 슈퍼 클래스의 메소드에 접근할 수 있다.

```javascript
class Foo {
    getName() {
        return "Foo";
    }
}

class Bar extends Foo {
    getName() {
        return super.getName() + "Bar";
    }
}

let bar = new Bar();
bar.getName(); // 출력 : Foo Bar
```



  서브클래스에서 정의된 `constructor` 가 없다면 슈퍼 클래스의 `constructor` 가 호출된다. 서브클래스에서 `constructor` 를 정의하려면 반드시 `constructor` 내부에서 `super()` 를 호출해야 한다.

```javascript
class Foo{
    constructor(){
        console.log("Foo");
    }
}

class Bar extends Foo {
    constructor(){
        super();
        console.log("Bar");
    }
}

let bar = new Bar();
// 출력 : Foo
// 출력 : Bar
```



### static 키워드

  자바스크립트 클래스에서 `static` 키워드를 사용하면 정적 메소드를 정의할 수 있다. 정적 메소드는 인스턴스를 생성하지 않고 사용할 수 있는 메소드다. 인스턴스에서는 호출할 수 없다. 정적메소드는 `prototype` 에 추가되지 않는다.

```javascript
class Foo {
    static getName() {
        console.log("F");
    }
}
Foo.getName(); // 출력 : F

let foo = new Foo();
foo.getName(); // not a function
```

  클래스 내부에서 `정적 변수`를 지정할 수 없지만 클래스 밖에서 지정할 수 있다.

```javascript
class Foo {
    ...
};
Foo.name = "foo";
```



### new.target

  `new.target` 을 이용하면 슈퍼 클래스에서 서브 클래스의 `static method`에 접근할 수 있다.

```javascript
class Foo {
    constructor(){
        console.log(new.target); // [Function : Bar]
        console.log(typeof new.target) // function
        console.log("Foo: ", new.target.getName()); // Foo: bar
    }
}

class Bar extends Foo {
    constructor(){
        super();
    }
    
    static getName(){
        return "bar";
    }
}

let bar = new Bar();
```