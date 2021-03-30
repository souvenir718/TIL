/*
    문제
    길이가 n이고, "수박수박수박수...."와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 예를들어 n이 4이면 "수박수박"을 리턴하고
    3이라면 "수박수"를 리턴하면 됩니다.
*/
function solution(n) {
    var answer = '';
    for (let i = 0; i < n; i++) {
        answer = i % 2 === 0 ? answer.concat('수') : answer.concat('박');
    }
    return answer;
}

/*
    다른사람 풀이
    const waterMelon = n => "수박".repeat(n).slice(0,n);
*/
