# Array Method

### concat()

`concat()` 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.

- 기존 배열은 변경하지 않는다.
- 추가딘 새로운 배열을 반환한다.

```javascript
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e', 'f'];

const arr3 = arr1.concat(arr2);
console.log(arr3);
// Array ['a', 'b', 'c', 'd', 'e', 'f']
```



### entries()

`entries()` 메서드는 배열의 각 인덱스에 대한 키/값 쌍을 가지는 새로운 **Array Iterator** 객체를 반환한다.

```javascript
const a = ['a', 'b', 'c'];
const iterator = a.entries();

for(let e of iterator){
    console.log(e);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```



### every()

`every()` 메서드는 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트한다.

> 빈 배열에서 호출하면 무조건 **true**를 반환한다.

```javascript
[12, 5, 8, 130, 44].every(elem => elem >= 10); // false
[12, 54, 18, 130, 44].every(elem => elem >= 10); // true
```



### fill()

`fill()` 메서드는 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채운다.

```javascript
[1, 2, 3].fill(4); // [4,4,4]
[1, 2, 3].fill(4, 1); // [1,4,4]
[1, 2, 3].fill(4, 1, 2); // [1,4,3]
[1, 2, 3].fill(4, 1, 1); // [1,2,3]
Array(3).fill(4); // [4,4,4]
```



### filter()

`filter()` 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.

```javascript
funciton isBigEnough(value){
    return value >= 10;
}
const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// [12, 130, 44]


const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

const filterItems = (query) => {
  return fruits.filter((el) =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}
console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']
```



### find()

`find()` 메서드는 주어진 판별 함수를 만족하는 **첫 번째 요소**의 `값`을 반환한다. 그런 요소가 없다면 `undefined`를 반환한다. `find()`는 호출의 대상이 된 배열을 변경하지 않는다.

> arr.find(callback [, thisArg])
>
> **매개변수**
>
> - `callback` : 3개의 인수를 취하여 배열의 각 값에 대해 실행할 함수
>   - `element` : 배열에서 처리중인 현재 요소
>   - `index`  : 배열에서 처리중인 현재 요소의 인덱스
>   - `array` : findIndex 함수가 호출된 배열
> - `thisArg` : 선택 사항. 콜백을 실행할 떄 this로 사용할 객체

```javascript
const arr [5, 12, 8, 130, 44];

const found = arr.find(ele => ele > 10);
console.log(found) // 12
```





### findIndex()

`findIndex()` 메서드는 **주어진 판별 함수를 만족하는** 배열의 `첫 요소`에 대한 **인덱스**를 반환한다. 만족하는 요소가 없으면 -1을 반환한다. `findIndex()`는 호출된 배열을 변경하지 않는다.

> arr.findIndx(callback(element[, index [, array]]) [, thisArg])
>
> **매개변수**
>
> - `callback` : 3개의 인수를 취하여 배열의 각 값에 대해 실행할 함수
>   - `element` : 배열에서 처리중인 현재 요소
>   - `index`  : 배열에서 처리중인 현재 요소의 인덱스
>   - `array` : findIndex 함수가 호출된 배열
> - `thisArg` : 선택 사항. 콜백을 실행할 떄 this로 사용할 객체

```javascript
const arr = [5, 12, 8, 130, 44];

const isLargeNumber = (ele) => ele > 13;

console.log(arr.findIndex(isLargeNumber)); // 3
```



### flat()

`flat()` 메서드는 모든 하위 배열 요소를 지정한 깊이까지 재귀적으로 이어붙인 새로운 배열을 생성한다.

> const newArr = arr.flat([depth])
>
> **매개변수**
>
> - `depth`(optional) : 중첩 배열 구조를 평탄화할 때 사용할 깊이 값.(default = 1)
>
> **반환값** : 하위 배열을 이어붙인 새로운 배열

```javascript
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const arr5 = [1, 2, , 4, 5];
arr5.flat(); // [1, 2, 4, 5] 배열의 구멍도 제거
```



### flatMap()

`flatMap()` 메서드는 먼저 매핑함수를 사용해 각 엘리먼트에 대해 `map` 수행 후, 결과를 새로운 배열로 평탄화 한다.

> arr.flatMap(callback(currentValue[, index[, array]])[, thisArg])
>
> **매개변수**
>
> - `callback` : 새로운 배열의 엘리먼트를 생성하는 함수.
>   - `currentValue`: 배열에서 처리되는 현재 엘리먼트
>   - `index`(opt) : 현재 엘리먼트의 인덱스
>   - `array`(opt) : `map`이 호출된 배열
> - `thisArg`(opt) : `callback` 실행에서 `this`로 사용할 값.

#### map과 flatMap

