const { range } = rxjs;

const { filter, map } = rxjs.operators;
const observable$ = range(1, 10);

const observer = {
  next: (x) => console.log(x + " 발행"),
  error: (err) => console.error("발행중 오류", err),
  complete: () => console.log("발행물 완결"),
};

observable$
  .pipe(
    filter((x) => x % 2 === 0),
    map((x) => x + x),
    map((x) => x + 100)
  )
  .subscribe(observer);

console.clear();

const { interval } = rxjs;

const { tap } = rxjs.operators;
const observable2$ = interval(1000);

// ... observer 정의

observable2$.pipe(
  filter((x) => x % 2 === 0),
  tap(console.log), // 원하는 동작을 미리 실행
  map((x) => x * x)
);
//   .subscribe((x) => console.log(x, "발행"));

console.clear();

const { fromEvent } = rxjs;

const observable3$ = fromEvent(document, "click");

// ... observer 정의

observable3$.pipe(map((e) => e.x + " " + e.y)).subscribe(observer);
