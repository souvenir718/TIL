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

