# 아스키코드 변환하기 ( charCodeAt / fromCharCode )



## charCodeAt / fromCharCode란?

- charCodeAt : 문자열 중 하나를 선택하여 아스키코드 번호로 변환해주는 함수
- fromCharCode : 아스키코드 번호를 받아 문자열을 구성해주는 함수



### charCodeAt 사용방법

```javascript
"문자열".charCodeAt([index]);

var s = "charCodeAt";

console.log("s.charCodeAt([4]) : ", s.charCodeAt([4]));

// s.charCodeAt([4]) : 67
```



### fromCharCode 사용방법

```javascript
String.fromCharCode([아스코코드값]);

var asc = 111;

console.log("String.fromCharCode(asc) : ", String.fromCharCode(asc));

// String.fromCharCode(asc) : o
```

