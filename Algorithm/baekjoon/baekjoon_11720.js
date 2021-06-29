// 11720 숫자의합 브론즈2

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let time = 0;
const reducer = (acc, cur) => acc + cur;

rl.on("line", function (line) {
  input.push(line);
  time++;
  if (time === 2) rl.close();
}).on("close", function () {
  const input_array = input[1].split("").map(Number);
  console.log(input_array.reduce(reducer));
});
