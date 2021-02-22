# JS  배열 내장함수↓

> forEach, map, filter, reduce, splice, slice, shift, pop, unshift, push, indexof, findindex, find, join

---

### 1. forEach

- 배열을 반복하는 메서드

```javascript
const arr = [1, 2, 3, 4, 5];

for(let i=0; i<arr.length; i++){
    console.log(arr[i]);
}
// 위의 코드를 forEach를 사용하면 보다 쉽게 구현할 수 있다.
arr.forEach(function(item, index, array) {
   console.log(item); 
});
```

> `forEach` 는 인자로 함수를 전달하고 이 함수의 매개변수는 배열 `arr` 의 요소가 된다.
>
> 배열의 첫번째 인덱스부터 마지막 배열 인덱스까지 반복한다.
>
> 콜백함수의 첫번째 인자는 현재 배열 요소의 값이고, 두번째 인자는 현재 배열의 위치(0부터 시작), 세번째 인자는 현재 돌고 있는 배열 자체를 가리킨다.



### 2. Map

- 배열의 모든 요소를 이용하여 새로운 배열을 반환하는 메서드

```javascript
const arr = [1, 2, 3, 4, 5];

const arr2 = arr.map(function(item, index, array){
    return item * item;
});

// arr2 = [1, 4, 9, 16, 25]
```

> `map` 은 인자로 함수를 전달하고 이 함수의 매개변수는 배열 `arr` 의 요소가 된다.
>
> 배열 요소마다 함수안의 구문이 실행되고 새로운 배열 `arr2` 에 저장한다.



### 3. filter

- 조건에 만족하는 모든 요소들을 모아 새로운 배열을 반환하는 메서드
- 메서드 수행 중 true를 리턴하는 경우만 추출해서 새로운 배열을 추가하고 새로운 배열을 리턴한다.

```javascript
const arr = [1, 2, 3, 4, 5];

const arr2 = arr.filter(function(item, index, array) {
    return item % 2 === 0;
});

// arr2 = [2, 4]
```

> `filter` 의 인자로 전달된 함수에서 매개변수가 조건을 만족하는 경우에만 해당 매개변수를 리턴한다.



### 4. reduce

- 배열의 각 요소에 대해 reducer 함수를 실행하고 하나의 결과값을 반환한다.
- 인자로는 reducer 함수와 previousItem초기값을 받는다.
  - reducer 함수란 정해진 4개의 매개변수가 있다.
    - previousItem:  이전 콜백함수에서 리턴한 값
    - currentItem: 현재 배열 요소의 값
    - index: 현재 배열 요소의 위치
    - array : 현재 돌고 있는 배열 자체
  - 위의 순서를 지켜야 하지만 매개변수 이름은 바뀌어도 상관이 없다.
  - index와 array는 생략 가능하다.
  - 다른 메서드와 달리 콜백함수 뒤에 인자를 줄 수 있다. 이 인자는 previousItem으로 주입된다.

```javascript
const arr = [1, 2, 3, 4, 5];

const result = arr.reduce(function(prev, currentItem) { // previousItem, currentItem
    return prev + currentItem;
}, 0);

cconsole.log(result); // 출력 : 15
```

> `return prev + currentItem;` 에서 `previousItem` 와 `currentItem` 값을 더한 값을 리턴하고
>
> 이 리턴값은 다시 `previousItem` 에 저장되어 순환한다. 
>
> 첫 순환에서 `prev` 는 0이고 `currentItem` 는 배열의 첫번째 요소인 1이다. 이 둘을 더한 값이 다시 `acc`에 저장된다.
>
> 위의 과정을 반복하면 `1 + 2 + 3 + 4 + 5` 가 되고 `15` 의 값을 출력한다.



```javaScript
const arr1 = [1, 2, 3, 4, 5];

const result = arr1.reduce(function(prev, currentItem, index, array) {
    if(index === array.length - 1) {
        return (prev + currentItem) / array.length;
    } else {
        return prev + currentItem;
    }
});

console.log(result); // 출력 : 3
```

> `if` 문에서 `index`가 배열의 길이 -1와 같은지 검사한다.
>
> 배열의 길이에서 1을 빼준 것은 인덱스가 0부터 시작하기 때문이다.
>
> 마지막 인덱스일 경우만 배열길이로 나누어줘서 전부를 더한 값인 `15` 를 배열의 길이 `5` 로 나누어 출력이 `3` 이 된다.



### 5. splice

-  해당 구간 인덱스의 요소를 다른 요소로 바꾸거나 삭제하고 **새로운 배열**을 반환한다.

```javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.splice(0, 2);

// arr2 = [1, 2]
// arr = [3, 4, 5]
```

