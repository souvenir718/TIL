function solution(N) {
  const dec = N.toString(2);
  const bigGap = dec.slice(dec.indexOf("1") + 1, dec.lastIndexOf("1"));
  const zeroCount = bigGap.split("1").map((zero) => zero.length);

  return zeroCount.length ? Math.max(...zeroCount) : 0;
}

const exampleArr = [1041, 15, 32];

exampleArr.map((ex) => console.log(solution(ex)));

/**
 * 1. 숫자를 2진수로 변환하기 위해 toString(2)를 사용
 * 2. 1과 1사이의 0 길이를 구하기 위해 slice 메소드를 이용해서 처음 1과 끝의 1의 인덱스번호로 문자열을 자른다.
 * 3. 잘려진 문자열을 1을 기준으로 split하면 0으로만 뭉쳐진 배열이 만들어진다.
 * 4. 그 배열의 길이 중 최댓값을 출력한다. (배열의 길이가 0일 경우 0을 리턴한다.)
 */
