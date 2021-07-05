const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const answer = line.split(" ");
  let answerLength = answer.length;
  answer.map((tmp) => (tmp === "" ? (answerLength = answerLength - 1) : null));
  console.log(answerLength);
  rl.close();
}).on("close", function () {
  process.exit();
});
