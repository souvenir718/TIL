const { Subject } = rxjs;
const subject = new Subject();

// subject.subscribe(console.log);

// subject.next(1);
// subject.next(3);
// subject.next(5);

/*
    Observable과 subject의 차이

    Observable
    - 누군가 구독을 해야 발행을 시작
    - 각 구독자에게 따로 발행
    - unicast, 맞춤서비스
    - cold 발행
    - Netflix

    Subject
    - 개발자가 원하는 떄에 발행
    - 모든 구독자에게 똑같이 발행
    - multicast
    - hot 발행
    - TV 채널
*/

// setTimeout((_) => {
//   let x = 0;
//   setInterval((_) => {
//     subject.next(x++);
//   }, 2000);
// }, 5000);

// subject.subscribe((x) => console.log("바로구독: " + x));
// setTimeout((_) => {
//   subject.subscribe((x) => console.log("3초 후 구독: " + x));
// }, 3000);
// setTimeout((_) => {
//   subject.subscribe((x) => console.log("10초 후 구독: " + x));
// }, 10000);
// setTimeout((_) => {
//   subject.subscribe((x) => console.log("14초 후 구독: " + x));
// }, 14000);

// const { interval } = rxjs;

// const obs$ = interval(1000);

// obs$.subscribe(subject);

// subject.subscribe((x) => console.log("바로구독: " + x));
// setTimeout((_) => {
//   subject.subscribe((x) => console.log("3초 후 구독: " + x));
// }, 3000);
// setTimeout((_) => {
//   subject.subscribe((x) => console.log("5초 후 구독: " + x));
// }, 5000);
// setTimeout((_) => {
//   subject.subscribe((x) => console.log("10초 후 구독: " + x));
// }, 10000);

const { BehaviorSubject } = rxjs;
const subject2 = new BehaviorSubject(0); // 초기값이 있음

subject2.subscribe((x) => console.log("A: " + x));

subject2.next(1);
subject2.next(2);
subject2.next(3);

subject2.subscribe((x) => console.log("B: " + x));

subject2.next(4);
subject2.next(5);

console.clear();

const { ReplaySubject } = rxjs;
const subjec3 = new ReplaySubject(3); // 마지막 3개 값 저장

subjec3.subscribe((x) => console.log("A: " + x));

subjec3.next(1);
subjec3.next(2);
subjec3.next(3);
subjec3.next(4);
subjec3.next(5);

subjec3.subscribe((x) => console.log("B: " + x));

subjec3.next(6);
subjec3.next(7);

console.clear();

const { AsyncSubject } = rxjs;
const subject4 = new AsyncSubject();

subject4.subscribe((x) => console.log("A: " + x));

subject4.next(1);
subject4.next(2);
subject4.next(3);

subject4.subscribe((x) => console.log("B: " + x));

subject4.next(4);
subject4.next(5);

subject4.subscribe((x) => console.log("C: " + x));

subject4.next(6);
subject4.next(7);
subject4.complete();
