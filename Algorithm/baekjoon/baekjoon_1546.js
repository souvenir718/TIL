const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let time = 0;
rl.on("line", function (line) {
    input.push(line);
    time++;
    if (time === 2) rl.close();
}).on("close", function () {
    const size = input[0];
    input.shift();
    let scoreArr = input[0].split(" ");
    const MaxScore = Math.max.apply(null, scoreArr);

    scoreArr = scoreArr.map((score) =>
        parseFloat((score / MaxScore) * 100).toFixed(2)
    );

    const sum = scoreArr.reduce(function add(sum, cur) {
        return sum + Number(cur);
    }, 0.0);
    const avg = sum / size;
    console.log(avg);
});

// Math.ceil(score/MaxScore * 100))
