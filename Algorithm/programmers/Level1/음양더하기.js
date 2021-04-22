/*
    문제
    어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와
    이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다.
    실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.
*/
function solution(absolutes, signs) {
  var answer = 0;
  absolutes.map((x, idx) =>
    signs[idx] ? (answer = answer + x) : (answer = answer - x)
  );
  //answer = absolutes.reduce((a,b) => a + b)
  return answer;
}
