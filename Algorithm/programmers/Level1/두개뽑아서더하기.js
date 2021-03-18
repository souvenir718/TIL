function solution(numbers) {
    let temp = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            temp.push(numbers[i] + numbers[j]);
        }
    }
    const set = new Set(temp);

    var answer = [...set];
    answer.sort(function (a, b) {
        return a - b;
    });
    return answer;
}
