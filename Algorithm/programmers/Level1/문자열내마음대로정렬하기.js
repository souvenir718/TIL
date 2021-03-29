/*
    문제
    문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다.
    예를 들어 strings가 ["sun", "bed", "car"]이고 n이 1이면 각 단어의 인덱스 1의 문자 "u", "e", "a"로 strings를 정렬합니다.
 */

function solution(strings, n) {
    strings.sort(function (a, b) {
        let first = a[n];
        let second = b[n];

        if (first === second) {
            return (a > b) - (a < b);
        } else {
            return (first > second) - (first < second);
        }
    });

    return strings;
}

/*
    다른사람 풀이
    function solution(strings, n) {
        // strings 배열
        // n 번째 문자열 비교
        return strings.sort((s1, s2) => s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n]));
    }
*/
