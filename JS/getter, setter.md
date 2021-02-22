# getter, setter



## 프로퍼티

### 1. 데이터 프로퍼티

값을 저장하기 위한 프로퍼티로, 일반적으로 사용하는 프로퍼티는 데이터 프로퍼티다.

### 2. 접근자 프로퍼티

값이 없고, 프로퍼티를 읽거나 쓸 때 호출하는 함수를 값 대신에 지정할 수 있는 프로퍼티다. 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당한다. 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보인다.



## 접근자 프로퍼티

> **접근자**란 객체 지향 프로그래밍에서 객체가 가진 프로퍼티 갑을 객체 바깥에서 읽거나 쓸 수 ㅣㅇㅆ도록 제공하는 메서드다. 



### getter, setter

**getter, setter**는 객체 안에서 `get`과 `set`으로 나타낸다.

```javascript
let obj = {
    get propName() {
        //...
    }
    set propName(value){
        //...
    }
}
```

`getter` 메서드는 `obj.propName`을 사용해 프로퍼티를 읽을 때 실행되고 `setter` 메서드는 `obj.propName = value`로 프포퍼티에 값을 할당하려 할 때 실행된다.



#### getter 메서드

```javascript
let user = {
    name: 'Subin',
    surname: 'Kim',
    
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

console.log(user.fullName); // Subin Kim
```

위의 코드에서 처럼 바깥 코드에선 접근자 프로퍼티를 일반 프로퍼티처럼 사용할 수 있다. 



#### setter 메서드

```javascript
let user = {
    name: 'Subin',
    surname: 'Kim',
    
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

user.fullName = "Gildong Hong";
/*
	user.name => Gildong
	user.surname => Hong
*/
```

`getter`와`setter` 메서드를 구현하면 객체엔 `fullName`이라는 **가상**의 프로퍼티가 생긴다. **가상**의 프로퍼티는 읽고 쓸 수 있지만 실제로 존재하지 않는다.



## getter와 setter 똑똑하게 활용하기

### 일반적인 사용 방법

```javascript
let user = {
  name: '',
  setName(value) {
    if (value.length < 4) {
      alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
      return;
    }
    this.name = value;
  }
};

user.setName("Pete");
alert(user.name); // Pete

user.setName(""); // 너무 짧은 이름을 할당하려 함
```



### 똑똑하게 사용하기

`getter`와 `setter`를 실제 프로퍼티 값을 감싸는 `래퍼`처럼 사용하면 메서드를 새로 만드는 일 없이 **프로퍼티 값을 원하는 대로 통제**할 수 있다.

```javascript
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // 너무 짧은 이름을 할당하려 함
```



[참조](https://velog.io/@bigbrothershin/JavaScript-%EC%A0%91%EA%B7%BC%EC%9E%90-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-getter-setter)