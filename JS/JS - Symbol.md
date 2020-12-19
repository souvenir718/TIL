# Symbol

**Symbol : 고유하고 수정 불가능한 데이터 타입**

  자바스크립트에는 `Primitive type` 이라는 개념이 있다. ES5에는 `string`, `number`, `boolean`, `null`, `undefined` 로 총 5가지 원시 자료형이 존재한다. 여기에 **ES6**부터 `symbol` 이라는 타입이 추가되었다.

  `Primitive type` 에는 각각 Wrapper Object가 존재한다. (`undefined` 와 `null` 은 존재하지 않는다.) `Symbol` 오브젝트라는 wrapper Object가 존재한다. 각각의 wrapper Object에는 값을 처리하기 위한 메서드와 프로퍼티가 존재한다. `valueOf()` 메소드를 통해 primitive value를 구할수 있다. 하지만 `symbol`은 값을 반환하지 않는다.



### Symbol 생성하기

  `symbol` 은 객체가 아니므로 `new` 키워드를 통해서 생성할 수 없다.

```javascript
let s = Symbol("symbol description");
console.log(typeof s); // 출력 : symbol
console.log(s.toString()); // 출력 : Symbol(symbol description)
console.log(s.valueOf()); // 출력 : {}
console.log(s); // 출력 : {}
```

> `Symbol`은 같은 `description`을 갖고 있어도 `description`이 같을뿐 다른 `Symbol` 이다. `Symbol()`이 호출될 때마다 새로운 `Symbol`을 생성하기 때문이다.

  

  생성한 `Symbol` 을 다시 사용하려면 고유한 값을 갖는 `Symbol`을 만들 때, `key`를 등록하고, `key`를 통해 접근한다.

- `for` 메소드
  - `for` 메소드를 사용하여 생성 또는 호출할 수 있다.
  - `key` 값이 파라미터로 넘어가고 등록되어 있는 `Symbol`을 반환한다. 
  - 여기서 `key` 값에 해당하는 `Symbol`이 없다면 생성한다.
- `keyFor` 메소드
  - `keyFor` 메소드는 `Symbol`을 받아서 해당 `Symbol`의 `description` 값을 반환한다.

```javascript
let symbolFor1 = Symbol.for("su");
let symbolFor2 = Symbol.for("su");
console.log(symbolFor1.toString()); // Symbol(su);
console.log(symbolFor2.toString()); // Symbol(su);
console.log(Symbol.keyFor(symbolFor1)); // su
console.log(Symbol.keyFor(symbolFor2)); // su
console.log(symbolFor1 == symbolFor2); // true
console.log(symbolFor1 === symbolFor2); // true
```

  같은 `key` 값으로 `Symbol` 을 호출하게 되면 두 `Symbol`은 같은 `Symbol` 이다. 위에서 그냥 `Symbol()` 을 통해 생성한 것과의 차이점은 `key`와 함께 만들면 `Global Symbol registry`에 해당 `Symbol`이 등록되어 `Symbol()`이 호출될 때마다 새로운 `Symbol`이 생성되지 않는다.

> Global Symbol registry : `Symbol` 값을 공유하기 위한 영역으로 다른 자바스크립트 프레임워크에서도 공유할 수 있다.



### Symbol 특징

#### 특징 1 : `Symbol` 은 값을 외부에 노출시키지 않는다.

- `Template literal`에서 사용할 수 없다.
- `JSON.stringfy()` 메소드를 통해서 특정 오브젝트를 `stringify` 하려고 해도 빈 객체가 리턴된다.



#### 특징 2 

  객체에 `Symbol`로 등록된 프로퍼티를 `symbol-keyed propery`라고 하는데 이 `symbol-keyed property`는 Object의 `getOwnPropertyNamems` 반환값에서 제외된다.

```javascript
let user = {
    [Symbol.for("name")] : "subin",
    age : 27,
    major: "Computer Science"
};
console.log(Object.getPropertyNames(user)); // ['age', 'major']
```

- `for-in statement`에서도 열거되지 않는다.

- Object의 `symbol-keyed property`는 `getOwnPropertySymbols()`를 통해 확인할 수 있다.

```javascript
console.log(Object.getOwnPropertySymbols(user)[0].toString());
// Symbol(name)
```

- `symbol-keyed property`로 value에 접근할 때는 `[ ]`를 통해 접근해야 한다. `.` 을 통해 접근하면 `undefined`가 반환된다.

```javascript
const sym = Symbol.for("name");
let user = {
    [sym] : "subin"
}
console.log(user.sym); // undefined
console.log(user[sym]); // subin
```

