const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let time = 0;
rl.on("line", function (line) {
  input.push(line);
  time++;
  if (time === 10) rl.close();
}).on("close", function () {
  let Arr = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (let i = 0; i < input.length; i++) {
    Arr[i] = input[i] % 42;
  }
  Arr = [...new Set(Arr)];
  console.log(Arr.length);
});