> `splice` 메서드는 첫번째 요소는 시작지점의 인덱스를 지정, 두번째 요소는 제거할 요소의 수이다.
>
> `arr.splice(0, 2)` 이므로 `arr` 에서 0번째 요소 1부터 2개의 요소인 `1, 2`를 `arr2`에 저장,
>
> `arr` 에는 `1, 2` 를 제거하고 난 `3, 4, 5` 를 저장한다.



```javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.splice(0, 2, 10, 11);

// arr2 = [1, 2]
// arr = [10, 11, 3, 4, 5]
```

> 위 코드와 같이 `1, 2`를 제거하고 추가할 요소 `10, 11` 를 전달해줄 수 있다.



### 6. slice

- `splice` 와는 다르게 해당 구간 인덱스만을 가지는 새로운 배열을 반환한다.
- `splice` 는 해당 구간 인덱스를 삭제하지만 `slice` 는 유지한다.

```javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.slice(1,3);

// arr2 = [1,2,3,4,5]
// arr = [2,3]
```

> `slice(start, end)`
>
> `slice` 는 `start` 인자부터 `end` -1 요소까지, 위의 코드에서 보면 1번째 요소인 `2` 부터 3번째 요소인 `4`  의 전까지 `3` 까지로 정한다.
>
> 만약 인자가 음수값을 가질 경우 배열의 마지막부터 계산한다.



### 7. shift

- 배열의 첫번째 요소를 제거한다.

```javascript
const arr = [1, 2, 3, 4, 5];
arr.shift();
// arr = [2, 3, 4, 5]
```



### 8. pop

- 배열의 마지막 요소를 제거한다.

```javascript
const arr = [1, 2, 3, 4, 5];
arr.pop();
// arr = [1, 2, 3, 4]
```



### 9. unshift

- 배열의 첫번째 요소에  value를 추가한다.

```javascript
const arr = [1, 2, 3, 4, 5];
arr.unshift(10); // arr.unshift(value)
// arr = [10, 1, 2, 3, 4, 5]
```



### 10. push

- 배열의 마지막 요소에 value를 추가한다.

```javascript
const arr = [1, 2, 3, 4, 5];
arr.push(10); // arr.push(value)
// arr = [1, 2, 3, 4, 5, 10]
```



### 11. indexOf

- 배열의 요소 값을 `indexOf` 인자로 넘겨주면 몇번째 인덱스인지 알려준다.

```javascript
const arr = ['호랑이', '사자', '고양이'];
console.log(arr.indexOf('고양이')); // 2
```



### 12. findIndex

- 배열에서 조건에 맞는 값이 몇번째 인덱스인지 알려준다.
- 메서드 인자로 조건을 콜백함수로 넘겨준다

```javascript
const arr = [
    {name : '호랑이'},
    {name : '사자'},
    {name : '고양이'}
];
console.log(arr.findIndex(element) => element.name === '고양이')); // 2
```



### 13. find

- `findIndex` 와 유사하지만 차이점은 `find`는 인덱스가 아닌 값을 리턴한다.

```javascript
const arr = [
    {name : '호랑이'},
    {name : '사자'},
    {name : '고양이'}
];
console.log(arr.find(element) => element.name === '고양이')); // {name : '고양이'}
```



### 14. join

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.join('A')); // 1A2A3A4A5A
```

> 배열을 문자열로 리턴하는데 메서드의 인자로 넘겨준 값('A')으로 각 요소 사이에 구분을 둘 수 있다.
>
> 인자로 아무것도 전달하지 않으면 ',' 로 구분한다.
>
> 공백을 인자로 전달할 경우 `12345` 같이 모든 요소가 구분 없이 리턴한다.



### 15. some

- 배열 요소 중에서 하나라도 특정 조건을 만족하는지 알고 싶을 때 매우 적합한 메서드
- 메서드 수행 중 한번이라도 true 값을 리턴하면 메서드를 중단하고 true를 리턴
- 전체 요소를 돌때까지 콜백에서 true를 리턴하지 않으면 false를 리턴한다.

```javascript
const arr = ["aaa", "bbb", "ccc", "ddd"];

arr.some(function(item, index, array) {
    console.log(index + "번째 요소 : " + item);
    return item === "bbb";
});

// 0번째 요소 : aaa
// 1번째 요소 : bbb
// 리턴값은 true
```



### 16. every

- 배열의 모든 요소가 특정 조건을 만족하는지 알고 싶을 때 매우 적합한 메서드
- 메서드 수행 중 한번이라도 false 값을 리턴하면 메서드 수행을 중단하고 false를 리턴
- 전체 요소를 다 돌때까지 false를 리턴하지 않으면 true를 리턴

```javascript
const arr = ["aaa", "bbb", "ccc", "ddd"];

arr.every(function(item, index, array) {
   console.log(index + "번째 요소 : " + item);
    return item === "aaa";
});

// 0번째 요소 : aaa
// 1번째 요소 : bbb
// 리턴 값은 false
```

