# Array API

**Array.[methodName] vs Array.prototype.[methodName]**

  위 두 가자ㅣ는 접근 방법이 다르다. 전자는 Array라는 오브젝트의 메소드이며 후자는 Array 타입의 모든 오브젝트에서 사용할 수 있는 메소드다.

```javascript
const arr = [1,2,3];
arr.from('subin'); // Error : arr.from is not a function
for(let item of arr.values()) {
    console.log(item);
}
/*
1
2
3
*/
```

  `Array.from()` 과 `Array.prototype.values()` 둘 차이를 보여주는 예제다.



### Array.from()

- `from()` 은 유사배열(Array-Like-Object)을 배열로 바꿔준다.

```javascript
const arrLikeObj = {'0':'zero', '1':'one', '2':'two','length':3};
const arrFrom = Array.from(arrLikeObj);

console.log(arrFrom);
// 출력 : Array ['zero', 'one', 'two']
```



  이 방법을 통해 `String` 을 `Array`로 변경할 수 있다.

```javascript
const str = 'sbin';
console.log(Array.from(str)); // Array['s','b','i','n']
console.log(new Array(...str)); // Array['s','b','i','n']
```



  `from()` 을 사용하면 유용한 경우

```javascript
const ul = document.getElementById('content');
const ulClassList = ul.classList;
console.log(ulClassList);
// ["content-list", "foo", "bar","baz", value:"contet-list foo bar baz"]

const ulClassArr = Array.from(ulClassList);
console.log(ulClassArr); 
// ["content-list", "foo", "bar", "baz"]
console.log(Array.isArray(ulClassArr)); // true
```

  `DOM`의 `ClassList`는 유사배열로 변환이 된다. 이것을 `from()`을 사용하여 배열로 변경하여 `Array API`를 사용할 수 있도록 바꿔줄 수 있다.



- `from()` 의 두번째 인자로 콜백 함수를 넘겨줄 수 있다.

```javascript
const arrLikeObj = {'0': 100, '1': 101, '2': 102, 'length': 3};
const arrFromWithCb = Array.from(arrLikeObj, elm => elm + 100);

console.log(arrFromWithCb);
// [200, 201, 202]
```



- `from()` 의 세번째 인자로는 두번째 인자로 넘겨준 콜백 함수에서 참조할 오브젝트를 넘겨줄 수 있다.

```javascript
const arrFromWithCb3 = Array.from(arrLikeObj, function(elm){
  return +elm + this.value
}, {value: 200});
console.log(arrFromWithCb3);
// [300, 301, 302]
```



### Array.of()

  `of()`로 전달되는 파라미터 값을 배열로 변환한다.

```javascript
const arr = Array.of(1,2,3);
console.log(Array.isArray(arr)); // true
console.log(arr); // [1,2,3]
```



  문자열도 `Spread` 연산자와 함께 사용하면 배열로 변환할 수 있다.

```javascript
const str = 'sbin';
const strArr = Array.of(...str);
console.log(strArr); // ['s','b','i','n']
```

