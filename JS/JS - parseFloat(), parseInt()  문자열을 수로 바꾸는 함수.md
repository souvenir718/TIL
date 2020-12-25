# parseFloat(), parseInt() : 문자열을 수로 바꾸는 함수



## parseFloat()

  parseFloat()은 문자열을 실수로 바꾸는 함수다.

- 수로 시작할 때 그 수를 실수로 바꾼다.
- 띄어 쓰기로 여러 개의 수가 있으면 첫번째 수만 바꾼다.
- 공백으로 시작하면 공백은 무시한다.
- 수가 아닌 문자로 시작하면 NaN을 반환한다.



### 예제

```javascript
console.log("parseFloat('12.34') : ", parseFloat('12.34')); // parseFloat('12.34') : 12.34
console.log("parseFloat(' 12.34') : ", parseFloat(' 12.34')); // parseFloat(' 12.34') : 12.34
console.log("parseFloat('12.34 56.78') : ", parseFloat('12.34 56.78')); // parseFloat('12.34 56.78') : 12.34
console.log("parseFloat('A 12.34') : ", parseFloat('A 12.34'));
// parseFloat('A 12.34') : NaN
```



## parseInt()

  문자열을 정수로 바꾸는 함수



### 문법

```javascript
parseInt( string, n )
```

- string을 n진법일 때의 값으로 바꾼다. n은 옵션으로 2부터 36까지 입력할 수 있다. 입력하지 안흥면 10으로 처리된다.
- string의 처리는 parseFloat()과 거의 같다.
- 소수 부분은 버린다
- 0x로 시작하면 16진법으로 처리한다.



### 예제

```javascript
console.log("parseInt('12.68') : ", parseInt('12.68')); // parseInt('12.68') : 12
console.log("parseInt('100', 10) : ", parseInt('100', 10)); // parseInt('100', 10) : 100
console.log("parseInt('100', 2) : ", parseInt('100', 2)); // parseInt('100', 2) : 4
console.log("parseInt('0x100') : ", parseInt('0x100')); // parseInt('0x100') : 256
```

