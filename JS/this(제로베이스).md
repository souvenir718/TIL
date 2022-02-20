# This

<br>

## 암시적 this 바인딩

1. 전역 공간에서의 This
   - node : global
   - browser : window

2. 함수에서의 This는 전역공간을 가르킨다

3. 메서드에서의 This

   ```js
   const obj = {
       name: 'objName',
       method: function() {
           return this.name // objName
       }
   }
   
   const obj2 = {
       name: 'obj2Name',
       depth: {
           name: 'depthName',
           method: function() {
               return this.name // depthName
           }
       }
   }
   ```

   



## 명시적 바인딩

this를 고정시켜서 명시적으로 사용할 수 있다.

1. call
   - 첫번째 넣는 인자를 this 대상으로 명시적으로 변경
2. apply
   - 배열을 인자로 받을 수 있다.
3. bind



```js
const person = {
    name: '수빈',
    sayName: function() {
        return this.name
    }
};

const person2 = {
    name: '김수빈',
    sayName: function() {
        return this.name
    }
}

function sayFullName(firstName){
    return firstName + this.sayName();
    // return arguments[0] + this.sayName(); 
}

const result = sayFullName.call(person, '김'); // 김수빈
const result2 = sayFullName.call(person2, '김'); // 김김수빈

const result = sayFullName.apply(person, ['김', 'Kim']); // 김수빈 or Kim수빈

const sayFullNamePerson = sayFullName.bind(person);
console.log(sayFullNamePerson('김')); // 김수빈
```

