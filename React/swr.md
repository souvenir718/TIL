# [swr](https://swr.now.sh/)

**React Hooks for Remote Data Fetching**이라는 소개처럼 **swr**은 데이터를 가져오는 데(**get**) 특화되어 있는 라이브러리다.



## axios에 비해 좋은점!

### 포커싱하면 갱신

**axios**는 한번 `get`으로 호출을 하면 다시 호출하지 않는 이상 이전의 데이터를 유지하는 반면 **swr**은 한번만 호출해도 다른 곳으로 포커싱을 옮겼다가 다시 **포커싱**하면 새로운 데이터로 갱신된다.



### 주기적인 호출 가능

웹 소켓을 쓰지 않고 데이터를 주기적으로 동기화를 하려면 **axios**에선`setInterval`을 통해 주기적으로 api를 호출해야하지만 **swr**에서는 간단하게 해결할 수 있다.

**swr**은 포커싱할 때 데이터를 갱신해주기도 하지만 설정의 따라 원하는 순간에 revalidate할 수도 있고 일정 시간 간격으로 revalidate할 수도 있다.

```react
import useSWR from 'swr';

import fetch from '../libs/fetch';

export default function myApp() {
  const { data, revalidate } = useSWR('/api/v1/users', fetch, { 
    // 1초마다 갱신한다.
    refreshInterval: 1000
  });
  
  return ( ... )
}
```



### 캐시된 데이터 이용

데이터를 가져오는데 5초정도 걸리는 호출이 있다고 가정하면 **axios**는 페이지를 들어갈 때마다 5초동안 데이터를 가져올 것이다. 반면에 **swr**은 최초에 데이터를 수집한 후에는 캐시된 데이터를 이용해서 효율적인 동작을 만들어낸다. 물론 캐시 이후에는 자동적으로 revalidate하여 **데이터의 일관성**을 유지해준다.

그 외에도 pagination 후에도 이전 스크롤 위치는 자동으로 기억해주는 등의 기능도 제공한다.



[예제](https://github.com/vercel/swr/tree/master/examples)

