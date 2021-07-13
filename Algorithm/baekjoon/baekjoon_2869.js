const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const input = line.split(" ");
  const A = input[0] * 1;
  const B = input[1] * 1;
  const V = input[2] * 1;

  console.log(Math.ceil((V - B) / (A - B)));
  rl.close();
}).on("close", function () {
  process.exit();
});
