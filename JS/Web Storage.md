# Web Storage

: 브라우저에 key-value 형태로 데이터를 저장하는 방식



### Local Storage

- 시간 제한이 없으며, 브라우저가 꺼져도 없어지지 않는다.
- 관리자가 데이터를 명시적으로 삭제해야 삭제가 된다.
- 탭을 여러개 열어도 공유된다.



### Session Storage

- 브라우저가 열려있는 동안만 데이터가 유지되며, 브라우저 종료시 함께 없어진다.
- 새로고침을 해도 데이터는 유지된다.
- 탭마다 저장소가 분리되며 공유되지 않는다.



### Cookie와 Web Storage의 차이

1. 제한
   - cookie : 용량 제한, 시간 제한, 갯수 제한 존재
   - web storage : 용량 제한만 존재
2. 시간제한 설정
   - cookie : 제한 가능
   - web storage : 제한 불가능
3. 데이터형
   - cookie : 문자열만 가능
   - web storage : javascript 객체 저장 가능
4. 데이터 전송
   - cookie : 모든 쿠키를 전송해야하므 cookie를 가공함으로써 발생하는 side effect 존재
   - web storage : 개발자가 선택해서 전송하고 가공할 수 있음
5. 세션의 정의
   - cookie : 같은 브라우저면 다른 탭이나, 다른 창이어도 같은 세션이라고 정의
   - web storage : 같은 브라우저여도 다른 탭이면 다른 세션이라고 정의