```javascript
let arr1 = [1, 2, 3, 4];

arr1.map(x => [x*2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x*2]);
// [2, 4, 6, 8]

arr1.flatMap(x => [[x*2]])
// [[2], [4], [6], [8]] 1레벨만 평탄화된다.

let arr2 = ["it's Sunny in", "", "California"]

arr2.map(x => x.split(" "));
// [["it's", "Sunny", "in"], [""], ["California"]]

arr2.flatMap(x => x.split(" "));
// ["it's", "Sunny", "in", "California"]

// 다음은 음수는 제거하고 홀수는 1과 짝수로 분리하는 예시입니다.
let a = [5, 4, -3, 20, 17, -33, -4, 18]
//       |\  \  x   |  | \   x   x   |
//      [4,1, 4,   20, 16, 1,       18]

a.flatMap( (n) =>
  (n < 0) ?      [] :
  (n % 2 == 0) ? [n] :
                 [n-1, 1]
)

// expected output: [4, 1, 4, 20, 16, 1, 18]
```



### forEach()

`forEach()` 메서드는 주어진 함수를 배열 요소 각각에 대해 실행한다. `forEach()`는 `callback`을 배열에 있는 각 요소에 대해 오름차순으로 한번씩 실행한다.

```javascript
const arr1 = ['a', 'b', 'c'];

arr1.forEach(ele => console.log(ele));
// a
// b
// c
```



### from()

`Array.from()` 메서드는 유사 배열 객체나 반복 가능한 객체를 얕게 복사해 새로운  `Array` 객체를 만든다.

> Array.from(arrayLike[, mapFn[, thisArg]])
>
> **매개변수**
>
> - `arrayLike` : 배열로 변환하고자 하는 유사 배열 객체나 반복 가능한 객체
> - `mapFn`(opt) : 배열의 모든 요소에 대해 호출할 맵핑 함수
> - `thisArg`(opt) : mapFn 실행시에 this로 사용할 값

```javascript
console.log(Array.from('foo')); // Array['f', 'o', 'o']
console.log(Array.from([1,2,3], x => x + x));
// Array [2, 4, 6]
```



### includes()

`includes()` 메서드는 배열이 특정 요소를 포함하고 있는지 판별한다.

> arr.includes(searchElement [, fromIndex])
>
> **매개변수**
>
> - `searchElement`: 탐색할 요소(대소문자를 구분한다.)
> - `fromIndex` : 이 배열에서 searchElement 검색을 시작할 위치다. default는 0.

```javascript
const arr1 = [1, 2, 3];
console.log(arr1.includes(2)); // true

const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat')); // true

```



### indexOf

`indexOf()` 메서드는 배열에서 지정된 요소를 찾을 수 있는 첫번째 인덱스를 반환하고 존재하지 않으면 -1을 반환한다. `indexOf()`는 엄격한 동등성(`===`)을 사용하여 검색 요소를 `Array`의 요소와 비교한다.

> arr.indexOf(searchElement [, fromIndex])
>
> **매개변수**
>
> - `searchElement`: 탐색할 요소(대소문자를 구분한다.)
> - `fromIndex` : 이 배열에서 searchElement 검색을 시작할 위치다. default는 0.

```javascript
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));    // 1
console.log(beasts.indexOf('bison', 2)); // 4
console.log(beasts.indexOf('giraffe'));  // -1
```



### isArray()

`Array.isArray()` 메서드는 인자가 **Array**인지 판별한다.

```javascript
Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false
```



### join()

`join()` 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만든다.

> arr.join([separator])
>
> **매개변수**
>
> - `separator` : 배열의 각 요소를 구분할 문자열을 지정한다. 생략하면 배열의 소도을이 쉼표로 구분된다.

```javascript
const ele = ['Hello', 'world', '!' ];

console.log(ele.join()); // Hello,world,!
console.log(ele.join("")); // Helloworld!
console.log(ele.join(" "); // Hello world !

```



### keys()

`keys()` 메서드는 배열의 각 인덱스를 키 값으로 가지는 새로운 **Array Iterator** 객체를 반환한다. `keys()`는 빈 인덱스를 무시하지 않는다.

```javascript
const arr1 = ['a', 'b', 'c'];
const iter = arr1.keys();

for(const key of iter){
    console.log(key);
}
// 0
// 1
// 2
```



### lastIndexOf()

`lastIndexOf()` 메서드는 배열에서 주어진 값을 발견할 수 있는 마지막 인덱스를 반환하고 요소가 없으면 -1을 반환한다. `lastIndexOf()`는 일치연산(`===`)을 사용해 비교한다.

> **arr.lastIndexOf(searchElement[, fromIndex])**
>
> **매개변수**
>
> - `searchElement` : 배열에서 찾을 요소
> - `fromIndex(opt)` : 역순으로 검색을 시작할 인덱스. 배열의 길이에서 1을 뺀 값이 기본값이다.

```javascript
const arr = ['d', 'b', 'c', 'd'];

console.log(arr.lastIndexOf('d')); // 3
```



### map()

`map()` 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 **새로운 배열**을 반환한다. `map()`은 호출한 배열의 값을 변형하지 않는다. 단, `callback` 함수에 의해서 변형될 수는 있다.

