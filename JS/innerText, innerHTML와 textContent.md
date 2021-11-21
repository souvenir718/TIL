# innerText, innerHTML와 textContent



## innerText vs innerHTML

**innerText**, **innerHTML**는 html태그의 내부 문자를 가져올 때 사용한다.

두 속성의 간단한 차이점은 `내부 문자`를 가져올 때 html태그를 **문자**로 인식할지, **태그**로 인식할지의 차이다.



**innerText**는 가져온 텍스트에 포함된 태그도 **문자로** 인식하여 보여준다

**innerHTML**은 가져온 텍스트에 포함된 태그를 인식하여 **태그**를 적용시킨 후 보여준다.



## innerHTML

**innerHTML**은 element의 값을 `text/html` 으로 파싱한 결과다. 상대적으로 파싱 속도는 느리지만 큰 차이가 있는 것은 아니다. 하지만 보안에 취약하여 프로젝트가 보안점검을 하는 경우 거부될 가능성이 높다.

```html
<div id="test">
    테스트!
</div>
<script>
	document.querySelector('#test').innertHTML = '<h1>성공!</h1>'
</script>
```

위와 같이 적용했을 때, **innerHTML**은 `h1` 태그를 인식하여 화면 상에 `h1`태그가 적용된 성공! 이라는 문자를 보여준다.



## innerText

**innerText**는 element의 값을 `text/plain`으로 파싱한 결과다. **textContent**와 차이점으로는 `raw text`가 최종적으로 화면에 렌더링 된 모습을 가져온 결과다. 예를 들면, `display:none`이 되어 숨겨져 있는 값이나 줄바꿈 같은 의도된 스타일링을 처리하고 난 결과 값을 보여준다.

```html
<div id="test">
    테스트!
</div>
<script>
	document.querySelector('#test').innertText = '<h1>성공!</h1>'
</script>
```

위와 같이 적용했을 때, **innerText**는 **하나의 문자열**로 인식하여 화면 상에 `<h1>성공!<h1>`라고 전부 보여준다.





## textContent

 **textContent** 는 element의 내부 콘텐츠를 `text/plain`으로 파싱한 결과로, 해당 요소 내부의 원시 텍스트(raw text)이다. 

그래서 다른 프로퍼티들에 비해 파싱 속도가 빠르다.





### 비교

| 구분 | innerText        | innerHTML     | textContent |
| ---- | ---------------- | ------------- | ----------- |
| 값   | HTML parsed text | rendered text | raw text    |
| 성능 | 나쁨             | 보통          | 좋음        |
| 보안 | -                | -             | 취약        |

