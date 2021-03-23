function solution(arr) {
    var answer = 0;
    arr.map((val) => (answer += val));
    answer = answer / arr.length;
    return answer;
}
