# Template literal

  템플릿 리터럴은 내장된 표현식을 허용하는 문자열 리터럴이다. 여러 줄로 이뤄진 문자열과 문자 보간 기능을 사용할 수 있다.

> 리터럴 : 소스 코드의 고정된 값을 대표하는 용어

  ES6에서 문자열 처리를 보다 간편하게 할 수 있는 **템플릿**을 제공한다. 문자열 처리를 위해 Backtick을 사용한다. 변수를 `${ }`로 감싸서 inline으로 표현할 수 있다.

```javascript
let name = "sbin";
// ES5
console.log("Hi" + name + "!\nHave a nice day!");
// 출력
// Hi sbin!
// Have a nice day!

// ES6
let templateName = `
Hi ${name}!
Have a nice day!
`;
console.log(templateName);
// 출력
// Hi sbin!
// Have a nice day!
```



 ### tagged template

```javascript
let name = "sbin";
let num = 27;
console.log(`Hi ${name}! ${num} is your number`);
```

  위 템플릿 리터럴을 tagged template을 사용하여 `text`와 `value`로 분리할 수 있다. `text`는 공백 문자를 기준으로 `배열` 의 형태로 파라미터가 들어오고 `${ }`

안의 표현식은 `value` 라는 파라미터로 `String` 타입으로 들어온다

```javascript
function greet(text, value){
    console.log(text);
    console.log(value);
    console.log(typeof value);
}
greet `hi, ${name}! ${num} is your number`;
// 출력 : ['hi, ', '! '," is your number"]
// 출력 : sbin
// 출력 : string
```

  

  parameter로 넘겨지는 `value`는 하나인데 템플릿 리터럴에는 표현식이 두개가 존재한다. 이 문제는 [Rest parameter](https://github.com/souvenir718/TIL/blob/master/JS/JS%20-%20Spread%2C%20Rest%20parameter.md) 를 사용할 수 있다.

```javascript
function greet(text, ...value){
    console.log(text);
    console.log(value);
}
greet `hi, ${name}! ${num} is your number`;
// 출력 : ['hi, ', '! '," is your number"]
// 출력 : ['sbin', 27]
```