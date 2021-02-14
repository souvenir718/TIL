# 재귀함수 (21.02.14 Update)

  프로그래밍에서 **재귀**(Recursion)란 자신을 정의할 때 자기 자신을 재참조하는 것을 말한다. 따라서 **재귀함수**란 함수가 호출되어 실행할 때, 함수 내부에서 자기 자신을 다시 호출하는 **재귀 호출(Recursive call)**의 형태를 말한다.



## 재귀(Recursive)와 반복(Iterative)

  반복(Iterative)는 흔히 사용하는 `for`문이다 `forEach`문과 같은 반복 연산을 가리킨다. 대부분의 경우 재귀로 처리할 수 있는 문제는 반복 연산으로도 처리할 수 있고 반대의 경우도 마찬가지다. 



## 팩토리얼 구하기

  재귀 함수를 설명할 때 가장 많이 등장하는 예제 코드는 **팩토리얼 구하기**이다.  

팩토리얼을 먼저 **반복** 연산 코드로 작성해보면 아래와 같다.

```javascript
function factorial(n) {
    let result = 1;
    for(let i = n; i >= 1; i--){
        result *= 1;
    }
    return result;
}
```

> n부터 1까지의 수를 반복하여 `result` 변수에 곱한다.



이제 재귀함수로 구해보자. `factorial(5)`부터 `factorial(1)`을 써보면 아래와 같다.

```
factorial(5) = 5 * 4 * 3 * 2 * 1 = 5 * factorial(4)
factorial(4) = 4 * 3 * 2 * 1 = 4 * facotial(3)
factorial(3) = 3 * 2 * 1 = 3 * factorial(2)
factorial(2) = 2 * 1 = 2 * factorial(1)
factorial(1) = 1
```

  위에서 보이는 것 처럼 `factorial(n) = n * factorial(n-1)`이 된다. 이것을 코드로 표현해보면 아래와 같다.

```javascript
function factorial(n) {
    return n * factorial(n - 1);
}
```

  위의 코드는 `Maximum call stack size exceeded. 최대 호출 스택 사이즈가 초과되었다` 라는 에러를 출력하고 멈출 것이다. 이 부분이 **재귀 함수**를 사용할 때 가장 유의해야하는 부분이다.



 재귀 함수는 특정 조건이 되었을 때, 재귀 호출을 **종료하는 문장**이 반드시 하나 이상 존재해야 한다. 이러한 조건 문장을 `Base case` 또는 `Termination case`라고 한다.  위의 코드를 수정하면 아래와 같다.

```javascript
function factorial(n) {
    if( n === 1 ) {		// Base case, Termination case
        return 1;
    }
   	return n * factorial(n - 1);
}
```

> 위의 코드에서 Base case 역할인 `n`이 1이 되었을 때 1을 리턴해주며 종료한다.



## 재귀 함수를 사용했을 때의 단점

  **재귀 함수**를 사용하면 함수의 호출이 스택에 차곡 차곡 쌓이게 되고 위에서 부터 차례대로 값을 반환하기 전에는 계속 메모리 공간을 차지하고 있다. 그러므로 호출 스택이 너무 커져서 엄청나게 메모리를 소비할 수 있다. 그러므로 상황에 따라 반복문을 선택하는 등 적절한 방법을 사용해야 한다.



---

### 반복문을 이용한 1부터 100까지 합과 곱

```javascript
let n = 100;
let s = 0;
for(var i=1; i< n+1; i++){
    s += i;
}
console.log(s); // 5050
// O(n)

console.log(n * (n+1) / 2) // 5050
// O(1)
```



### 재귀함수를 이용한 1부터 100까지 합과 곱

```javascript
// 합
function f(n) {
    if( n <= 1 )
        return 1;
    return n + f(n-1);
}

console.log(f(100)); // 5050
// 곱
function f2(n) {
    if( n <= 1 )
        return 1;
    return n * f(n-1);
}
```



### 2진수 변환

```javascript
let x = 11;
let result = '';
while(true){
    if(x % 2 == 0){
        result += '0';
       // result = '0' + result;
    }else {
        result += '1'
       // result = '1' + result;
    }
    x = Math.floor(x / 2);
    /*
    	Math.ceil() : 소수점 올림
    	Math.floor() : 소수점 버림
    	Math.round() : 소수점 반올림
    */
    if(x == 1 || x == 0){
        result += String(x)
       // result = String(x) + result;
        break;
    }
}
// console.log(result); // 1011
console.log(result.split('').reverse().join(''));


// 재귀함수 사용
function toBinary(num) {
    if(num == 1 || num == 0) {
        return String(num);
    }
    return toBinary(Math.floor(num/2)) + String(num % 2);
}
```



### 문자열 뒤집기

```javascript
let x = 'subin';
let result = '';

while(true){
    if(x.length == 1){
        result += x;
        break;
    }
    let y = x.split('');
    result += String(y.pop());
    x = y.join('');
}
console.log(result); // nibus 

// 재귀함수

function reverseString(text){
    if(text.length == 1){
        return text;
    }
    return text[text.length-1] + reverseString(text.slice(0, text.length-1));
}
console.log(reverseString('subin'));
```



### 각 자리수의 합

```javascript
let x = '123123';
let result = '';

while(true){
    if(x.length == 1){
        result += parseInt(x, 10);
        break;
    }
    let y = x.split('');
    result += parseInt(y.pop(), 10);
    x = y.join('');
}
console.log(result); // 12

// 재귀함수로
function addNumber(text){
    if(text.length == 1){
        return parseInt(text, 10);
    }
    return parseInt(text[text.length-1], 10) + reverseString(text.slice(0, text.length-1));
}
console.log(addNumber('123123'));
```



### 피보나치순열

```javascript
let a = 1;
let b = 1;

for(var i = 0; i< 6; i++){
    let c = a + b;
    a = b;
    b = c;
}

// 재귀
function fibo(num){
    if(num == 1 || num == 2){
        return 1;
    }
    return fibo(num-1) + fibo(num-2);
}
console.log(fibo(7)); // 13
// 1 1 2 3 5 8 13
```

