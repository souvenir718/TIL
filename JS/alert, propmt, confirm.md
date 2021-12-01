# alert, prompt, confirm

브라우저 환경에서 사용되는 최소한의 사용자 인터페이스 기능



## alert(경고창)

`alert` 함수는 사용자가 `확인` 버튼을 누를 때까지 메시지를 보여주는 창이 계속 떠 있다. 

주로 사용자에게 중요한 내용이나 경고창을 띄워줄 때 사용하는 함수다.

```js
alert('Hello World');
```

> 메시지가 있는 작은 창은 `모달 창`이라고 부른다. `모달`이란 단어엔 페이지의 나머지 부분과 상호 작용이 불가능하다는 의미가 내포되어 있다. 따라서 사용자는 모달 창 바깥에 있는 버튼을 누르는 행위는 할 수 없다. `확인` 버튼을 누르지 않고는.



## prompt(입력창)

`prompt` 함수는 두개의 인수를 받는다. 

주로 사용자에게 입력값을 받을 수 있는 창을 띄워주는 함수다. 입력 받은 값은 String타입으로 리턴해주며, 없을 경우 Null을 리턴한다.

```js
result = prompt(title, [default]);
```

함수가 실행되면 텍스트 메시지와 입력 필드(`input filed`), 확인, 취소 버튼이 있는 모달창이 나타난다.

- title : 사용자에게 모달창에서 보여줄 문자열
- default : 입력 필드의 초기값

사용자는 **prompt** 대화상자의 입력 필드에 원하는 값일 입력하고 확인 버튼을 누르거나 취소 버튼, ESC를 눌러 대화상자를 빠져나올 수 있다. 

```js
let age = prompt('나이를 입력해주세요');
alert(`당신의 나이는 ${age}살 입니다.`)
```



## confirm(선택창)

사용자에게 `true/false`를 리턴받을 수 있는 함수다.

```js
result = confirm(question);
```

`confirm` 함수는 매개변수로 받은 `question`과 확인 및 취소 버튼이 있는 모달 창을 보여준다.

사용자가 확인 버튼을 누르면 `true` 그 외의 경우는 `false`를 반환한다.

```js
let isDelete = confirm('지우시겠습니까?');
```



## 제약사항

1. 모달창의 위치는 브라우저가 결정하며 대개 브라우저 중앙에 위치한다.
2. 모달창의 모양은 브라우저마다 다르다. 개발자는 창의 모양을 수정할 수 없다.
3. 모달창이 떠있는 동안은 스크립트의 실행이 일시 중지되며, 사용자가 창을 닫기 전까진 나머지 페이지와 상호작용이 불가능하다.



## 과제

사용자의 이름을 물어보고 입력받은 이름을 그대로 출력해주는 페이지를 만들어보자.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prompt Test</title>
  </head>
  <body>
    <p id="user-name"></p>
    <script>
      let userName = prompt("당신의 이름은 무엇입니까?");
      document.querySelector("#user-name").innerHTML = userName;
    </script>
  </body>
</html>
```

