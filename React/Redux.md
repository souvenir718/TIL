# Redux

- store, dispatch, action, reducer
- `store`의 데이터를 변경하기 위해 `action` 을 `dispatch` 해야 하는데, 그것을 받아 처리하는 함수를 `reducer` 라고 합니다.
- `action` 은 데이터의 변화를 알려주는 객체이며, `reducer` 는 그 객체로 애플리케이션의 `state` 를 어떻게 바꿀지 정의한다.



### redux-thunk

- 비동기 처리 작업을 도와주는 미들웨어

![간단예제](https://woowabros.github.io/img/2018-05-19/redux-thunk.png)

> `redux-thunk` 는 `dispatch` 된 `action` 이 함수라면 `dispatch` 와 `getState` 를 함께 전달한다.
>
> 이로써 전달된 함수 내부에서는 여러가지 일을 할 수 있다. 
>
> 네트워크 작업 등을 통해 여러번 `dispatch` 가 수행될 수 있다.



- 미들웨어
  - `action` 과 `reducer` 의 중간에 존재
  - `reducer` 가 `dispatch` 된 `action` 을 처리하기 전에 작업을 수행하기 위한 중간자 역할