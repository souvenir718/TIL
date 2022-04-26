/**
 * TIME ERROR
 *
 */

function solution(A) {
  const result = {};
  A.forEach((num) => {
    result[num] = (result[num] || 0) + 1;
  });

  for (const [key, value] of Object.entries(result)) {
    if (value % 2 === 1) {
      return Number(key);
    }
  }
}

//
function solution(A) {
  const result = {};
  A.forEach((num) => {
    result[num] = (result[num] || 0) + 1;
  });

  for (const key in result) {
    if (result[key] % 2 === 1) {
      return Number(key);
    }
  }
}
