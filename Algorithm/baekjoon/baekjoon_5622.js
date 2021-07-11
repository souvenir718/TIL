const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", function (line) {
    let input = line.split("");
    let time = 0;
    for (let i = 0; i < input.length; i++) {
        let n = input[i].charCodeAt() - 59;
        if (n === 24 || n === 27 || n === 30 || n === 31) n -= 3;
        time += parseInt(n / 3) + 1;
    }
    console.log(time);
    rl.close();
}).on("close", function () {
    process.exit();
});
