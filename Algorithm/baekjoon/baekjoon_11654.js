/*
  아스키코드 Bronze5
*/
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  console.log(line.charCodeAt());

  rl.close();
}).on("close", function () {
  process.exit();
});
