# Spread, Rest parameter



### Spread

 이터러블 오브젝트(Iterable Object)의 엘리먼트를 하나씩 분리하여 전개한다. 전개한 결과를 변수에 할당하거나 호출하는 함수의 파라미터 값으로 사용할 수 있다.

```javascript
let prev = [3,4];
let post = [7,8];
let spreadObj = [1,2 ...prev, 5,6, ...post,9];
console.log(spreadObj);
// 출력 : [1,2,3,4,5,6,7,8,9]
```

문자열의 경우

```javascript
let spreadObj = [..."javascript"];
console.log(sObj); 
// 출력 : ["j","a","v","a","s","c","r","i","p","t"]
```



### Rest Parameter

 함수를 호출할 때, `spread` 연산자로 파라미터를 작성한 형태를 `Rest parameter` 라고 한다. 함수안의 코드를 확인하지 않고도 호출문의 형태만 보더라도 `Rest parameter` 의 범위를 확인할 수 있어 가독성이 높아진다. 또한 `Rest parameter` 의 범위를 확인할 수 있어 가독성이 높아진다. 또한 `Rest parameter`는 `Array`, 즉 배열이므로 `Array` 오브젝트의 메서드를 사용할 수 있다. 그리고 `arrow function` 에서도 사용 가능하다.

```javascript
let price = [12,20, 18];
Math.max(12, 20, 18);
```

 built in Object인 `Math`의 메소드 `max()` 를 사용하기 위해서는 위 코드처럼 값을 하나씩 넘겨줘야 한다.

 또는 다음과 같은 방식을 사용한다.

```javascript
Math.max.apply(Math, price);
```

 하지만 `Rest parameter`를 사용하면 보다 깔끔하게 작성할 수 있다.

```javascript
let maxPrice = Max.max(...price);
```



`Rest parameter` 는 동적(dynamic)으로 생성된 파라미터라고 할 수 있기 때문에 함수의 `length`에서 포함되지 않는다. 기본적으로 함수의 `length` 프로퍼티는 파라미터의 개수를 의미한다.

```javascript
let getElementByRestWithParam = (param, ...rest) => {
    console.log(param);
    console.log(rest);
}
console.log(getElementRestWithParam.length);  // 1
```

 위 `getElementByRestWithParam` 메서드에 `spread operator`를 사용하여 인자를 넘겨보자.

```javascript
const values = [10, 20, 30];
getElementByRestWithParam(...values);
// 출력 : 10
// 출력 : [20,30]
```

 `param` 에 해당하는 인자가 따로 받아지고 나머지 인자들은 `...rest` 로 넘겨지면서 다시 배열로 넘겨진게 된다.



`Rest parameter` 를 사용했을 때와 기존의 자바스크립트에서 `arguments`를 사용했을 때의 차이점을 살펴보기위해 `arguments` 에 대해서 잠깐 살펴보자. `arguments` 는 `Array-Like Object` 라는 공식명칭을 하고 있는 유사 배열이다.



### Array-like Object(유사배열)

 배열의 특징 중 하나는 index를 갖고 있어서 임의 접근이 가능하고, 그 index가 순차적으로 증가하는 것이다. 만약 `Object`가 `key` 값이 순차적으로 증가하는 값이고 그에 따른 `value`가 존재한다고 했을 때, **`Array-like Object`**라고 한다.

 배열의 index 값을 프로퍼티 `key` 값으로 사용하는 것이다. 그리고 `length` 라는 프로퍼티 값을 갖고 있어서 전개를 할 때는 다음과 같이 한다.

```javascript
let arrLikeObj = {
    0: "zero",
    1: "one",
    2: "two",
    length: 3
};

for(let i=0; i<arrLikeObj.length; i++){
    console.log(arrLikeObj[i]);
}
```

 `Array-like Object` 는 다음 두가지 규칙을 만족시켜야 한다.

1. 프로퍼티 값을 0부터 1씩 증가하면서 순차적으로 작성해야 한다.
2. `length`를 프로퍼티 키로 하여 전체 프로퍼티 수를 작성해야 한다.



### Rest parameter와 arguments의 차이

 `arguments`도 `Array-like Object` 이기 때문에 `for statement`로 전개할 수 있다. 하지만 `Array` 오브젝트의 메서드를 사용할수 없다. 또, `arrow function` 에서는 `arguments`를 사용할 수 없다. 이것으로 보아 ES6에서는 `arguments` 사용을 자제하라는 느낌이다. 사실 `Rest paramter`에 익숙해지면 `arguments`를 사용하는 것보다 유연한 코드를 작성할 수 있다.



[출처](https://jaeyeophan.github.io/2017/04/18/ES6-4-Spread-Rest-parameter/)

