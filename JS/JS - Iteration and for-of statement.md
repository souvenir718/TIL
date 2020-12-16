# Iteration and for-of statement



## Iteration

 ES6에서 이터레이션 프로토콜은 `Iterable 프로토콜`과 `Iterator 프로토콜`로 구성된다. 결론부터 말하면 `Iterable` 프로토콜은 `반복가능한` 오브젝트를 나타내는 프로토콜이며 `Iterator` 프로토콜은 이터러블 오브젝트의 값을 **작성한 순서대로** 처리하는 프로토콜이다.



### Iterable 프로토콜

 오브젝트의 반복 처리 규약을 정의한다.

- 오브젝트 종류	
  - `String`, `Array`, `Map`, `Set`, `TypedArray`, `Argument` 오브젝트 그리고 DOM의 `NodeList`

 위 built in 오브젝트들은 디폴트로 이터러블 프로토콜을 가지고 있다. 오브젝트에 `Symbol.iterator`가 있어야 한다.

 `Symbol.iterator` 가 있는 오브젝트는 이터러블 오브젝트다. 또한 상속받은 prototype chain에 있어도 이터러블 오브젝트다.

 오브젝트에 프로퍼티 존재 여부를 채크할 때, `Symbol`의 경우에는 `arrayObj[Symbol.iterator]`와 같이 대괄호 안에 작성해야 한다.

```javascript
let arr = [];
console.log(arr[Symbol.iterator]);
// function values() {[native code]}
let obj = {a:1};
console.log(obj[Symbol.iterator]);
//undefined
```

 `Array` 오브젝트는 기본적으로 `iterable` 프로토콜을 구현한다. 하지만 `Object` 오브젝트는 `iterable` 프로토콜을 구현하지 않는다.



```javascript
let iteratorObj = arr[Symbol.iterator]();
//iterator object
```

 위와 같은 방식으로 `Array` 오브젝트는 `iterator` 를 받을 수 있다.





## for-of statement

 `for-in statement`는 문자열 키를 가진 `Object` 객체들을 위해 만들어졌다. 그래서 ES6에서 `for-of statement`가 등장했다. `for-in loop statement`는 객체의 프로퍼티들을 루프시키지만 `for-of loop statement`는 데이터, 즉 배열 내의 value들을 루프시킨다. 또한 `for-of`는 배열 뿐만 아니라 다양한 Collection에도 동작한다. DOM의 `NodeList` 같은 유사배열 객체들에도 동작하고 문자열에도 동작한다. 문자열을 유니코드 문자의 배열로 취급한다. key-vale 형식의 `Map`에 대해서는 for(let [key, value] of ...) 형식의 구조분해할당을 사용한다

```javascript
for( let item of categories ) {
    console.log(item);
}
/*
출력
Korean
English
Science
*/
```





### 추가 내용 필요!