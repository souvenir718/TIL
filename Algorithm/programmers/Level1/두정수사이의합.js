/*
    문제
    두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
    예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.
*/

function solution(a, b) {
    var answer = 0;
    if (a === b) answer = a;
    else if (a < b) {
        while (a <= b) {
            answer += a;
            a++;
        }
    } else if (a > b) {
        while (b <= a) {
            answer += b;
            b++;
        }
    }
    return answer;
}

// ---------------- 배울 수 있는 답안
function adder(a, b) {
    var result = 0;
    //함수를 완성하세요

    return ((a + b) * (Math.abs(b - a) + 1)) / 2;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(adder(3, 5));

/*
    Math.abs() : 주어진 숫자의 절대값을 반환한다.
*/
