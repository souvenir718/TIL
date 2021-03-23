# for await of

> 반복문 내에서 일어나는 모든 비동기 구문을 기다려주는 구문



### example code

```javascript
const names = ['a', 'b', 'c', 'd'];

names.forEach(async (name) => {
    const result = await fetch(`https://someurl.com/names/${name}`);
    console.log(result.json());
});

console.log('모든 api 통신 완료');
```

>실행 결과 :
>
>모든 api 통신 완료
>
><json result  'a'.... >
>
><json result  'b'.... >
>
><json result  'c'.... >
>
><json result  'd'.... >

#### ⇨ 위 예시의 포인트는 `forEach`에서의 모든 비동기 작업이 끝나는 것을 기다리지 않는다는 것이다.

위 문제를 아래의 코드로 해결할 수 있다.

``` javascript
const names = ['a', 'b', 'c', 'd'];

for await (let name of names) {
    const result = await fetch(`https://someurl.com/names/${name}`);
    console.log(result.json());
});

console.log('모든 api 통신 완료');
```



### Promise.all()과의 차이점

1. `promise.all()`은 인자의 프로미스 배열을 **동시**에 실행한다.
2. `for await of` 내의 비동기 작업은 **루프를 돌며** 순차적으로 실행된다.



타이머 예시를 통해 `for await of`와 `Promise.all()`의 차이를 알아보자. 추가로 `forEach` 메소드 안에서 `async function`을 사용한 결과와도 비교해보자.

```javascript
// 타이머 함수 정의
const timer = (time) => {
  return new Promise((resolve, reject) => {
    console.log(`${time} 타이머 시작`);
    setTimeout(() => {
      console.log(`${time} 타이머 끝`);
      resolve();
    }, time);
  });
};
```

```javascript
// Promise.all()을 이용한 여러 타이머 실행
async function runPromiseAll() {
  const times = [3000, 1000, 7000, 5000];

  await Promise.all(times.map((time) => timer(time)));

  console.log('모든 타이머 끝');
}
```

> 실행 결과 :
>
> 3000 타이머 시작
>
> 1000 타이머 시작
>
> 7000 타이머 시작
>
> 5000 타이머 시작
>
> 1000 타이머 끝
>
> 3000 타이머 끝
>
> 5000 타이머 끝
>
> 7000 타이머 끝
>
> 모든 타이머 끝



```javascript
// for await of문을 이용한 여러 타이머 실행
async function runForAwait() {
  const times = [3000, 1000, 7000, 5000];

  for await (let time of times) {
	  await timer(time);
  }

  console.log('모든 타이머 끝');
}
```

> 실행 결과 : 
>
> 3000 타이머 시작
>
> 3000 타이머 끝
>
> 1000 타이머 시작
>
> 1000 타이머 끝
>
> 7000 타이머 시작
>
> 7000 타이머 끝
>
> 5000 타이머 시작
>
> 5000 타이머 끝
>
> 모든 타이머 끝



```javascript
// forEach 메소드 안에 async function을 사용하여 여러 타이머 실행
async function runForEach() {
  const times = [3000, 1000, 7000, 5000];

  times.forEach(async (time) => {
    await timer(time);
  })

  console.log('모든 타이머 끝');
}
```

> 실행 결과 : 
>
> 3000 타이머 시작
>
> 1000 타이머 시작
>
> 7000 타이머 시작
>
> 5000 타이머 시작
>
> 모든 타이머 끝
>
> 1000 타이머 끝
>
> 3000 타이머 끝
>
> 5000 타이머 끝
>
> 7000 타이머 끝



### forEach

1. 다수의 비동기 작업이 한번에 실행된다.
2. 다수의 비동기 작업이 모두 끝나기를 기다리지 않는다.



### await Promis.all()

1. 다수의 비동기 작업이 한번에 실행된다.
2. 다수의 비동기 작업이 모두 끝나기를 기다린다.



### for await ... of

1. 다수의 비동기 작업이 한번에 실행되지 않는다.
2. 다수의 비동기 작업이 모두 끝나기를 기다린다.