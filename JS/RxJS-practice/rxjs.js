// console.log(rxjs);
const { of, from, range, generate } = rxjs;

const obs1$ = of(1, 2, 3, 4, 5);
const obs2$ = from([6, 7, 8, 9, 10]);
const obs3$ = range(11, 5);
const obs4$ = generate(
  15,
  (x) => x < 30,
  (x) => x + 2
);

// obs1$.subscribe((item) => console.log(`of: ${item}`));
// obs2$.subscribe((item) => console.log(`from: ${item}`));
// obs3$.subscribe((item) => console.log(`range: ${item}`));
// obs4$.subscribe((item) => console.log(`generate: ${item}`));

const { interval, timer } = rxjs;

const obs5$ = interval(1000);
const obs6$ = timer(3000);

// obs5$.subscribe((item) => console.log(`interval: ${item}`));
// obs6$.subscribe((item) => console.log(`timer: ${item}`));

const { fromEvent } = rxjs;

const obs7$ = fromEvent(document, "click");
const obs8$ = fromEvent(document.getElementById("myInput"), "keypress");

// obs7$.subscribe((item) => console.log(item));
// obs8$.subscribe((item) => console.log(item));

const { ajax } = rxjs.ajax;

const obs$ = ajax(`http://127.0.0.1:3000/people/1`);
// obs$.subscribe((result) => console.log(result.response));

const { Observable } = rxjs;

const obs9$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  // 값을 다 발행한 뒤에는 compelte를 실행하여 메모리 해제
  subscriber.complete();
});

// obs9$.subscribe((item) => console.log(item));

const obs10$ = of("a", "b", "c");
const obs11$ = interval(1000);
const obs12$ = fromEvent(document, "click");

// setTimeout((_) => {
//   console.log("of 구독 시작");
//   obs10$.subscribe((item) => console.log(item));
// }, 5000);
// setTimeout((_) => {
//   console.log("interval 구독 시작");
//   obs11$.subscribe((item) => console.log(item));
// }, 10000);
// setTimeout((_) => {
//   console.log("fromEvent 구독 시작");
//   obs12$.subscribe((_) => console.log("click!"));
// }, 15000);
// setTimeout((_) => {
//   console.log("interval 구독 시작 2");
//   obs11$.subscribe((item) => console.log(item));
// }, 20000);
