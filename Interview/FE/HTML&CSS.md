# HTML & CSS



## Img 태그 내 alt

: alt는 이미지를 정상적으로 가져오지 못할 경우 해당 영역을 대체할 텍스트를 나타낸다.



## Box Model

: 모든 HTML 요소는 박스모양으로 구성되며 HTML 요소를 padding, border, margin, 내용으로 구분한다. 내용은 텍스트나 이미지가 들어가있는 박스의 실질적인 부분으로 색상, 너비, 높이 등을 지정할 수 있다. 패딩은 내용과 테두리 사이의 간격이다. 패딩은 눈에 보이지 않는다. 테두리(border)는 내용과 패딩 주변을 감싸는 테두리이다. 마진은 테두리와 이웃하는 요소 사이의 간격이고 마진은 눈에 보이지 않는다.



## Flex

 Flex는 컨텐츠를 감싸는 상위 부모요소인 Flex Container와 각 컨텐츠들인 자식요소 Flex Item으로 구성되어있다. Flexbox css 적용방법은 부모요소인 container에 display:flex를 선언하면 된다. Flex Container에는 전체적인 정렬과 관련된 속성인 display, flex-direction, align-items, flex-wrap 같은 속성을 정의하고, 자식요소인 flex item에는 flex-grow, flex-shrink 같은 크기나 순서 같은 속성을 정의한다.



## GPU 가속을 사용하는 CSS 속성

: transform은 하드웨어 가속을 사용한다.



## CSS-in-JS

: 스타일 정의를 css나 scss 파일이 아닌 javascript로 작성된 컴포넌트에 바로 삽입하는 스타일 기법이다. `styled-components`, `emotion` 등의 라이브러리가 있다.



### 기존 방식(css, scss)의 단점

1. 전역 관리
   - css 파일은 전역적으로 관리해야 한다. 다른 디렉토리에서 작업을 하더라고 해당 파일이 다른 디렉토리에 영향을 미칠 수 있다.
2. 유지 보수
   - 작업이 크고 고도화 될수록 유지 보수에 더 많은 시간과 비용을 발생시킨다.



### CSS-in-JS의 장점

- css의 컴포넌트화로 스타일시트의 파일을 유지보수할 필요가 없다. css레벨을 컴포넌트 레벨로 추상화한다. 
- javascript 환경을 최대한 활용할 수 있다
  - javascript와 css 사이의 상수와 함수를 쉽게 공유할 수 있다.
- 현재 사용중인 스타일만 DOM에 포함된다.
- 짧은 길이의 유니크한 클래스를 자동으로 생성하리 때문에 코드 경량화의 장점이 있다.



### CSS-in-JS의 단점

- 러닝커브가 커진다. javascript 내에서 css까지 다뤄야 한다.
- 별도의 라이브러리를 설치해야 하므로 번들 크기가 커진다.
- 익터랙션한 페이지일 경우 css파일로 관리하는 방법에 비해 성능이 느릴 수 있다.
