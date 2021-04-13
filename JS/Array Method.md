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

