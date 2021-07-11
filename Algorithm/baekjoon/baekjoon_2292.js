const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let count = 1;
  let range = 1;
  while (range < parseInt(line)) {
    range += count++ * 6;
  }
  console.log(count);
  rl.close();
}).on("close", function () {
  process.exit();
});
