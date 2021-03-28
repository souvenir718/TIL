/*
    문제
    단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.
*/

function solution(s) {
    return s.length % 2 ? s.charAt(s.length / 2) : s.charAt(s.length / 2 - 1) + s.charAt(s.length / 2);
}

/*
    다른사람 풀이
    function solution(s) {
        return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
    }
 */
