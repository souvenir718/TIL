/**
 * 처음으로 푼 코드 : 75%
 */
function solution(A, K) {
  if (K <= 1) return A;
  let arr = A;
  for (let i = 0; i < K; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}

/**
 * 예외처리
 */

function solution(A, K) {
  if (A.length === 0) return [];
  let arr = A;

  for (let i = 0; i < K; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}
