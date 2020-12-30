# Closure

**함수와 그 함수가 선언될 당시의 lexical environment**

: 실행 컨텍스트 A와 함수 B가 콤비가 되어 **무언가**를 한다

- B의 outerEnvironmentReference는 A의 environmentRecord를 참조
- **컨텍스트 A**에서 선언한 **변수**를 **내부함수 B**에서 접근할 경우에만 발생하는 특수한 현상



### 예제 1.

```javascript
var outer = function () {
    var a = 1;
    var inner = function () {
        console.log(++a);
    };
    inner();
}
outer();
```

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20201230204834389.png) 



### 예제 2.

```javascript
var outer = function() {
    var a = 1;
    var inner = function() {
        return ++a;
    }
    return inner;
}
var outer2 = outer(); // outer2에는 inner함수
console.log(outer2()); // 출력 : 2
console.log(outer2()); // 출력 : 3
```

![](C:\Users\김수빈\AppData\Roaming\Typora\typora-user-images\image-20201230205457866.png) 

> a가 사라지지 않는다.



### 클로저의 핵심

: **컨텍스트 A**에서 선언한 **변수 a**를 **참조**하는 **내부함수 B**를 A의 **외부로 전달**할 경우 A가 종료된 이후에도 **a가 사라지지 않는 현상**

- 클로저에 의해서 지역변수가 함수 종료 후에도 사라지지 않게 할 수 있다.
- **함수 종료 후에도 사라지지 않는 지역변수를 만들 수 있다**.**(장점)**



```javascript
function a() {
    var localA = 1;
    var localB = 2;
    var localC = 3;
    
    return {
        get a() { return localA; }
        set a(v) { localA = v; }
    	get b() { return localB + localC; }
    	set b(v) { throw Error('read only'); }
    }
}

var obj = a();
```

> 지역변수에 직접적인 접근은 안되지만 값을 변경하거나 받아올 수 있다.
>
> 지역변수를 보호하면서 사용이 가능하다. 



---

출처 : [JS - Flow](https://www.inflearn.com/course/%ED%95%B5%EC%8B%AC%EA%B0%9C%EB%85%90-javascript-flow/dashboard)