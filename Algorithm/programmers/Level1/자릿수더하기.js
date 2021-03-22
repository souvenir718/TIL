/*
    문제
    자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
    예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.
*/

function solution(n) {
    var answer = 0;
    const strN = n.toString().split('');
    strN.map((s) => (answer += Number(s)));

    return answer;
}

/*
    String ==> Array
    : split() - String 객체를 지정한 구분자를 이용하여 여러개의 문자열로 나눈다.
*/
