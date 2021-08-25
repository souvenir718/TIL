# lodash

JS 라이브러리 중 하나로, `array`, `collection`, `date` 등 데이터의 필수적인 구조를 쉽게 다룰 수 있게끔 하는데 사용된다.

JS에서 배열 안의 객체들의 값을 핸들링할 때 유용하다.(배열, 객체 및 문자열 반복 / 복합적인 함수 생성)

` ㅡ.(변수)` 방식으로 작성할 경우 **lodash wrapper**로 변수를 감싸게 되면서 해당 변수에 대한 체이닝을 시작한다.



### lodash를 사용하는 이유

- 브라우저에서 지원하지 않는 성능이 보장되는 다양한 메소드를 가지고 있다.
- 퍼포먼스 측면에서 native보다 더 나은 성능을 갖는다.

- npm이나 기타 패키지 매니저를 통해 쉽게 사용이 가능하다.



## method

### array 관련 method

#### findIndex()

> 형식 : **_.findIndex(array, [predicate=.identity], [thisArg])**
>
> 출력: index number
>
> 배열 내에서 원하는 index를 쉽게 구할 수 있다.

```js
var myFriend = [
 {name:'kys',job:'developer',age:27},
 {name:'cys',job:'webtoons man',age:27},
 {name:'yhs',job:'florist',age:26},
 {name:'chj',job:'nonghyup man',age:27},
 {name:'ghh',job:'coffee man',age:27},
 {name:'ldh',job:'kangaroo father',age:27},
 {name:'hsy',job:'monk',age:27},
];

// 콜백함수를 통해 나이가 26인 객체가 처음으로 나오는 index 반환
_.findIndex(myFriend, function(friend) {
  return friend.age === 26; // 2
});

// 처음 일치하는 object의 index 값을 반환합니다.
_.findIndex(myFriend, { name: 'cys', job:'webtoons man',age: 27 }); // 1


// 나이가 26인 객체가 처음으로 나오는 index 반환
_.findIndex(myFriend, age: 27); // 0
```



#### flatten()

> 형식 : **_.flatten(array[isDeep])**
>
> 다차원 배열 내의 요소를 출력하는데 편리하다.

```js
// 배열안의 배열 값을 순서대로 나열합니다.(depth를 명시하지 않을 경우 1depth만)
_.flatten([1, [2, 3, [4]]]);
// [1, 2, 3, [4]]

// 배열안의 배열 값을 깊이와 상관없이 순서대로 나열합니다.
_.flatten([1, [2, 3, [4]]], true);
// [1, 2, 3, 4]
```



#### remove()

> 형식 :  **.remove(array, [predicate=.identity], [thisArg])**
>
> 출력: 제거된 array
>
> 배열 내의 조건에 맞는 요소들을 제거한 후 반환해준다.

```js
var array=[1,2,3,4];

var evens=remove(array,function(n){
   return n%2==0;
});

console.log(array);
// [1,3]

console.log(evens);
// [2,4]
```



#### pull()

> 형식: **.pull(array, values..)**
>
> 입력한 array에서 입력한 value 값들을 찾아 제거한 배열을 반환한다.

```js
var arr1 = ['a', 'b', 'c', 'a', 'b']l
_.pull(arr1, 'a', 'c');
// ['b', 'b']
```



#### uniq()

> 형식: **.uniq(array)**
>
> 입력한 array의 요소들 중 중복값을 제거한 배열을 반환한다.
>
> 배열안의 객체들의 요소 중복을 제거하고 싶을때는 **uniqBy**

```js
var arr = [1, false, '2', 1, 2, '2', false];
console.log(_.uniq(arr))
// [1, false, '2', 2]
```





### collection 관련 method

#### every()

> 형식: **.every(collection, [predicate=.identity], [thisArg])**
> 출력: boolean 값
> 배열 안 요소들의 값들을 비교하고 분석하는데 용이합니다.

```js
var myFriend = [
  { name: 'kys', active: false },
  { name: 'cys', active: false }
];

// 값을 비교할 수 있습니다.
_.every(myFriend, { name: 'kys', active: false });
// true

// key와 value가 있는지 확인할 수 있습니다.
_.every(myFriend, 'active', false);
// true

// key에 해당하는 value가 모두 true이면 true를 반환합니다.
_.every(myFriend, 'active');
// false
```



#### find()

> 형식: **.find(collection, [predicate=.identity], [thisArg])**
>
> 조건을 만족하는 컬렉션에서의 첫번째 요소를 반환하는 메서드이다.

````js
var myFriend=[
 {name:'kys',job:'developer',age:27},
 {name:'cys',job:'webtoons man',age:27},
 {name:'yhs',job:'florist',age:26},
 {name:'chj',job:'nonghyup man',age:27},
 {name:'ghh',job:'coffee man',age:27},
 {name:'ldh',job:'kangaroo',age:27},
]

// 콜백함수가 처음으로 참이되는 객체를 반환
_.find(myFriend, function(friend) {
  return friend.age < 28;
});
// { name: 'kys',job:'developer' ,'age': 27}
````



#### filter()

> 형식: **.filter(collection, [predicate=.identity], [thisArg])**
>
> 특정 조건을 만족하는 모든 요소를 추출하는 메서드이다.

```js
var myFriend=[
 {name:'kys',job:'developer',age:27},
 {name:'cys',job:'webtoons man',age:27},
 {name:'yhs',job:'florist',age:26},
 {name:'chj',job:'nonghyup man',age:27},
 {name:'ghh',job:'coffee man',age:27},
 {name:'ldh',job:'kangaroo',age:27},
]

// 입력한 object의 key와 value들을 모두 포함하는 객체들을 배열로 반환합니다.
_.filter(myFriend, { age: 26, job: 'florist' });
// [{ name: 'yhs',job:'florist', age: 26}]


// 입력한 key값이 true인 객체들을 배열로 반환합니다.
_.filter(myFriend, friend=>friend.age==26);
// [{ name: 'yhs',job:'florist', age: 26}]
```



#### map()

> 형식: **.map(collection, [predicate=.identity], [thisArg])**
>
> 함수를 실행한 결과를 배열로 반환한다.
>
> key 값을 입력할 경우 해당 key의 value값들만 반환한다.

````js
function timesTwo(n) {
  return n * 3;
}

_.map([1,2],timesTwo);
// [3,6]

var myFriend=[
  {'name':'kys'},
  {'name':'cys'},
];

.map(myFriend,'name');
// ['kys','cys']
````



#### forEach()

> 형식: **.forEach(collection, [predicate=.identity], [thisArg])**
>
> 배열의 값마다 함수를 실행시킬 때 용이하다.

```js
_([1, 2]).forEach(function(n) {
  console.log(n);
}).value();
// 1
// 2
```



#### includes()

> 형식: **.includes(collection, [predicate=.identity], [thisArg])**
>
> 출력: boolean
>
> 해당 값이 있는지 판별해준다.

```js
// 배열에 값이 있는지 찾습니다.
_.includes([1, 2, 3], 1);
// true

// index에 해당 값이 있는지 찾습니다.
_.includes([1, 2, 3], 1, 2);
// false

// 일치하는 값이 있는지 찾습니다.
_.includes({ 'name': 'yhs', 'age': 26 }, 'yhs');
// true

// 일치하는 값이 문자열 안에 있는지 찾습니다.
_.includes('dontknow', 'ont');
// true
```



---

[참고1](https://velog.io/@kysung95/%EC%A7%A4%EB%A7%89%EA%B8%80-lodash-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90)

[참고2](https://ibks-platform.tistory.com/392)