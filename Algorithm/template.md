# [백준/Node.js] Node.js 입력받기

## readline 모듈 사용

### 한 줄 입력

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  console.log(line);

  rl.close();
}).on("close", function () {
  process.exit();
});
```

### 여러 줄 입력

```javascript
// 입출력에 사용할 rl을 받아오는 함수
const getRl = () => {
  const readline = require("readline");
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};
const rl = getRl();

// 주어진 입력들을 이용해서 정답을 반환하는 함수
const printAnswer = (inputs) => {};

// 입력 받아와서 알고리즘 동작하는 함수
const inputs = [];
const start = (rl) => {
  rl.on("line", (line) => {
    inputs.push(line);
    if (inputs.length === parseInt(inputs[0]) + 1) rl.close();
  }).on("close", () => {
    printAnswer(inputs);
    process.exit();
  });
};

// 프로그램 동작
start(rl);
```

## fs 모듈 사용

### 한 줄 입력

```javascript
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split(" ");

let num = Number(input);

for (let i = 1; i <= num; i++) {
  console.log(i);
}
```

### 여러 줄 입력

```javascript
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let count = input[0];
let numbers = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] !== "") {
    numbers.push(input[i].split(" "));
  }
}

for (let i = 0; i < numbers.length; i++) {
  let num1 = Number(numbers[i][0]);
  let num2 = Number(numbers[i][1]);

  console.log(num1 + num2);
}
```

[출처](http://velog.io/@exploit017/%EB%B0%B1%EC%A4%80Node.js-Node.js-%EC%9E%85%EB%A0%A5-%EB%B0%9B%EA%B8%B0)
