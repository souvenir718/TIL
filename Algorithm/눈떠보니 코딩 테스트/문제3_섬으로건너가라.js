/*
1. 한 배에는  탈 수 있는 인원이 정시에는 25명, 10분마다 15명씩 탈 수 있습니다.
2. 배는 매일 9시부터 21시 전까지(21시를 포함하지 않습니다) 10분단위로 들어옵니다. 
3. 전체 대기 인원은 14,000,605명입니다. 우리는 14,000,606번째와 14,000,607번째에 배를 타게 됩니다. 앞사람이 아프거나, 대기를 못하고 빠질 경우 대기인원이 줄어들 수도 있습니다. **라이캣과 자바독이 다른 배를 타야 할 경우에는 뒷배를 타야 합니다.**
4. 1월은 1024일, 2월은 512일, 3월은 256일, 4월은 128일, 5월은 64일, 6월은 32일, 7월은 16일, 8월은 8일, 9월은 4일, 10월은 2일이며, 10월까지밖에 없습니다.
5. 시간의 개념은 동일합니다. (하루는 24시간, 1시간 60분, 1분 60초)
    - **현재 날짜는 2020년 1월 1일 입니다.**
6. 배에 타는 순간 자바독이 화장실이 급하다 하여 화장실에 갔으며, 현재시간에 '분'만큼 배 출발이 늦어졌습니다.
7. 배는 휴일도 동일하게 운항됩니다. 배는 천재지변에 영향을 받지 않습니다. 마법으로 날아다니거든요.
8. **라이캣과 자바독이 배에 타는 날짜를 구하세요.**

    **입력**
    대기인원 = 14000605

    **출력**
    2025년 2월 413일 11시 0분 출발

    **입력**
    대기인원 = 1200202

    **출력**
    2020년 1월 1000일 11시 0분 출발

*/


/*
    9시         25  25
    9시 10분    15  40
    9시 20분    15  55
    9시 30분    15  70
    9시 40분    15  85
    9시 50분    15  100

    9시 ~ 21시 : 12시간 하루에 1200명
*/

let waitingPeople = 1200202; // 대기인원

let result = [];

const timeToShip = (waitPeople) => {
    let year = 0, month = 0, date = 0, hour = 0, minute = 0;
    let tempMonth = 0; // 걸린 월 수
    let yearDate = 0;
    for(let i=1; i<11; i++){
        yearDate += 2**i;
    }
    let totalDate = waitPeople / 1200;
    year = parseInt(totalDate / yearDate, 10);

    let remainDate = totalDate%yearDate;// 나머지 일 수
    for(i=10; i>0; i++){
        tempMonth++;
        if(totalDate%yearDate < 2**i)
        break;
        
        remainDate = remainDate - 2**i;
    }
    month = parseInt(tempMonth);
    date = parseInt(remainDate);

    hour = parseInt((waitPeople%1200)/100 + 9, 10);

    let startPeople = [25, 40, 55, 70, 85, 100];
    let calculateMinute = 0;

    for (let key in startPeople) {
        if (startPeople[key] > (waitingPeople%1200)%100) {
            calculateMinute = key*10;
            break;
        }
    }

    let tempDate = new Date();
    calculateMinute = calculateMinute + tempDate.getMinutes();
    if(calculateMinute > 60){
        calculateMinute = calculateMinute - 60
        hour += 1;
    }

    minute = calculateMinute;




    return `${20+ year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`
}
// 프로그램 동작
console.log(timeToShip(waitingPeople));