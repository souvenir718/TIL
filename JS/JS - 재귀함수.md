# 재귀함수

: **내가 나를 호출하는 함수**



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

