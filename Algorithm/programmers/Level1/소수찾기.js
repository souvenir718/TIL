function solution(n) {
    let answer = 0;
    let arr = [];

    //배열에 값 초기화
    for (let i = 2; i <= n; i++) {
        arr.push(i);
    }
    for (let i = 2; i <= n; i++) {
        if (arr[i] === 0) continue; // 아래서 0으로 체크한 수는 확인하지 않는다.

        for (let j = i + i; j <= n; j += i) {
            // i를 제외한 i의 배수들은 0으로 체크
            arr[j] = 0;
        }
    }

    // 0이 아닌 수들을 계산하여 소수 찾기.
    for (let i = 2; i <= n; i++) {
        if (arr[i] !== 0) {
            answer++;
        }
    }
    return answer;
}
