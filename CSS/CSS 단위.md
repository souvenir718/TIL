# CSS 단위

### em : 현재의 font-size

- body 태그에 em 값을 이용해 지정해두면 모든 자식 요소들이 사이즈에 영향을 받는다.

```css
body {
    font-size : 14px;
}
div {
    font-size : 1.2em; // 1.2em = 14px * 1.2 = 16.8px
}
```



### rem : r은 root(최상위)를 뜻한다.

- 최상위 태그에 지정한 것을 기준으로 삼으며, 최상위 태그는 html 태그다.

```css
html {
    font-size : 14px;
}
div {
 	font-size : 1.2rem;   
}
```



### vh(vertical height) & vw(vertical width)

- 뷰포트의 너비값과 높이값의 맞게 사용할 수 있는 단위
- vh 요소는 높이값의 100분의 1단위
  - 브라우저 높이가 900px이면 1vh는 9px

```css
.slide {
    height : 100vh;
} // 최대 높이값이나 그의 유사한 높이값의 슬라이드 제작시
```



### vmin & vmax

- vmin과 vmax는 너비값과 높이값에 따라 최대, 최소값을 지정할 수 있다.
- 브라우저 크기가 1100px 너비, 700px 높이일 때 1vmin은 7px, 1vmax는 11px

[유용한출처](http://taimouse.tistory.com/8)