> **arr.map(callback(currentValue[, index[, array]])[, thisArg])**
>
> **매개변수**
>
> - `callback` : 새로운 배열 요소를 생성하는 함수
>   - `currentValue` : 처리할 현재 요소
>   - `index` : 처리할 현재 요소의 인덱스
>   - `array` : `map()`을 호출한 배열
> - `thisArg` : `callback`을 실행할 때 `this`로 사용되는 값

```javascript
const arr1 = [1, 4, 9, 16];

const m1 = arr1.map(x => x*2);
console.log(m1) // [2, 8, 18, 32]
```



### of()

`Array.of()` 메서드는 인자의 수나 유형에 관계없이 가변 인자를 갖는 새 `Array` 인스턴스를 만든다.

`Array.of()`와 `Array` 생성자의 차이는 정수형 인자의 처리방법에 있다. `Array.of(7)`은 하나의 요소 **7**을 가진 배열을 생성하지만 `Array(7)`은 길이가 7일 빈 배열을 생성한다.

```javascript
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```



### pop()

`pop()` 메서드는 배열에서 **마지막** 요소를 제거하고 그 요소를 반환한다.

```javascript
const arr = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(arr.pop()); // tomato
console.log(arr); // ['broccoli', 'cauliflower', 'cabbage', 'kale']
```



### push()

`push()` 메서드는 배열의 끝에 하나 이상의 요소를 추가하고 **배열의 새로운 길이**를 반환한다.

```javascript
const arr = ['pigs', 'goats', 'sheep'];

const arr2 = arr.push('cows');
console.log(arr); // 4
console.log(arr); // ["pigs", "goats", "sheep", "cows"]
```



### reduce()

`reduce()` 메서드는 배열의 각 요소에 대해 주어진 **리듀서** 함수를 실행하고, 하나의 결과 값을 반환한다. **리듀서** 함수는 네 개의 인자를 갖는다. 누산기(acc), 현재 값(cur), 현재 인덱스(idx), 원본 배열(src). 반환 값은 누산기에 할당되고 누산기는 순회 중 유지되므로 최종 겨로가는 하나의 값이 된다.

> **arr.reduce(callback, [ initialValue])**
>
> **매개변수**
>
> 1. `callback` : 배열의 각 요소에 대해 실행할 함수.
>    - `accumulator` : 콜백의 반환값을 누적한다.  콜백의 이전 반환값 또는, 첫 호출이면서 `initialValue`를 제공한 경우에는 `intialValue`다.
>    - `currentValue` : 처리할 현재 요소
>    - `currentIndx`(opt) : 처리할 현재 요소의 인덱스. `initialValue`를 제공한 경우 0, 아니면 1부터 시작한다.
>    - `array`(opt) : `reduce()`를 호출한 배열
>    - `initialValue`(opt) : `callback`의 최초 호출에서 첫번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫번쨰 요소를 사용한다.

```javascript
const arr1 = [1, 2, 3, 4];
const reducer = (acc, cur) => acc + cur;

console.log(arr.reduce(reducer)); // 10
console.log(arr.reduce(reducer, 5)); // 15
5 + 1 + 2 + 3 + 4
```



### reverse()

`reverse()` 메서드는 배열의 순서를 반전한다. 첫 요소는 마지막 요소가 되며 마지막 요소는 첫 요소가 된다.

```javascript
const arr1 = ['one', 'two', 'three'];
console.log(arr1.reverse()); // three two one
```



### shift()

`shift()` 메서드는 배열에서 첫 요소를 제거하고 제거된 요소를 반환한다. 이 메서드는 배열의 길이를 변하게 한다.

```javascript
const arr1 = [1, 2, 3];
const firstEl = arr1.shift();
console.log(arr1); // 2, 3
console.log(firstEl); // 1
```



### slice()

`slice()` 메서드는 어떤 배열의 `begin` 부터 `end`까지 (end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환한다. 원본 배열은 바뀌지 않는다.

> **arr.slice([begin[, end]])**
>
> **매개변수**
>
> 1. `begin`(opt) : 0을 시작으로 하는 추출 시작점에 대한 인덱스를 의미한다.
>    - 음수 인덱스는 배열의 끝에서부터 길이를 나타낸다. `slice(-2)`는 배열에서 마지막 두개의 엘리먼트를 추출한다.
>    - `begin`이 명시되어있지 않으면, 0번 인덱스부터 `slice` 한다.
> 2. `end`(opt) : 추출을 종료한 0 기준 인덱스다. `slice`는 `end` 인덱스를제외하고 추출한다.
>    - `slice(2, -1)`은 세번째부터 끝에서 두번째 요소까지 추출한다.

```javascript
const arr1 = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(arr1.slice(2));
// ["camel", "duck", "elephant"]
console.log(arr1.slice(2, 4));
// ["camel", "duck"]
```

