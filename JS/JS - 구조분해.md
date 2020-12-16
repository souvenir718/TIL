# 구조분해와 기본 매개변수



## 구조분해

 `shorthand` 방식을 이용하여 함수의 반환값을 바로 객체에 할당할 수 있다. 이때 함수에서 반환되는 프로퍼티 값과 지역변수의 이름이 같아야 한다. 이렇게 하면 함수의 반환 값을 임시 객체에 저장하고 그 객체의 프로퍼티를 통해 접근하여 지역 변수에 할당하는 과정을 축소할 수 있다. 굳이 전체를 객체에 할당하지 않고 부분적으로 할당할 수 있다. 

```javascript
function buildUser(first, last) {
    let fullName = first + " " + last;
    return {first, last, fullName};
}

let {first, last, fullName} = buildUser("Sam", "Williams");

console.log(first); // Sam
console.log(last); // Williams
console.log(fullName); // Sam Williams
```

 위와는 달리 부분적으로 할당도 가능하다

```javascript
let { fullName } = buildUser("Sam", "Williams");
console.log(fullName); //Sam Williams
```



### 구조분해 할당

 오른쪽의 배열을 분할하여 왼쪽의 변수에 값을 `할당`한다. 인덱스번째의 엘리먼트 값을 인덱선번째의 변수에 할당하는 것이다. 엘리먼트가 아직 남았는데 할당할 변수가 없다면 그대로 할당되지 않고, 엘리먼트가 남지 않았는데 할당한 변수가 있다면 그 변수는 `undefined`로 할당된다.

```javascript
let one, two, three, four;
// case 1
[one, two] = [1, 2];
console.log(one); // 1
console.log(two); // 2

// case 2
[one, two, three] = [1, 2];
console.log(one); // 1
console.log(two); // 2
console.log(three); // undefined

// case 3
[one, two] = [1, 2, 3]
console.log(one); // 1
console.log(two); // 2
```



 `Spread` 연산자를 사용할 수 있고, 공백으로 두어 해당 값을 건너뛰고 `할당`할 수 있다.

```javascript
[one, ...other] = [1, 23, 24, 25];
console.log(one); // 1
console.log(other); // [23, 24, 25]

[one,,,four] = [1, 2, 3, 4];
console.log(one); // 1
console.log(four); // 4
```



### Default Value

 **구조분해**를 통해 값을 할당할 때, 해당하는 값이 없으면 `undefined` 대신 할당할 `default value`를 지정해 줄 수 있다.

```javascript
let [first, second, third = 3] = [1, 2];
console.log(first); // 1
console.log(second); // 2
console.log(third); // 3

let [fourth, fifth, sixth = 6] = [4, 5, 66];
console.log(fourth); // 4
console.log(fifth); // 5
console.log(sixth); // 66
```



### Default Parameter

 `parameter`에 값이 넘어가지 않아도, `default value` 로 설정된 값이 해당 파라미터 대신 값이 할당된다. `parameter`에서도 마찬가지로 기존의 `default value`는 `undefined` 값이었지만, 그 값을 코드 상에서 설정할 수 있게 된것이다.

```javascript
let somethingFunction = (prev, post=20) => prev+post;
console.log(somethingFunction(1)); //21 
console.log(somethingFunction(1, 2)); //3
console.log(somethingFunction(1, undefined)); //21
console.log(somethingFunction(1, null)); //1
```

 함수에도 `length` 라는 `property` 가 따로 존재한다. 그런데 `default parameter`는 `length`에서도 무시된다.

