# insertAdjacentHTML

DOM의 내용을 수정할 때 

```javascript
document.getElementById('test').innerHTML += 'test';
```

위와 같이 `innerHTML`을 사용하여 내용을 수정한다. 그러나 이 방식은 기존 하위 노드를 삭제하고 재구성하는 방법으로 실행시간이 많이 낭비된다. 

이를 개선하기 위한 메소드로 `insertAdjacentHTML`이 있다. 

**insertAdjacentHTML** 은 인접한 위치에 HTML를 삽입해주며 `DOM Element`에 대한 상대적인 위치를 지정하여 노드를 추가하는 방식으로 기존의 하위 노드는 건드리지 않아서 속도면에서 빠르다.

**insertAdjacentHTML** 은 `element.insertAdjacentHTML(position, text)`로 추가할 위치와 추가할 내용, 두가지의 변수가 필요하다. 

**position**으로는 `beforebegin`, `afterbegin`, `beforeend`, `afterend` 이렇게 4가지가 있으며 각각의 위치는 아래와 같다.

```html
<body>
    <!-- beforebegin -->
    <div id="test">
        <!-- afterbegin -->
        <!-- beforeend -->
    </div>
    <!-- afterend -->
</body>
```

