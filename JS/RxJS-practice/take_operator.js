const { range, interval, fromEvent, timer } = rxjs;
const { filter, pluck } = rxjs.operators;
const { takeLast, take } = rxjs.operators;
range(1, 20).pipe(take(5)).subscribe(console.log);
range(1, 20)
  .pipe(
    filter((x) => x % 2 === 0),
    take(5)
  )
  .subscribe(console.log);
range(1, 20)
  .pipe(
    take(5),
    filter((x) => x % 2 === 0)
  )
  .subscribe(console.log);

// interval(1000)
//   .pipe(take(5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// fromEvent(document, "click")
//   .pipe(take(5), pluck("x"))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// take -> 프로그램의 끝을 알려주는( complete와 관계 )
// fromEvent(document, "click")
//   .pipe(
//     pluck("x"),
//     filter((x) => x < 200),
//     take(5)
//   )
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// range(1, 20).pipe(takeLast(5)).subscribe(console.log);
// interval(1000)
//   .pipe(takeLast(5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );
// interval(1000)
//   .pipe(take(10), takeLast(5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );
// fromEvent(document, "click")
//   .pipe(take(10), takeLast(5), pluck("x"))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// const { takeWhile } = rxjs.operators;

// range(1, 20)
//   .pipe(takeWhile((x) => x <= 10))
//   .subscribe(console.log);

// interval(1000)
//   .pipe(takeWhile((x) => x < 5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// fromEvent(document, "click")
//   .pipe(
//     pluck("x"),
//     takeWhile((x) => x < 200)
//   )
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

console.clear();

const { ajax } = rxjs.ajax;
const { takeUntil, tap } = rxjs.operators;

// obs1$ = interval(1000);
// obs2$ = fromEvent(document, "click");

// obs1$.pipe(takeUntil(obs2$)).subscribe(
//   console.log,
//   (err) => console.error(err),
//   (_) => console.log("COMPLETE")
// );

// obs1$ = fromEvent(document, "click");
// obs2$ = timer(5000);

// obs1$.pipe(pluck("x"), takeUntil(obs2$)).subscribe(
//   console.log,
//   (err) => console.error(err),
//   (_) => console.log("COMPLETE")
// );

interval(50)
  .pipe(
    takeUntil(
      ajax("http://127.0.0.1:3000/people/name/random").pipe(
        pluck("response"),
        tap(console.log)
      )
    )
  )
  .subscribe(console.log);
