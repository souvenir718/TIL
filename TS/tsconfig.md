# tsconfig.json

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "target": "es5",
        "baseUrl": ".",
        "outDir": "dist",
        "paths": {"*": ["node_modules/*"]},
        "esModuleInterop": true,
        "sourceMap": true,
        "downlevelIteration": true,
        "noImplicitAny": false,
        
    },
    "include": ["src/**/*"]
}
```



## module

타입스크립트 소스코드가 컴파일되어 만들어진 ES5코드는 웹 브라우저와 nodejs 양쪽에서 모두 동작해야 한다. 

웹 브라우저와 nodejs의 동작하는 방식이 달라서 대상 플랫폼에 따라 `module`부분에 명시해줘야한다.

- 웹 브라우저 : **amd**
- nodejs : **commonjs**



## moduleResolution

`module` 키 값이 `commonjs`이면 항상 `node`로 설정하고 `module` 키 값이 `amd`이면 `classic`으로 설정한다.



## target

트랜스파일할 대상의 자바스크립트 버전을 설정한다. 대부분 `es5`이며 최신 버전을 사용한다면 `es6`로 설정한다.



## baseUrl과 outDir

트랜스파일된 ES5 자바스크립트 파일을 저장하는 디렉토리를 설정한다. tsc는 **tsconfig.json**이 있는 디렉토리에서 실행되므로 `baseUrl` 값은 보통 `"."` 으로 설정하고 `outDir`은 `baseUrl` 설정값을 기준으로 하위 디렉토리의 이름이다. 빌드된 결과가 앞서 설정한 `dist` 디렉토리에 만들어진다.



## paths

소스파일의 import 문에서 from 부분을 해석할 때 찾아야 하는 디렉토리를 설정한다. 



## esModuleInterop

오픈소스 라이브러리 중 웹 브라우저에서 동작한다는 가정으로 만들어진 것은 `commonJS` 방식으로 동작하는 타입스크립트에 혼란을 줄 수 있으므로 이 라이브러리들을 사용하기 위해서는 `true` 값으로 설정해야 한다.



## sourceMap

키 값이 `true`이면 트랜스파일 디렉토리에는 `.js`파일 이외에도 `.js.map` 파일이 만들어진다. 소스맵 파일은 js코드가 ts코드의 어디에 해당하는지 알려준다. 주로, 디버깅할 때 사용된다.



## downlevelIteration

생성기라는 타입스크립트 구문을 동작하려면 키 값을 반드시 `true`로 설정해야 한다.



## noImplicitAny

타입을 지정하지 않더라고 문제로 인식하지 않게끔 `false`로 지정한다. 타입을 지정하지 않았을 때는 암시적으로 `any` 타입으로 설정한 것으로 간주한다.



---

참고서적 : Do it! 타입스크립트 프로그래밍

