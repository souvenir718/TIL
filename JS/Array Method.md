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

