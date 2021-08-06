# Svelte



## 특징

### Write less code

**Svelte**를 사용하면 적은 양의 코드로 동일한 동작을 하는 애플리케이션을 만들 수 있다. 

같은 동작을 하는 코드를 Vue, React, Svelte로 비교해보자.

- Vue.js

```vue
<template>
  <div>
    <input type="number" v-model.number="a">
    <input type="number" v-model.number="b">

    <p>{{a}} + {{b}} = {{a + b}}</p>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        a: 1,
        b: 2
      };
    }
  };
</script>
```



- React

```react
import React, { useState } from 'react';

export default () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  function handleChangeA(event) {
    setA(+event.target.value);
  }

  function handleChangeB(event) {
    setB(+event.target.value);
  }

  return (
    <div>
      <input type="number" value={a} onChange={handleChangeA}/>
      <input type="number" value={b} onChange={handleChangeB}/>

      <p>{a} + {b} = {a + b}</p>
    </div>
  );
};
```



- Svelte

```html
<script>
  let a = 1;
  let b = 2;
</script>

<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

<p>{a} + {b} = {a + b}</p>
```

코드의 양이 줄어들면 다음과 같은 장점이 있다.

1. 번들 크기 감소
   - SPA는 첫 로딩시 사용되는 모든 리소스를 다운로드하고, 파싱하고 실행되기 때문에 첫 로딩에 많은 시간이 걸리는 단점이 있다.
   - 번들 크기가 줄어들면 그만큼 로딩 속도가 개선될 수 있다.
2. 유지 보수 비용 감소



### No Virtual DOM

1. 가상돔은 항상 빠르지 않다.
   - 가상돔의 변경점을 비교하여 변경된 내용을 실제돔에 적용하는데 이때 가상돔을 비교하는 오버헤드가 발생한다.
2. 런타임을 포함하지 않는다.
   - **Svelte**는 가상돔을 사용하지 않고 다른 수단을 사용하여 변경된 내용을 알아낸다.



### Truly reactice

**Svelte**는 가상돔을 사용하지 않는 대신 빌드 타임에 어느 부분이 변경될지 파악하는 방식을 사용한다. 어느 부분이 변경될지 파악하고 그 부분의 상태가 변경될 경우 반응형으로 화면을 갱신하는 진짜 반응형이다.

**Svelte**는 빌드 타임에 돔을 업데이트하는 효율적인 명령 코드로 변환하기 때문에 컴파일러라고 소개된다.

---

[참고사이트1](https://heropy.blog/2019/09/29/svelte/)

[참고사이트2](https://beomy.github.io/tech/svelte/introduction-svelte/)

