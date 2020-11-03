# Flex(Flexible Box)

- Flex는 요소의 크기가 불분명하거나 동적인 경우에도, 각 요소를 정렬할 수 있는 효율적인 방법을 제공한다.

### 1. Container

- `Container`는 `Items`를 감싸는 부모 요소, `Item`을 정렬하기 위해선 `Container`가 필요하다.

- 속성

  - `display` : Flex Container를 정의

    - `flex` : Block 특성의 Flex Container를 정의
    - `inline-flex` : Inline 특성의 Flex Container를 정의

    > `flex` 와 `inline-flex` 의 차이는 수직 or 수평으로 쌓이는 차이
    >
    > 쌓이는 것은 `Items` 가 아니라 `Container` 

    

  - `flex-flow` : `flex-direction` 와 `flex-wrap` 의 단축 속성

    - `flex-direction` : Flex Items의 주축(main-axis)을 설정

      - `row` : `Items`를 수평축(왼쪽에서 오른쪽)으로 표시, 기본값
      - `row-reverse` : `Items` 를 `row` 의 반대 축으로 표시
      - `column` , `column-reverse` 는 수직축

      ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-direction.jpg)

    - 주 축(main-axis)과 교차 축(cross-axis)

      > 값 `row`는 `Items` 를 수평축으로 표시하므로 이때는 주 축이 수평이며 교차 축은 수직이 된다. `column` 일 경우에는 반대
      >
      > 즉, 방향(수평, 수직)에 따라 주 축과 교차 축이 달라진다.

    

    - `flex-wrap` : Flex Items의 여러 줄 묶음(줄 바꿈) 설정

      - `nowrap` : 모든 `Items` 를 여러 줄로 묶지 않음(한 줄에 표시), 기본값
      - `wrap` : `Items` 를 여러 줄로 묶음
      - `wrap-reverse` : `Items` 를 `wrap` 의 역 방향으로 여러 줄로 묶음

      ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-wrap.jpg)

  

  - `justify-content` : 주 축(main-axis)의 **정렬 방법**을 설정

    - 시작점(`flex-start`)과 끝점(`flex-end`)

      > 주 축이나 교차 축의 시작하는 지점과 끝나는 지점을 지칭합니다.
      >
      > 방향에 따라 시작점과 끝점이 달라진다.

    - `center` : `Items` 를 가운데 정렬

    - `space-between` : 시작 `Item` 은 시작점에, 마지막 `Item` 은 끝점에 정렬, 나머지는 사이에 고르게 정렬

    - `space-around` : `Items` 를 균등한 여백을 포함하여 정렬

    ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-justify-content.jpg)

    

  - `align-content` : 교차 축(cross-axis)의 **정렬 방법**을 설정(2줄 이상)

    > **주의할 점** : `flex-wrap` 속성을 통해 `Items` 가 여러 줄이고 여백이 있을 경우만 사용할 수 있다.
    >
    > 한 줄일 경우 `align-items` 속성을 사용

    - `stretch` : `Container`의 교차 축을 채우기 위해 `Items` 를 늘림
    - `flex-start` , `flex-end` : `Items`를 시작점, 끝점으로 정렬
    - `center` : `Items` 를 가운데 정렬
    -  `space-between` : 시작 `Item` 은 시작점에, 마지막 `Item` 은 끝점에 정렬, 나머지는 사이에 고르게 정렬
    - `space-around` : `Items` 를 균등한 여백을 포함하여 정렬

    ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-align-content.jpg)

    

  - `align-items` : 교차 축(cross-axis)에서 `Items` 의 **정렬 방법**을 설정(**1줄**)

    - `stretch` : `Container`의 교차 축을 채우기 위해 `Items` 를 늘림
    - `flex-start` , `flex-end` : `Items`를 시작점, 끝점으로 정렬
    - `center` : `Items` 를 가운데 정렬
    - `baseline` : `Items` 를 문자 기준선에 정렬

    ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-align-items.jpg)

    

### 2. Items

- 속성

  - `order` : Flex Item의 **순서**를 설정

    - `Item` 에 숫자를 지정하고 숫자가 클수록 순서가 밀린다.(음수 허용)

  - `flex` : 아래 속성들의 단축 속성

    - `flex-grow` : Flex Item의 **증가 너비** 비율을 설정, 기본값(0)

    ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-grow.jpg)

    - `flex-shrink` : Flex Item의 **감소 너비** 비율을 설정, 기본값(1)
    - `flex-basis` : Flex Item의 (공간 배분 전) 기본 너비 설정, 기본값(auto)

  

  - `align-self` : 교차 축(cross-axis)에서 `Item`의 **정렬 방법**을 설정

    - `auto` : Container의 `align-items` 속성을 상속 받음, 기본값(auto)
    - `stretch` : Container의 교차 축을 채우기 위해 `Item`을 늘림
    - `flex-start` , `flex-end` : `Items`를 시작점, 끝점으로 정렬
    - `center` : `Items` 를 가운데 정렬
    - `baseline` : `Items` 를 문자 기준선에 정렬

    ![](https://heropy.blog/images/screenshot/css-flexible-box/flex-align-self.jpg)