# Babel

  `babel`은 ES6 / ES7 코드를 ECMAScript5로 transpiling 하기 위한 도구다. `babel`은 다양한 작은 모듈로 구성되어 있다. `babel`은 다양한 모듈을 담는 일종의 상자역할을 하며 코드를 컴파일 하기 위해 작은 모듈들을 사용합니다.(ex. presets)



## babel-cli

  `babel-cli` 는 command line을 통해 코드를 transpile할 수 있는 도구입니다.

> **Transpile vs Compile**
>
> - compile
>   - 한 언어로 작성된 소스 코드를 다른 언어로 변환하는 것을 의미한다
>   - java -> byte code 
>   - c -> asembly
> - Transpile
>   - 한 언어로 작성된 소스 코드를 비슷한 수준의 추상화를 가진 다른 언어로 변환하는 것을 말한다ㅏ.
>   - ES6 -> ES5
>   - c++ -> c



## babel-register

  `babel-register` 는 각각의 모듈을 결합할 떄 사용되는 Hook 모듈이다. `require` 메소드를 바인드하여 자바스크립트 코드를 transpile 시킨다. `babel-register` 모듈은 production을 위한 모듈은 아니다.



## Configuring Babel

  `.babelrc` 파일을 통해 `babel`에게 설정 정보를 전달해 줘야 한다.



### .babelrc

```json
{
    "presets":[],
    "plugins":[]
}
```



## babel-polyfill

`babel-polyfill`은 ES6 환경을 제공해준다. 

```javascript
// ES6
function allAdd() {
    return Array.from(arguments).map(a => a+2);
}
```

  위 코드는 `babel` 에 의해 다음과 같이 transpile 된다.

```javascript
// ES5
function allAdd() {
    return Array.from(arguments).map(function(a){
        return a+2;
    });
}
```

  `Array.from()` 은 ES6 syntax이므로 지원하지 않는 브라우저가 존재하기 떄문에 위 코드는 transpile 되었지만 모든 브라우저에서 작동하지 않는다. 이 문제를 해결하기 위해 `polyfill`을 사용해야 한다. `polyfill`이란 code 조각으로 런타임에 존재하지 않는 native API 복사본을 말한다.