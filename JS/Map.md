# Map

**Map**은 `key`가 있는 데이터를 저장할 수 있다.



##  Map vs Object

- `Key` : `key` 값으로 `primitiv value`(원시 자료형)를 써야할 때는 `map`을 사용(number, object, boolean 등..)
- `Order` : 삽입 순서를 기억해야할 때는 `map` 사용
- `Size` : `map`에서는 쉽게 `size`를 얻을 수 있다.

```javascript
// key의 다양한 자료형
let map = new Map();

map.set('1', 'str1'); // string
map.set(1, 'num1'); // number

console.log(map.get(1)); // 'num1'
console.log(map.get('1')); // 'str1'

// key로 object 사용
let john = { name: "John"};
let visitsCountMap = new Map();
visitsCountMap.set(john, 123);

console.log(visitsCountMap.get(john)); // 123
```



## Methodsd

- `new Map()` - 맵을 만드는 생성자
- `map.set(key, value)` - `key`를 이용해 `value`를 저장
- `map.get(key)` - `key`에 해당하는 값을 반환한다.(`key`가 존재하지 않으면 `undefined`를 반환)
- `map.has(key)` - `key`가 존재하면 `true`, 존재하지 않으면 `false`를 반환한다.
- `map.delete(key)` - `key`에 해당하는 값을 삭제한다.
- `map.clear()` - `map` 안의 모든 요소를 제거한다.
- `map.size` - 요소의 개수를 반환한다.



## Iteration

```javascript
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
])
```



- `map.keys()` - `key`를 모은 iterable object를 반환

```javascript
for(let vegetable of recipeMap.keys()) {
    console.log(vegetable); // cucumber, tomatoes, onion
}
```

- `map.values` - `value`를 모은 iterable object를 반환

```javascript
for(let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
}
```

- `map.entries()` - `[key, value]`를 한쌍으로 반환

```javascript
for(let enty of recipeMap) {
    console.log(entry); // cucumber,500 ....
}
```



## Conversion

- `Object.entries` - `object`를 `map`으로 변환
- `Object.fromEntries` - `map`을 `object`로 변환

```javascript
let obj = {
    name: "john",
    age: 30
};

let map = new Map(Object.entries(obj));
console.log(map.get('name')); // John

let map =  new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);
// obj = {banana: 1, orange: 2, meat: 4}
```

