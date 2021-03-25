# Set

Set 객체는 JS의 표준내장객체 중 하나로 **중복을 허용하지 않는 값**을 모아놓은 컬렉션이다. Set에는 키가 없는 값이 저장된다.



## Methods

- `new Set(iterable)` - iterable object를 전달받으면(주로 배열) 그 안의 값을 복사해 `set`에 넣어준다.
- `set.add(value)` - 값을 추가하고 `set` 자신을 반환한다.
- `set.delete(value)` - 값을 제거하고 호출 시점에 `set`의 값이 제거에 성공하면 `true` 아니면 `false`를 반환한다.
- `set.has(value)` - `set` 내의 값이 존재하면 `true` 아니면 `false`를 반환한다.
- `set.clear()` - `set`을 비운다.
- `set.size` - `set`에 몇개의 값이 있는지 보여준다.

```javascript
let set = new Set()

let john = {name: "John"};
let pete = {name: "Pete"};
let mary = {name: "Mary"};

set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(pete);

console.log(set.size); // 3
```



## Iteration

- `for ... of`

```javascript
let set = new Set(["oranges", "apples", "bannas"]);

for(let value of set) console.log(value);
```



- `forEach`

```javascript
let set = new Set(["oranges", "apples", "bannas"]);

set.forEach((value, valueAgain, set)=>{
    console.log(value);
})
```



## set과 array

```javascript
// Array를 Set으로 변환하기 위해서는 정규 Set 생성자 사용
let mySet = new Set(myArray);

// Set을 Array로 변환하기 위해서는 전개 연산자 사용
console.log([...mySet]);
```

