# AbortController

Javascript를 통해 Web을 개발하면서 fetch와 같은 비동기 통신이 진행되는 동안에 페이지 이동 등과 같은 이벤트가 발생하게 되면 이전 비동기 통신을 취소하고 새로운 비동기 처리를 하는 기능을 구현해야하는 경우에 **AbortController**를 이용할 수 있다.



Fetch 객체는 Promise 객체를 리턴하는 비동기 함수다. 원래 Promise 객체는 자체 abort 기능이 없기에 AbortController를 통해서 비동기 동작 중단 기능을 구현할 수 있다. 비동기 동작 중단 기능을 통해 아래와 같은 효과를 가질 수 있다.

1. 필요하지 않은 API 호출을 취소하여 성능 개선에 도움
2. API 호출로 인해 발생하는 비용 절감에 도움



## 구성 및 동작 원리

**구성** : AbortController는 `signal`이라는 속성과 `abort`라는 메소드로 구성

**동작원리** : `abort` 메소드 호출시 `signal` 속성이 호출되고 `controller.signal.aborted` 속성이 **true**가 된다.

**예외처리** : `abort`가 발생하면 try, catch 문에서 `AbortError`로 **catch**한다.



## 사용방법



## 사용 방법

아래의 3단계를 통해 AbortController를 사용할 수 있다.

1. AbortController 선언

```js
let controller = new AbortController;
```

2. Fetch 함수에 signal 파라미터 할당

```js
fetch(url, { signal: controller.signal });
```

3. abort 함수 호출

```js
controller.abort()
```



### React에서의 예시(useEffect)

```jsx
import React, { useEffect, useState } from 'react'

const Component = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, { signal })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.error('AbortError!')
                } else {
                    // TODO: handle other errors
                }
            })

        return () => {
            controller.abort();
        }
    })
    return (
        <div>temp</div>
    )
}

export default Component
```



### Axios를 사용했을 경우

```jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Component = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        axios.get(url, { cancelToken: cancelToken.token })
            .then(res => setData(res.data))
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.error('AbortError!')
                } else {
                    // TODO: handle other errors
                }
            })

        return () => {
            cancelToken.cancel()
        }
    })
    return (
        <div>temp</div>
    )
}

export default Component
```

