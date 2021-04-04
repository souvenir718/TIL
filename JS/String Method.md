# String Method

### repeat()

`repeat()` 메서드는 호출된 문자열의 지정된 `count`의 복사본이 있는 새 문자열을 반환한다.

```javascript
let str = 'Hello World ';
cnosole.log(str.repeat(2))
// Hello World Hello World
```



### charAt()

`charAt()` 메서드는 문자열의 지정된 인덱스에 있는 문자를 반환한다.

※ 마지막 문자의 인덱스는 string.length-1

```javascript
let str = "HELLO WORLD";
let res = str.charAt(0);
console.log(res); // H
```



### charCodeAt

`charCodeAt()` 메서드는 주어진 인덱스에 대한 UTF-16코드를 나타내는 0부터 65535사이의 정수를 반환한다.

```javascript
const sentence = "The quick"
const index = 4;
console.log(sentence.charCodeAt(index), senetence.charAt(index)); // 113 q
```



### concat()

`concat()` 메서드는 매개변수로 전달된 모든 문자열을 호출 문자열에 붙인 새로운 문자열을 반환한다.

```javascript
const str1 = "Hello";
const str2 = "World";

console.log(str1.concat(' ', str2)); // Hello World
console.log(str2.concat(',', str2)); // World, World
```



### endsWith()

`endsWith()` 메서드를 사용하여 어떤 문자열에서 특정 문자열로 끝나는지 확인할 수 있으며 그 결과는 `true`, `false`로 반환한다.

> str.endsWith(searchString[, length]);
>
> 파라미터
>
> 1. `searchString` : 이 문자열의 끝이 특정 문자열로 끝나는지를 찾기 원하는 문자열
> 2. `length`: 기본값은 문자열 전체 길이이며 찾고자 하는 문자열의 길이값을 나타낸다.

```javascript
const str = 'To be, or not to be, that is the question.';

console.log(str.endsWith('question.')); // true
console.log(str.endsWith('to be')); // false
console.log(str.endsWith('to be', 19)); // true
```



### includes()

`includes()` 메서드는 하나의 문자열이 다른 문자열에 포함되어 있는지를 판별하고, 결과를 `true` 또는 `false`로 반환한다.

> str.includes(searchString[, position]);
>
> 파라미터
>
> 1. `searchString`: 찾고자 하는 문자열
> 2. `position`: 기본값은 0이며, 찾기 시작할 위치를 입력한다.

```javascript
const sentence = 'The quick brown fox';

const word = 'fox';
console.log(sentence.includes(word)); // true
```



### indexOf()

`indexOf()` 메서드는 호출한 String 객체에서 주어진 값과 일치하는 첫번째 인덱스를 반환한다. 일치하는 값이 없으면 `-1`을 반환한다.ㅏ

> str.indexOf(searchValue[, fromIndex]);
>
> 파라미터
>
> 1. `searchValue`: 찾으려는 문자열, 아무것도 입력하지 않으면 `undefined`를 찾으려는 문자열로 사용
> 2. `fromIndex`: 문자열에서 찾기 시작하는 위치를 나타내는 인덱스 값, 음의 정수이면 전체 문자열을 찾고 기본값은 0이다.

```javascript
'Blue Whale'.indexOf('Blue');     // returns  0
'Blue Whale'.indexOf('Blute');    // returns -1
'Blue Whale'.indexOf('Whale', 0); // returns  5
'Blue Whale'.indexOf('Whale', 5); // returns  5
'Blue Whale'.indexOf('Whale', 7); // returns -1
```



### padEnd(), padStart()

`padEnd()` 메서드는 현재 문자열에 다른 문자열을 **우측부터** 채워, 주어진 길이를 만족하는 새로운 문자열을 반환한다. 

`padStart()` 메서드는 현재 문자열에 다른 문자열을 **좌측부터** 채워, 주어진 길이를 만족하는 새로운 문자열을 반환한다. 

> str.padEnd(targetLength, [, padString])
>
> 파라미터
>
> 1. `targetLength`: 목표 문자열 길이
> 2. `padString`: 현재 문자열에 채워넣을 다른 문자열

```javascript
const str = 'Hello';

console.log(str.padEnd(10, '!'))// Hello!!!!!
console.log(str.padStart(10, '!'))// !!!!!Hello
```



### search()

`search()` 메서드는 정규 표현식과 이 `String` 객체 간에 같은 것을 찾기 위한 검색을 실행한다.

> str.search(regexp)
>
> 파라미터
>
> 1. `regexp`: 정규표현식 객체
>
> 정규표현식과 첫번째로 매치되는 것의 인덱스를 반환한다. 찾지 못하면 `-1`을 반환한다.

```javascript
var str = 'hey JudE';
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re)); // return 4
console.log(str.search(re2)); // return -1
```



