/*
1. 다리가 아픈 동물들이 순서대로 들어온다.
2. 동물들의 종류는 다음과 같다.
    - 무척추동물, 척추동물, 어류, 양서류, 파충류, 조류, 포유류
3. 동물들의 '종'이 같을 경우 무릎에 앉을 수 있다. 다 회복된 동물들은 언제든지 빠질 수 있다. 무릎에 앉을 경우 1초로 카운트 한다!
4. 아무도 없거나, 자리가 꽉 차 있을 때 '이 종'이 들어올 경우 가장 오래 앉아있던 동물이 아닌, 가장 최근에 같은 종이 한 번도 들어오지 않은 '종'이 나가게 된다. 이때 자리를 깨끗하게 청소해야 해서 1분이 걸린다.
5. 동물(페이지)들이 아래와 같이 차례대로 들어왔을 때 전체 수행 시간(실행 시간)을 구해야 한다.

여기서는 LRU(Least Resently Used) 알고리즘을 사용하겠다냥! LRU 알고리즘은 자리(페이지) 부재가 발생했을 경우 가장 오랫동안 사용되지 않은 자리(페이지)를 제거하는 알고리즘이다냥!

한마디로! 교체가 자주 이뤄지는 동물의 자리를 보존해주겠다는 것이다냥!

입력 : 
페이지 = ['척추동물', '어류', '척추동물', '무척추동물', '파충류', '척추동물', '어류', '파충류']

출력 :
5분 3초
*/

/*
1회 순회 : ['척추동물'] #false 1분
2회 순회 : ['척추동물', '어류'] #false 1분
3회 순회 : ['어류', '척추동물'] #true 1초
4회 순회 : ['어류', '척추동물', '무척추동물'] #false 1분
5회 순회 : ['척추동물', '무척추동물', '파충류'] #false 1분
6회 순회 : ['무척추동물', '파충류', '척추동물'] #true 1초
7회 순회 : ['어류', '파충류', '척추동물'] #false 1분
8회 순회 : ['어류', '척추동물', '파충류'] #true 1초
*/

let animal = ['척추동물', '어류', '척추동물', '무척추동물', '파충류', '척추동물', '어류', '파충류'];

let result = [];


const solution = (animal, seat) => {
    let chair = [];
    let answer = 0;

    for (const ani of animal) {
        if(chair.length < 3){ // 의자가 다 차지 않았을때
            if(chair.includes(ani)){ //true일 경우
                chair.splice(chair.indexOf(ani), 1)
                chair.push(ani)
                answer+=1;
            }else{
                chair.push(ani);
                answer+=60;
            }
        } else{ // 의자가 다 찼을 때
            if(chair.includes(ani)){ //true일 경우
                chair.splice(chair.indexOf(ani), 1)
                chair.push(ani)
                answer+=1;
            }else{
                chair.shift();
                chair.push(ani);
                answer+=60;
            }
        }
    }

    return `${parseInt(answer/60, 10)}분 ${answer%60}초`
};

// 프로그램 동작
console.log(solution(animal, 3));