# Swal(Sweet Alert)



## 설치

### NPM / Yarn

```bash
npm install sweetalert --save
```



### CDN

```html
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
```



## Getting Started

### import

```react
import swal from 'sweetalert';
```



### 기본 alert 사용

```react
swal('Hello world!');
```

![image-20210724120040351](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724120040351.png)

```react
swal("Here's the title!", "...and here's the text!");
```

![image-20210724120134261](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724120134261.png)

```react
swal("Good job!", "You clicked the button!", "success");
```

- 세번째 인수로 경고 아이콘을 추가할 수 있다.
  - `warning`, `error`, `success`, `info`

![image-20210724120200638](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724120200638.png)

### 옵션 사용

- `button` 속성을 이용하여 버튼의 텍스트를 변경할 수 있다.

```react
swal({
    title: 'Good job!',
    text: 'You clicked the button!',
    icon: 'success',
    button: 'Aww yiss!'
})
// 아래와 같이 작성할 수 있다.
swal('Good job', 'You clicked the button!', 'success', {
    button: 'Aww yiss!'
})
```

![image-20210724120511935](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724120511935.png)

### Using Promise

```react
swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this imaginary file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
  } else {
    swal("Your imaginary file is safe!");
  }
});
```

![image-20210724120736438](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724120736438.png)



## Customizing

```react
swal("A wild Pikachu appeared! What do you want to do?", {
  buttons: {
    cancel: "Run away!",
    catch: {
      text: "Throw Pokéball!",
      value: "catch",
    },
    defeat: true,
  },
})
.then((value) => {
  switch (value) {
    case "defeat":
      swal("Pikachu fainted! You gained 500 XP!");
      break;
 
    case "catch":
      swal("Gotcha!", "Pikachu was caught!", "success");
      break;
 
    default:
      swal("Got away safely!");
  }
});
```

![image-20210724120858398](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724120858398.png)



## Using React

JSX구문과 함께 사용하기 위해서는 `sweetalert`와 `@sweetalert/with-react` 두가지 모두 필요하다.

```react
import React from 'react'
import swal from '@sweetalert/with-react'
 
swal(
  <div>
    <h1>Hello world!</h1>
    <p>
      This is now rendered with JSX!
    </p>
  </div>
)
```



### content → JSX 사용

```react
import React from 'react'
import swal from '@sweetalert/with-react'
 
const onPick = value => {
  swal("Thanks for your rating!", `You rated us ${value}/3`, "success")
}
 
const MoodButton = ({ rating, onClick }) => (
  <button 
    data-rating={rating}
    className="mood-btn" 
    onClick={() => onClick(rating)}
  />
)
 
swal({
  text: "How was your experience getting help with this issue?",
  buttons: {
    cancel: "Close",
  },
  content: (
    <div>
      <MoodButton 
        rating={1} 
        onClick={onPick}
      />
      <MoodButton 
        rating={2} 
        onClick={onPick}
      />
      <MoodButton 
        rating={3} 
        onClick={onPick}
      />
    </div>
  )
})
```

![image-20210724121333790](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210724121333790.png)



## 참고사이트

[sweetalert 공식문서](https://sweetalert.js.org/guides/#using-with-libraries)

