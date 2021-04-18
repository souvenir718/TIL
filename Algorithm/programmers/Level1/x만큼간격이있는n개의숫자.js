/*
    문제
    함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다.
    다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.
*/
function solution(x, n) {
  var answer = [];
  // if(x >= 0){
  //     for(let i = x; i<= x*n; i=i+x){
  //         answer.push(i);
  //     }
  // }else{
  //     for(let i = x; i>=x*n; i= i+x){
  //         answer.push(i);
  //     }
  // }
  if (x === 0) return Array(n).fill(0);
  for (let i = x; x > 0 ? i <= x * n : i >= x * n; i = i + x) {
    answer.push(i);
  }
  return answer;
}

// 다른사람 풀이.
function solution(x, n) {
  return Array(n)
    .fill(x)
    .map((v, i) => (i + 1) * v);
}
