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
  if (time === 9) rl.close();
}).on("close", function () {
  const maxNum = Math.max.apply(null, input);

  const maxIndex = input.indexOf(String(maxNum)) + 1;

  console.log(maxNum);
  console.log(maxIndex);
});
