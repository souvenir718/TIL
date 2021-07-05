const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let answer = line.toLowerCase().split("");
  let output = Array.from({ length: 26 }, () => 0);

  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  answer.map((a) => output[alphabet.indexOf(a)]++);

  const max = Math.max(...output);
  const maxIndex = output.indexOf(max);

  let check = false;

  for (let i = 0; i < output.length; i++) {
    if (output[i] === max && maxIndex !== i) {
      check = true;
      break;
    }
  }

  console.log(check ? "?" : alphabet[maxIndex].toUpperCase());
  rl.close();
}).on("close", function () {
  process.exit();
});
