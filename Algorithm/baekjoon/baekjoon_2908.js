const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", function (line) {
    let input = line.split(" ");
    let output = input.map((a) => parseInt(a.split("").reverse().join("")));
    console.log(Math.max(...output));
    rl.close();
}).on("close", function () {
    process.exit();
});
