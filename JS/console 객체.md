# console 객체

> log, dir, count, time, timeEnd



### log

- 사용법

```javascript
var a = 1;
var b = 'hello';
var c = true;
console.log(a); // 단일 로그
console.log(a, b, c); // 여러 개를 동시에 로그
console.log('%d는 숫자 %s는 문자열', a, b); // C언어의 printf처럼 사용
console.log(`${a}는 숫자 ${b}는 문자열`); // 이런식의 방법을 더 선호
```

- 똑같이 로깅하지만 디자인이 조금 다른 경우

> info, warn, error

```javascript
console.log('기본');
console.info('정보');
console.warn('경고');
console.error('에러');
```

![console여러가지](https://cdn.filestackcontent.com/hkBgUfzCTmynt33mBbnW)



- 로깅할 때 발생하는 실수

```javascript
var obj = {};
console.log(obj);
obj.a = 1;
console.log(obj);
```

> 첫 로그는 `{}` 가 되고 두번째는 `{a: 1}` 이 된다.
>
> 그러나 자세히 살펴보면 다음과 같다.

![로깅실수](https://cdn.filestackcontent.com/cj1Mv1N8QCSMu1ZSNCHX)

> 코드에서 a에 1을 넣기 전이지만 첫 로그를 펴보면 `a: 1` 이라고 들어있다. 
>
> `console.log` 는 참조를 로깅하기 때문에, 객체와 같이 내용물이 변할 수 있는 것들은 내용이 실시간으로 바뀐다.
>
> **객체를 로깅할 때는 객체의 내용 변경사항이 실시간으로 업데이트 된다**



### dir

> 객체는 dir을 나머지는 log로 로깅하면 편하다.

```javascript
console.log(document.body); // <body> ... </body>
```

- DOM 객체의 메서드가 머가 있는지 보고싶을때는 dir을 사용

```javascript
console.dir(document.body);
```

![dir사용](https://cdn.filestackcontent.com/NU9hgHZDQyKMNbYvVHvx)

> 함수도 객체이므로 dir 사용해서 비교해보기!



### count

> 몇 번 호출되었나를 로긍하고 싶을 때 사용, 인자는 카운터의 이름이다.

```javascript
console.count('카운터'); // 카운터 : 1
console.count('카운터'); // 카운터 : 2
console.count('카운터'); // 카운터 : 3
```



### time, timeEnd

> 코드 수행 시간을 확인할 때 유용, 인자는 타이머의 이름
>
> time과 timeEnd에 같은 타이머 이름을 주어야 정상적으로 작동한다.

```javascript
console.time('타이머');
for(var i = 0; i < 1000000; i++) z=5;
console.timeEnd('타이머'); // 타이머 : 6.76656ms
```



