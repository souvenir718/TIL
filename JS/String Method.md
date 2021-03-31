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



