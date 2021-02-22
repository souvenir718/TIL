# Currying(커링)

> 함수형 프로그래밍 기법 중 **커링**과 **Partial application**



## Partial application

여러개의 인자를 받는 함수가 있을 때 **일부**의 인자를 고정한 함수를 만드는 기법

```javascript
var plus = function(a, b, c) {
    return a + b + c;
}
```

위와 같은 함수에서 **partial application**을 구현하기 위해 함수의 `prototype`에 특별한 메소드를 추가한다. 

```javascript
Function.prototype.partial = function() {
    var args = [].slice.apply(arguments);
    var self = this;
    return function() {
        return self.apply(null, args.concat([].slice.apply(arguments)));
    }
}
```

`args`는 `arguments`를 복사한다. 그리고 리턴하는 함수에 `args`는 클로저의 변수로 저장된다. 이제 새로운 함수에 인자가 들어오면 기존에 있던 `args`와 concat한다.

```javascript
var plusa = plus.partial(1);
plusa(2, 3); // 6 = 1 + 2 + 3
var plusb = plusa.partial(2);
plusb(4); // 7 = 1 + 2 + 4
var plusab = plus.partial(1, 3);
pluasab(5); // 9 = 1 + 3 + 5
```

위의 함수를 `bind`를 사용하면 `partial`메소드를 추가할 필요없이 아래와 같이 할 수 있다.

```javascript
var plusa = plus.bind(null, 1);
plusa(2, 3); // 6
var plusb = plusa.bind(null, 2);
plusb(4); // 7
var plusab = plus.bind(null, 1, 3);
plusab(5); // 9
```



## Currying

`currying`도 `partial application`처럼 인자를 미리 고정할 수 있지만 **하나씩**만 고정하는 것이 특징이다. 그리고 모든 인자를 받을 때까지 계속 함수를 생성한다. 

```javascript
function multiplyThree(x){
    return function(y) {
        return function(z) {
            return  x * y * z;
        }
    }
}
multiplyTree(4)(8)(2); // 64
```

위의 함수는 간단한 커링으로 인자를 하나씩 3번 받아야 호출된다.



```javascript
Function.prototype.curry = function(one) {
    var origFunc = this;
    var target = origFunc.length;
    var args = [];
    function next(nextOne) {
        args = args.concat(nextOne);
        if(args.length === target) {
            return origFunc.apply(null, args);
        } else {
            return function(nextOne) { return next(nextOne)};
        }
    }
    return next(one);
}
```

위의 코드를 이용해서 multiplyFour 함수에 커링을 적용해보자.

```javascript
function multiplyFour(w, x, y, z) {
    return w * x * y * z;
}
multiplyFour.curry(2)(3)(4)(5);
```



## 차이점

**partial application**은 기존 함수의 매개변수들 중 일부를 미리 넣어둔 새로운 함수를 만든 것으로 만들어진 `partial application`은 다음 번 호출 시에는 결과를 반환해야 한다.

**currying**은 기존 함수의 매개변수를 하나씩 받는 방법으로 매개변수를 모두 받을 때까지 새로운 함수를 반환한다.



참조 : [제로초](https://www.zerocho.com/category/JavaScript/post/579236d08241b6f43951af18)