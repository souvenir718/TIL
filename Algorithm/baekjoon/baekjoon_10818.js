/*
  최소, 최대
  N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.
*/

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
  if (time === 2) rl.close();
}).on("close", function () {
  const input_array = input[1].split(" ").map(Number);
  input_array.sort(function (a, b) {
    // 오름차순
    return a - b;
  });
  //   let tempNum = 0;
  //   for (let i = 0; i < Number(input[0]); i++) {
  //     for (let j = i; j < Number(input[0]); j++) {
  //       if (input_array[i] > input_array[j]) {
  //         tempNum = input_array[i];
  //         input_array[i] = input_array[j];
  //         input_array[j] = tempNum;
  //       }
  //     }
  //   }
  console.log(input_array[0], input_array[Number(input[0]) - 1]);
});
