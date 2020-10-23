// OX 퀴즈 Bronze2

// 입출력에 사용할 rl을 받아오는 함수
const getRl = () => {
    const readline = require("readline");
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
};
const rl = getRl();

// 주어진 입력들을 이용해서 정답을 반환하는 함수
const printAnswer = (inputs) => {
    inputs.shift();
    let oCount = 0;
    let oSum = 0;
    inputs.map((input) => {
        for (let i = 0; i < input.length; i++) {
            if (input[i] === "O") {
                oCount++;
                oSum += oCount;
            } else {
                oCount = 0;
            }
        }
        console.log(oSum);
        oCount = 0;
        oSum = 0;
    });
};

// 입력 받아와서 알고리즘 동작하는 함수
const inputs = [];
const start = (rl) => {
    rl.on("line", (line) => {
        inputs.push(line);
        if (inputs.length === parseInt(inputs[0]) + 1) rl.close();
    }).on("close", () => {
        printAnswer(inputs);
        process.exit();
    });
};

// 프로그램 동작
start(rl);
