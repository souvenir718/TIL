# RxJS(Reactive Extensions For JavaScript)



## 리액티브 프로그래밍

 이벤트나 배열 같은 데이터 스트림을 비동기로 처리해 변화에 유연하게 반응하는 프로그래밍 패러다임.



## RxJS

- `observable`을 사용하여 비동기 및 이벤트 기반의 프로그램을 작성하기 위한 라이브러리
- 동기, 비동기에 구분없이 일관된 코드를 작성할 수 있는 라이브러리
- `RxJS`는 Iterator Pattern과 Observer Pattern을 결합하여 이벤트를 관리하기 위한 효율적인 방법 제공

### 주요 개념

1. `Observable` : 미래에 발생할 이벤트, 값을 모아놓은 컬렉션
2. `Observer` : `Observable`이 배달한 값을 읽을 수 있도록 하는 **콜백**들의 컬렉션
3. `Subscription` : `Observable`의 실행(기본적으로 `Observable`의 실행 **취소**에 적합)
4. `Operators` : 함수형 프로그램을 제공하기 위한 순수 함수들의 모음
5. `Subject` : `Observer`이자 `Observable`. 다수의 `Observable`에 브로드캐스팅할 수 있는 **유일한 방법**
6. `Scheduler` : `setTimeout`, `requestAnimationFrame`과 같은 **비동기 함수의 동시성 제어**



## 예제



### button의 이벤트 리스너

- 일반적인 코드

```javascript
const button = document.querySelector('button');
button.addEventListener('click', () => console.log('Clicked!'));
```

- RxJS 사용( `Observable`로 변환 )

```javascript
const {fromEvent} = rxjs;
const button = document.querySelector('button');
fromEvent(button, 'click')
	.subscribe(() => console.log('Clicked!'))
```



### 순수성

**RxJS**는 순수함수를 제공하기 때문에 넘어오는 값은 모두 독립적(**불변**)이다. 

- 일반적인 가변 변수를 사용하는 코드

```javascript
let count = 0;
let button = document.querySelector('button');
button.addEventListener('click', () => console.log(`Clicked ${++count} times`));
```

- RxJS를 사용하여 변수를 불변적으로 관리

```javascript
const { fromEvent } = rxjs;
const { scan } = rxjs.operators;

const button = document.querySelector('button');
fromEvent(button, 'click').pipe(
	scan(count => count+1, 0)
)
.subscribe(count => console.log(`Clicked ${count} times`))
```

> `scan`은 배열의 `reduce`와 유사하게 동작



### 흐름

**RxJS**는 다양한 오퍼레이터를 통해 이벤트 흐름을 제어 가능

- 1초가 지나야 사용자의 클릭을 허용하는 코드

```javascript
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
let button = document.querySelector('button');
button.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```

- **RxJS** 사용

```javascript
const { fromEvent } = rxjs;
const { throttleTime, scan } = rxjs.operators;

const button = document.querySeletor('button');
fromEvent(button, 'click').pipe(
	throttleTime(1000),
    scan(count => count+1, 0)
)
.subscribe(count => console.log(`Clicked ${++count} times`));
```



### 유연한 값

구독이 일어나기 전 오퍼레이터들을 이용하여 값들을 미리 변환 가능

- 클릭할 때마다 마우스의 X Position을 더해주는 코드

```javascript
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
const button = document.querySelector('button');
button.addEventListener('click', (event) => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count)
    lastClick = Date.now();
  }
});
```

- **RxJS** 사용

```javascript
const { fromEvent } = rxjs;
const { throttleTime, map, scan } = rxjs.operators;

const button = document.querySelector('button');
fromEvent(button, 'click').pipe(
	throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
)
.subscribe(count => console.log(count));
```

### 참고

[참고1](https://ddalpange.tistory.com/50)