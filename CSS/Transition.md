# Transition



## transition이란

지정할 속성에 변화나 움직임 등을 주고 싶을 경우, 일정 시간 간격(지연)을 두고 그 속성에 변화 혹은 움직임을 부드럽게 해주는 기능이다. 즉, 시각적인 변화를 Javascript 없이 구현이 가능하다.

주로 간단한 움직임이나 변환 기능의 애니메이션을 구현할 경우 사용한다. 마우스를 오버했을 때 배경색이 시간차를 두고 천천히 변하는 등에 사용한다.



## 사용 이유?

1. 자바스크립트가 필요하지 않다.(필요할 경우도 있다)
2. Javascript 지식이 없이도 어느 정도 레벨의 애니메이션 구현이 가능하다.
3. 손쉬운 애니메이션 구현



## 주로 사용하는 경우

UI 요소의 상태 변환, 한번의 움직임 또는 변화를 주고 싶을 때 사용한다.

그 외의 복잡하거나 고도의 움직임(바운드, 정지, 되돌아옴 등)에서는 Javascript를 사용한다.



## 사용 방법

**Transition**은 속성의 값을 바꿔줌으로 해서 효과를 나타내게 되는데, 그러기 위해서는 **효과를 적용시킬 대상**(속성, 변화 시작 값과 완료 값), **변화를 줄 시간**이 필요하다. **Transition**에는  아래 4가지 속성이 있다.



### 1. transition-property : 값

효과를 적용할 대상(값)을 지정해준다.

- none : 변화를 줄 대상이 없다.
- all : 변환할 모든 대상
- 속성(대상)명 : 변화를 줄 속성을 하나씩. 복수의 경우 `,`로 구분 후 지정



### 2. transition-duration : 값

변화를 일으키는 시간으로, `소요시간`을 설정해줘야 한다. `소요시간`은 초 혹은 밀리초 단위를 사용한다.

```css
transition-duration : 3s;
```



### 3. transition-timing-function : 값

변화하는 속도의 `패턴`을 지정할 수 있다

| 속성값                       | 설명                                                         | 동일한 cubic-bezier 값 | 동일한 steps 값 |
| ---------------------------- | ------------------------------------------------------------ | ---------------------- | --------------- |
| ease                         | 천천히 시작해서 도중에 빨라졌다가 느려지면서 끝난다.         | (0.25, 0.1, 0.25, 1)   |                 |
| ease-in                      | 천천히 시작해서, 점점 가속한다.                              | (0.42, 0, 1, 1)        |                 |
| ease-out                     | 빨리 시작해서 느려지면서 끝난다.                             | (0, 0, 0.58, 1)        |                 |
| ease-in-out                  | 천천히 시작하고, 천천히 가속해서, 느려지면서 끝난다.         | (0.42, 0, 0.58, 1)     |                 |
| linear                       | 일정한 속도로 변화한다.                                      | (0, 0, 1, 1)           |                 |
| steps(단계수, start\|end)    | 단계수로 균등한 간격을 분할해서 변화한다.<br />첫째 인수인 단계수는 1 이상의 정수.<br />두번째 인수는 `start` 혹은 `end`를 명시 |                        |                 |
| step-start                   |                                                              |                        | (1, start)      |
| step-end                     |                                                              |                        | (1, end)        |
| cubic-bezier(x1, y1, x2, y2) | 어떻게 변화할지 3차 베지어 곡선을 이용한다.<br />x축이 시간, y축을 진행 비율로해서 시작점과 끝나는 점을<br />지정해서 그 사이의 2개의 제어점 좌표를 설정해준다.<br />값은 0~1 사이의 실수다. 세밀하게 움직일 경우 사용한다. |                        |                 |

```css
transition-timing-function : cubic-bezier(0.25, 0.5, 0.25, 0.5);
```



### 4. transition-delay : 값

단위는 초 혹은 밀리초이고 어떤 트랜지션 변화를 준 뒤부터 실제로 그 변화가 일어날 시점까지 `값`만큼 걸린다.



### 4개의 속성 사용 예

```css
transitoin : background-color 2s ease-in-out 3s;`
```



### 샘플 코드

```css
div {
    width : 300px;
    height: 300px;
    background-color: black;
    transition-property: width, height, background-color;
    transition-duration: 3s;
    transition-timing-function: ease-in;
    transition-delay: 3s;
}
div:hover{
    width: 900px;
    height: 900px;
    background-color: white
}
```



