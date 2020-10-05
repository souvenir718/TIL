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
  if (time === 3) rl.close();
}).on("close", function () {
  const result = String(input[0] * input[1] * input[2]);
  let timeArr = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (let i = 0; i < result.length; i++) {
    timeArr[Number(result[i])] += 1;
  }
  timeArr.forEach((element) => {
    console.log(element);
  });
});
