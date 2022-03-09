# async와 await

### async & await 맛보기

```javascript
/*
	var user = {
		id : 1,
		name : 'Josh'
	} // 사용자 객체
*/
// 
function logName() {
    var user = fetchUser('domain.com/users/1');
    if(user.id === 1) {
        console.log(user.name);
    }
}
```

> `logName()` 메서드는 사용자 객체를 반환해서 사용자의 `name` 을 찍는 코드다.
>
> `fetchUser()` 메서드를 호출하면 사용자 객체를 반환한다.
>
> 여기서 `fetchUser()` 메서드가 서버에서 사용자 정보를 가져오는 HTTP 코드라고 가정하자.
>
> 위의 코드에 `async` 와 `await` 를 추가해주면

```javascript
async function logName() {
    var user = await fetchUser('domain.com/users/1');
    if(user.id === 1) {
        console.log(user.name);
    }
}
```

> 비동기 처리 코드는 콜백함수를 사용해야 코드의 실행 순서를 보장 받을 수 있다.
>
> 콜백함수를 사용하지 않으려면 위와 같이 `async` 와 `await` 를 붙이면 된다.
>
> 콜백 함수를 사용하면 아래 코드와 같다.

```javascript
function logName() {
  var user = fetchUser('domain.com/users/1', function(user) {
    if (user.id === 1) {
      console.log(user.name);
    }
  });
}
```



### async & await 기본 문법

```javascript
async function 함수명() {
    await 비동기 처리 메서드 명();
}
```

1. 함수의 앞에 `async` 라는 예약어를 붙인다.
   - 반환 값은 Promise.resolve로 래핑되어 반환된다.
   - 에러가 발생하면, Promise.reject로 래핑되어 반환된다.

2. 함수 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await` 를 붙인다.
   - **주의** : 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await` 가 의도한 대로 동작한다.
   - `await` 의 대상이 되는 비동기 처리 코드는 axios 등 프로미스를 반환하는 API 호출 함수입니다.
   - `await` : 프로미스가 이행될 때까지 기다린다.
   - `async` 메서드 안에서만 동작하며 일반 메서드에서는 사용할 수 없다.



### 개념 예제

```js
async function foo() {
    return 1;
}
// 위의 코드와 아래코드는 같다.
function foo(){
    return Promise.resolve(1);
}

//

async funtion foo(){
    await 1;
}
// 위의 코드와 아래코드는 같다.
function foo(){
    return Promise.resolve(1).then(() => undefined);
}
```



### 간단 예제

```javascript
function fetchItems() {
    return new Promise(function(resolve, reject) {
        var items = [1, 2, 3];
        resolve(items)
    });
}

async function logItems() {
    var resultItems = await fetchItems();
    console.log(resultItems); // [1, 2, 3]
}
```

> `fetchItems()` 메서드는 프로미스 객체를 반환하는 함수입니다.
>
> - **프로미스**는 "비동기 처리를 위한 객체"
>
> `fetchItems()` 메서드를 실행하면 프로미스가 Resolved(이행) 상태가 되며 `items`를 리턴한다.

> `logItems()` 메서드는 `fetchItems()` 함수의 리턴 값인 `items` 배열을 `resultItems` 변수에 저장하고 콜솔에 출력한다.

> `await`를 사용하지 않았다면 데이터를 받아온 시점에서 콜백함수를 통해서 콘솔에 출력해주거나 `.then()` 을 사용해야 한다.



### async & await 실용 예제

```javascript
// 사용자 정보가 담긴 프로미스 객체를 반환하는 메서드
function fetchUser() {
  var url = 'https://jsonplaceholder.typicode.com/users/1'
  return fetch(url).then(function(response) {
    return response.json();
  });
}

// 할 일 정보가 담긴 프로미스 객체를 반환하는 메서드
function fetchTodo() {
  var url = 'https://jsonplaceholder.typicode.com/todos/1';
  return fetch(url).then(function(response) {
    return response.json();
  });
}
```

> 위의 코드를 이용하여 제목을 출력하는 예제
>
> 1. `fetchUser()` 를 이용하여 사용자 정보 호출
> 2. 받아온 사용자 아이디가 `1`이면 할 일 정보 호출 - `fetchTodo()`
> 3. 받아온 할 일 정보의 제목을 출력

```javascript
async function logTodoTitle() {
    // 사용자 정보 호출
  var user = await fetchUser();
    // 사용자 아이디 확인
  if (user.id === 1) {
      // 아이디 확인 후 할 일 정보 호출
    var todo = await fetchTodo();
    console.log(todo.title); // 할 일 정보의 제목 출력
  }
}
```



### 예제코드(Promise)

```js
const starbucks = function(coffeeName) {
    return new Promise((resolve, reject) => {
        if(coffeeName === '아메리카노'){
            resolve('아메리카노 한잔입니다.');
        }else {
            reject('아메리카노는 없습니다.')
        }
    })
}

starbucks('아메리카노')
    .then(res => console.log(res))
    .catch(rej => console.log(rej))
    .finally(() => console.log('감사합니다.'));
/*
	아메리카노 한잔입니다.
	감사합니다.
*/

async function americano(someDrink){
    try{
      const result = await starbucks(someDrink);
        
      return result;
    } catch(err) {
        console.log(err);
    } finally {
        console.log('감사합니다.')
    }
}
americano('아메리카노');
/*
	아메리카노 한잔입니다.
	감사합니다.
*/
```





### 예외 처리

- 예외 처리 방법은 `try`, `catch` 를 사용한다.

```javascript
async function logTodoTitle() {
  try {
    var user = await fetchUser();
    if (user.id === 1) {
      var todo = await fetchTodo();
      console.log(todo.title); 
    }
  } catch (error) {
    console.log(error);
  }
}
```

> 네트워크 통신 오류뿐만 아니라 간단한 타입 오류도 잡아낼 수 있다.
>
> 발견된 에러는 `error` 객체에 담긴다.