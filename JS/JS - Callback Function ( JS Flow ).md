# Callback Function ( JS Flow )



​	**call(호출하다) back(다시 돌려주다 - return) function**

​	: 호출해서 돌려줄 함수

​	  => **제어권**을 맡긴다.



## 제어권



### 실행시점

```javascript
setInterval(function() { // 주기함수 호출
    console.log('1초마다 실행된다.');
}, 1000); // 주기마다 함수 실행

var cb = function() {
    console.log('1초마다 실행된다.')
};

setInterval(cb, 1000); // setInterval( callback, millisecondes)
```



### 인자

```javascript
var arr = [1, 2, 3, 4, 5];
var entries = [];

arr.forEach(function(v, i) { // value, index
    entries.push([i, v, this[i]]);
}, [10,20,30,40,50]);
/*
	arr.forEach( callback, [, thisArg])
	callback(currentValue, index, array)
*/
console.log(entries);

// [ [0, 1, 10], [1, 2, 20], [2, 3, 30], [3, 4, 40], [4, 5, 50] ]
```

> **forEach()** 메소드는 배열 요소마다 한번씩 콜백함수를 실행한다.
>
> - `callback` : 각 요소에 대해 실행할 함수, 인수 셋을 취한다.
>   - `currentValue` : 배열에서 현재 처리 중인 요소
>   - `index` : 배열에서 현재 처리중인 요소의 인덱스
>   - `array` : `forEach()`가 적용되고 있는 배열
> - `thisArg` : 선택사항. `callback`을 실행할 때 **this**로서 사용하는 값



### this

```javascript
document.body.innerHTML = '<div id="a">abc</div>'
function cbFunc(x) {
    console.log(this, x);
}

document.getElementById('a')
	.addEventListener('click', cbFunc);

$('#a').on('click', cbFunc);

// 출력 : <div id="a">abc</div> MouseEvent {...}
```

> `target.addEventListener(type, listener[, useCapture]);`
>
> - `type` : 등록할 이벤트 타입을 나타내는 문자열
> - `listener` : 특정타입의 이벤트가 발생할 때 알림을 받을 객체, 반드시 EventListener 인터페이스를 수행하는 객체거나, Javascript function이어야 한다.



### 콜백함수의 특징

- 다른 함수(A)의 인자로 콜백함수(B)를 전달하면 A가 B의 **제어권**을 갖는다.
  - A에 **미리 정해놓은 방식**에 따라 B를 호출한다.(특별한 요청(bind)가 없는 한)
  - 미리 정해놓은 방식이란 어떤 **시점**에 콜백을 호출할지, **인자**에는 어떤 값들을 지정할지, **this**에는 무엇을 바인딩할지 등이다.



### !주의!

​	**콜백은 '함수'다.!**

```javascript
var arr = [1, 2, 3, 4, 5];
var obj = {
    vals : [1, 2, 3];
    logValues : function(v, i) {
        if(this.vals) { // this.vals = [1, 2, 3]
            console.log(this.vals, v, i);
        } else {
            console.log(this, v, i);
        }
    }
};
obj.logValues(1, 2); // 메소드로서 호출
arr.forEach(obj.logVlues); // 콜백함수로 호출 => this는 window!!
```



---

출처 : [JS - Flow](https://www.inflearn.com/course/%ED%95%B5%EC%8B%AC%EA%B0%9C%EB%85%90-javascript-flow/dashboard)

