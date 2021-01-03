/*
1. 그림자의 길이 비율이 데이터였습니다. 해당 데이터는 2진트리의 형태를 갖추고 있으며, 각 간선은 아래와 같이 표현됩니다.
graph = {100: new Set([67, 66]),
         67: new Set([100, 82, 63]),
         66: new Set([100, 73, 69]),
         82: new Set([67, 61, 79]),
         63: new Set([67]),
         73: new Set([66]),
         69: new Set([66, 65, 81]),
         61: new Set([82]),
         79: new Set([82, 87, 77]),
         65: new Set([69, 84, 99]),
         81: new Set([69]),
         87: new Set([79, 31, 78]),
         77: new Set([79]),
         84: new Set([65]),
         99: new Set([65]),
         31: new Set([87]),
         78: new Set([87])};
2. 이 간선들을 2진 깊이우선 탐색하며 작은 값만을 선택해서, 또는 큰 값만을 선택해서 내려와야 합니다. 
3. 아래 결과값을 단서로 삼아 다음 미션지로 향하세요! 단, 코드로 풀어야 합니다.
*/

let graph = {100: new Set([67, 66]),
    67: new Set([100, 82, 63]),
    66: new Set([100, 73, 69]),
    82: new Set([67, 61, 79]),
    63: new Set([67]),
    73: new Set([66]),
    69: new Set([66, 65, 81]),
    61: new Set([82]),
    79: new Set([82, 87, 77]),
    65: new Set([69, 84, 99]),
    81: new Set([69]),
    87: new Set([79, 31, 78]),
    77: new Set([79]),
    84: new Set([65]),
    99: new Set([65]),
    31: new Set([87]),
    78: new Set([87])};

    //깊이 우선 탐색(DFS, Depth First Search - Stack)
const solution = (graph, start) => {
  let visit = [];
  let stack = [start];

  while(stack){
      let n = 0; // 다음 방문 노드
      n = stack.pop();
      if(!visit.includes(n)){
          visit.push(n);
          //Set 합칩합, 차집합 찾아보기
          let difference = new Set([...graph[n]].filter(x => !(new Set(visit).has(x))))
          for (const v of difference) {
              stack.push(v);
          }
          console.log(`방문 : ${visit}`);
          console.log(`stack : ${stack}`)
      }
      if(stack.length == 0){
        break;
      }
  }
  return visit;
};

// 깊이 우선 탐색 최댓값
const solutionMax = (graph, start) => {
    let visit = [];
    let stack = [start];
  
    while(stack){
        let n = 0; // 다음 방문 노드
        n = stack.pop();
        if(!visit.includes(n)){
            visit.push(n);
            //Set 합칩합, 차집합 찾아보기
            let difference = new Set([...graph[n]].filter(x => !(new Set(visit).has(x))))
            if([...difference].length == 0){
                break;
            }
            stack.push(Math.max(...difference))
            
            // console.log(`방문 : ${visit}`);
            // console.log(`stack : ${stack}`)
        }
        if(stack.length == 0){
          break;
        }
    }
    return visit;
  };

// 깊이 우선 탐색 최소값
const solutionMin = (graph, start) => {
    let visit = [];
    let stack = [start];
  
    while(stack){
        let n = 0; // 다음 방문 노드
        n = stack.pop();
        if(!visit.includes(n)){
            visit.push(n);
            //Set 합칩합, 차집합 찾아보기
            let difference = new Set([...graph[n]].filter(x => !(new Set(visit).has(x))))
            if([...difference].length == 0){
                break;
            }
            stack.push(Math.min(...difference))
            
            // console.log(`방문 : ${visit}`);
            // console.log(`stack : ${stack}`)
        }
        if(stack.length == 0){
          break;
        }
    }
    return visit;
  };

// 프로그램 동작
// console.log(solution(graph, 100));
console.log(solutionMax(graph, 100));
let maxList = solutionMax(graph,100);
let result = '';
for (const v of maxList) {
    result += String.fromCharCode(v);
}
console.log(result);

let result2 = '';
console.log(solutionMin(graph, 100));
let minList = solutionMin(graph, 100);
for (const v of minList) {
    result2 += String.fromCharCode(v);
}
console.log(result2);

// SET의 사용법 익히기