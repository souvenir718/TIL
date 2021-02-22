# this ( JS - Flow )



**this 바인딩은 실행컨텍스트가 활성화될때 한다!**

  => 실행컨텍스트는 이 컨텍스트를 지닌 함수가 호출될때 활성화된다.

  => 호출하는 방식에 따라 바인딩된다.



1. 전역공간에서 `this`는 `window` (브라우저 콘솔)/ `global`(nodejs)을 가르킨다.

2.  함수 호출시 `this`는 `window` (브라우저 콘솔)/ `global`(nodejs)을 가르킨다.

   ```javascript
   function a() {
       console.log(this); // window
   }
   a();
   
   function b() {
       function c() {
           console.log(this); // window - ES6에서 화살표 함수로 해결
       }
       c();
   }
   b();
   
   var d = {
       e : function() {
           function f() {
               console.log(this); // window
           }
           f(); // 함수를 호출
       }
   }
   d.e();
   ```

   > 호출한 형태만 확인하면 `this`를 알 수 있다.

   

3. 메소드 호출시 `this`는 메소드 호출 주체( 메소드 명 앞에 있는 것(.앞에))

   ```javascript
   var a = {
       b : function() {
           console.log(this); // a
       }
   }
   a.b();
   
   var a = {
       b : {
           c : function() {
               console.log(this); // a.b
           }
       }
   }
   a.b.c();
   ```

   >  함수는 **전역객체의** 메소드다.(라고 생각하자!)

   - 내부함수에서의 우회법

     ```javascript
     var a = 10;
     var obj = {
         a : 20,
         b : function() {
             console.log(this.a); // obj에 접근하여 20 출력
             
             function c() {
                 console.log(this.a); // 함수로서 호출, 10 출력
             }
             c();
         }
     }
     obj.b();
     
     // 우회법 : this를 다른 변수에 저장
     var a = 10;
     var obj = {
         a : 20,
         b : function() {
             var self = this;
             console.log(this.a); // 20
             
             function c() {
                 console.log(self.a); // 20
             }
             c();
         }
     }
     obj.b();
     ```

     

4.  callback 호출시 `this`는 기본적으로는 함수 내부에서와 동일하다.

   - call, apply, bind 메소드에 대하여

     ```javascript
     function a(x, y, z) {
         console.log(this, x, y, z);
     }
     
     var b = {
         c : 'eee'
     };
     
     a.call(b, 1, 2, 3); // Object { c : "eee" } 1 2 3
     // b가 this로
     a.apply(b, [1, 2, 3]); // Object { c : "eee" } 1 2 3
     // b가 this로, 배열이 x, y, z에 하나하나 
     
     var c = a.bind(b); // b가 this로
     c(1, 2, 3); // Object { c : "eee" } 1 2 3
     
     var d = a.bind(b, 1, 2); // b는 this로, 1, 2는 x, y로
     d(3); // Object { c : "eee" } 1 2 3
     ```

     > `call` , `apply` 는 즉시호출
     >
     > `bind`는 새로운 함수 생성

   - callback 함수에서 호출 시

   ```javascript
   var callback = function() {
       console.dir(this); 
   };
   
   var obj = {
       a : 1,
       b : function(cb) {
           cb(); // 함수 호출! => window (전역객체) 출력
           cb.call(this); // obj 출력!
       }
   };
   obj.b(callback);
   
   var obj2 = {
       a : 1
   };
   // 100ms 뒤에 callback 실행
   setTimeout(callback, 100);  // window 출력
   
   setTimeout(callback.bind(obj), 100); // obj 출력!
   
   // event handling
   document.body.innerHTML += '<div id = "a">클릭하세요</div>';
   
   document.getElementById('a')
   	.addEventListener('click', function() {
       console.dir(this); // div#a
   });
   
   var obj = { a : 1};
   document.getElementById('a')
   	.addEventListener('click', function() {
       console.dir(this); // obj 출력
   }.bind(obj));
   ```

   > **정리**
   >
   > - 기본적으로는 함수의 `this`와 같다.
   > - **제어권을 가진 함수가** callback의 `this`를 명시한 경우 그에 따른다.
   > - **개발자가** this를 바인딩한채로 넘기면 그에 따른다.
   >   - 바인드의 우선순위가 가장 높다.! 

   

5. 생성자함수 호출시 `this`는 인스턴스 자체!

   ```javascript
   function Person(n, a) {
       this.name = n;
       this.age = a;
   }
   
   var gomugom = new Person('고무곰', 30); //gomugom이 this로
   console.log(gomugom);
   ```

   

---

출처 : [JS - Flow](https://www.inflearn.com/course/%ED%95%B5%EC%8B%AC%EA%B0%9C%EB%85%90-javascript-flow/dashboard)