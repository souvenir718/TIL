/*
문제 설명
행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. 2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.

제한 조건
행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다.
url : https://programmers.co.kr/learn/courses/30/lessons/12950?language=javascript
*/
function solution(arr1, arr2) {
  var length = arr1.length;
  var answer = [[]];
  for (var i = 0; i < length; i++) {
    answer[i] = arrPlus(arr1[i], arr2[i]);
  }

  return answer;
}
function arrPlus(arr1, arr2) {
  var length = arr1.length;
  var answer = [];
  for (var i = 0; i < length; i++) {
    answer[i] = arr1[i] + arr2[i];
  }
  return answer;
}
