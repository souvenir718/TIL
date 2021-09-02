# New Skill

## Nullish Coalescing Operator(leftExpr ?? rightExpr)

왼쪽 코드(expression)가 `null`이거나 `undefined`일 경우에 오른쪽 코드가 실행된다.

> value가 아닌 expression으로 함수도 이용 가능

```js
// Bad Code
function printMessage(text){
    let message = text;
    if(text == null || text == undefined){
        message = 'Nothing to display';
    }
    console.log(message);
}

// Good Code
function printMessage(text){
    const message = text ?? 'Nothing to display';
    console.log(message);
}
printMessage('Hello'); // Hello
printMessage(undefined); // Nothing to display
printMessage(null); // Nothing to display

// 
const result = getInitialState() ?? fetchFromServer();
console.log(result);

function getInitialState(){
    return null;
}
function fetchFromServer(){
    return 'Hello'
}
```



위의 `Good Code` 대신 `default parameter`를 사용하면 아래와 같이 `null`일때 그대로 출력한다.

`default parameter`는 파라미터가 없거나, `undefined`일 때만 적용된다.

```js
function printMessage(text = 'Nothing to display'){
    console.log(text);
}
printMessage('Hello'); // Hello
printMessage(undefined); // Nothing to display
printMessage(null); // null
```



### ※ Logical OR operator ||

왼쪽 코드가 `falsy`일 때 오른쪽 코드가 실행된다.

> `falsy` : 거짓인 경우
>
> - undefined
> - null
> - false
> - 0, -0
> - NaN
> - "", '', `` (비어있는 문자열 모두 해당)

```js
function printMessage(text){
    const message = text || 'Nothing to display';
    console.log(message);
}
printMessage('Hello'); // Hello
printMessage(undefined); // Nothing to display
printMessage(null); // Nothing to display
printMessage(0); // Nothing to display
printMessage(''); // Nothing to display
```



## Object Destructuring

```js
const person = {
    name: 'Subin',
    age: 20,
    phone: '010XXXXXXXX'
}

// Bad Code
function displayPerson(person){
    displayAvatar(person.name);
    displayName(person.name);
    displayProfile(person.name, person.age);
}

// Good Code
function displayPerson(person){
	const {name, age} = person;
    displayAvatar(name);
    displayName(name);
    displayProfile(name, age);
}
```



## Spread Syntax 

### Object

```js
const item = { type:'A', size:'M' };
const detail = { price: 20, made: 'Korea', gender: 'M' };

// Bad Code
item['price'] = detail.price;

// Bad Code2
const newObject = new Object();
newObject['type'] = item.type;
etc...

// Bad Code3
const newObject2 = {
    type: item.type,
    size: item.size,
    etc...
}

// Good Code
const goodObj = Object.assign(item, detail);

// Better Code 👍
const betterObj = {...item, ...detail};
```



### Array

```js
let fruits = ['apple', 'banana', 'orage'];

// fruits.push('grape')
fruits = [...fruits, 'grape'];

// fruits.unshift('grape')
fruits = ['grape', ...fruits];

let fruits2 = ['melon', 'peach'];
let combined = fruits.concat(fruits2); // 배열 두개를 합칠 때
combined = [...fruits, ...fruits2]
```



## Optional Chaining

```js
const bob = {
    name: 'bob',
    age: 20
}
const anna = {
    name: 'anna',
    age: 20,
    job: {
        title: 'FE Developer'
    }
}

// Bad Code
function displayJobTitle(person){
    if(person.job && person.job.title){
        console.log(person.job.title);
    }
}

// Good Code
function displayJobTitle(perosn){
    if(person.job?.title){
       console.log(person.job.title);
    }
}
// Good Code2
function displayJobTitle(perosn){
  	const title = person.job?.title ?? 'No Job Yet';
    console.log(title);
}
```



## Promise → async/await

```js
// Bad Code
function displayUser() {
    fetchUser()
    .then((user)=>{
        fetchProfile(user)
        .then((profile)=>{
            updateUI(user, profile)
        })
    })
}

// Good Code
function displayUser() {
    const user = await fetchUser();
    const profile = await fetchProfile(user);
    updateUI(user, profile);
}
```



## 십진수 지수

0이 많은 숫자를 적을때 사용

```js
for(let i=0; i<10000; i++){}
//
for(let i=0; i<1e4; i++){}

1e0 = 1;
1e1 = 10;
1e2 = 100;
1e3 = 1000
```



## 필수 파라미터

자바스크립트는 기본적으로 함수의 파라미터를 받지 않았을 경우, `undefined`로 지정한다. 

```js
function test(x) {
    if(x === undefined) throw new Error('No Parameter')
    return x;
}
// 아래와 같이 변경
mandatory = () => {
    throw new Error('Missing parameter!');
}
const test = (x = mandatory()) => {
    return x;
}

```





---

[참고1 - 드림코딩](https://www.youtube.com/watch?v=BUAhpB3FmS4)

[참고2](https://chanspark.github.io/2017/11/28/ES6-%EA%BF%80%ED%8C%81.html)