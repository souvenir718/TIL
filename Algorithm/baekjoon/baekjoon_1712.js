const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const input = line.split(" ");
  const fixedCost = parseInt(input[0]);
  const makeCost = parseInt(input[1]);
  const sellCost = parseInt(input[2]);

  const margin = sellCost - makeCost;
  const count = Math.floor(fixedCost / margin) + 1;

  console.log(margin <= 0 ? -1 : count);
  rl.close();
}).on("close", function () {
  process.exit();
});
