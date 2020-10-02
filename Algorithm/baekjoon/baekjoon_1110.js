const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let correct = "";
  if (String(line).length < 2) {
    correct = "0" + String(line);
  } else {
    correct = String(line);
  }

  let firstNum = Number(correct[0]);
  let secondNum = Number(correct[1]);
  let tempNum = "";
  let result = "";
  let time = 0;

  do {
    tempNum = String((firstNum + secondNum) % 10);
    result = String(secondNum) + tempNum;
    time++;
    firstNum = Number(result[0]);
    secondNum = Number(result[1]);
  } while (Number(line) !== Number(result));
  console.log(time);

  rl.close();
}).on("close", function () {
  process.exit();
});

// const line = require("fs").readFileSync("/dev/stdin", "utf8");
// let input = line.trim().split("\n");

// var N = parseInt(input);

// var newNum = N;

// var count = 0;

// while (newNum !== N || count === 0) {
//   newNum = (newNum % 10) * 10 + ((parseInt(newNum / 10) + (newNum % 10)) % 10);
//   count++;
// }

// console.log(count);
