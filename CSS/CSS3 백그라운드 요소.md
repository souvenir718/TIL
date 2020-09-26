# CSS3 백그라운드 요소

### backgrouond-size 에서 contain, cover

- contain : 원본 비율 설정
  - 이미지 전체가 보여지도록 설정
- cover : 중앙 비율 설정
  - div 영역 안에 백그라운드 이미지가 빈틈없이 매워지게 하는 효과적인 방법
  - 이미지의 일부가 잘리는 단점
  - 이미지의 가장 짧은 선분을 기준으로 꽉 찬다.

```CSS
background-size : cover;
background-size : contain;

background : url(...) no-repeat center center/cover
background : url(...) no-repeat center center/contain
```

