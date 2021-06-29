const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const input = line.split("");
  const output = [];
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  alphabet.map(a => output.push(input.indexOf(a)));
  console.log(output.join(' '));
  rl.close();
}).on("close", function () {
  process.exit();
});