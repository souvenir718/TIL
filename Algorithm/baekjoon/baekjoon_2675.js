const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const repeatNum = parseInt(line.split(" ").slice(0));
  const repeatStr = line.split(" ").slice(1).toString();
  let output = "";
  for (let i = 0; i < repeatStr.length; i++) {
    for (let j = 0; j < repeatNum; j++) {
      output += repeatStr[i];
    }
  }
  console.log(output);
  rl.close();
}).on("close", function () {
  process.exit();
});
