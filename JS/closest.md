# Element.closest()

기준 `Element`에서부터 `closest()` 메소드를 통해 자신부터 부모요소 단위로 출발하여 각 요소가 지정한 선택자에 만족할 때까지 탐색하여 가장 가깝게 조건에 만족한 부모 요소가 반환된다.

```javascript
const closestElement = targetElement.closest(selectors);
```



## 예시

### HTML

```html
<article>
  <div id="div-01">Here is div-01
    <div id="div-02">Here is div-02
      <div id="div-03">Here is div-03</div>
    </div>
  </div>
</article>
```

### Javascript

```javascript
const el = document.getElementById('div-03');

const r1 = el.closest("#div-02");
// id=div-02 조건이 만족하므로 속성을 가진 부모 요소가 반환된다.

const r2 = el.closest("div div");
// div 요소에 만족한 요소 중 div 자식을 가리키므로, id=div-03 자신이 만족된다.

const r3 = el.closest("article > div");
// 가장 가까운 article 요소 바로 하위의 div 요소 id=div-01 속성을 가진 요소가 반환된다.

const r4 = el.closest(":not(div)");
// div 요소가 아닌 가장 가까운 부모 article 요소가 반환된다.
```



---

### 참고

[MDN](https://developer.mozilla.org/ko/docs/Web/API/Element/closest)