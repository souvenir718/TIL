# Font

<br/>

## link 태그 사용

HTML의 link 태그를 사용하는 방법으로, 자신이 사용할 폰트의 URL을 복사한 후 HTML의 `<head>` 태그 사이에 아래와 같이 넣어주면 된다.

```html
<head>
    <link href="주소" rel="stylesheet">
</head>
```

그 후에 css 파일 내에서 아래와 같이 적용해주면 사용할 수 있다.

```css
div {
    font-family: "폰트 이름"
}
```

> url이 아닌 로컬 파일의 경우 `주소` 부분 대신 파일 경로를 작성하면 된다.



## import 방법

```css
@import url('주소');
```

위와 같이 작성한 후에 마찬가지로 css 파일내에서 `font-family`를 사용하여 적용할 수 있다. 로컬 역시 마찬가지로 파일 경로를 작성하면 된다.



## 웹 폰트(Web Font)의 사용

- `@font-face` 지시어는 웹 브라우저에서 폰트 이름과 다운받을 위치를 알려준다.

```css
@font-face {
    font-family : fontName; // 폰트명으로 지정될 이름을 설정한다.
    src: 'source'; // 원격 폰트 파일의 위치를 나타내는 URL 값, 폰트가 설치된 경로
    font-weight: 700;
}
```



### 예제

```css


@font-face{ font-family:'NanumGothic'; src:url('fonts/NanumGothic.eot'); src:url('fonts/NanumGothic.eot?#iefix') format(‘embedded-opentype’), url('fonts/NanumGothic.woff') format(‘woff’), url('fonts/NanumGothic.ttf') format('truetype'), url('fonts/NanumGothic.svg') format('svg'); }

출처: https://webclub.tistory.com/261 [Web Club]@font-face{\
    font-family:ng;
    src:url(NanumGothic.eot);
    src:local(※), url(NanumGothic.woff) format(‘woff’)
}
body{
    font-family:'나눔고딕', 'NanumGothic', ng
}

@font-face{
    font-family:'NanumGothic';
    src:url('fonts/NanumGothic.eot');
    src:url('fonts/NanumGothic.eot?#iefix') format(‘embedded-opentype’),
        url('fonts/NanumGothic.woff') format(‘woff’),
        url('fonts/NanumGothic.ttf') format('truetype'),
        url('fonts/NanumGothic.svg') format('svg');
}

출처: https://webclub.tistory.com/261 [Web Club]
```

> local(*)값은 외부 자원을 참조하기 이전에 시스템에 설치된 글꼴을 우선 참조할 수 있도록 만들어준다.
