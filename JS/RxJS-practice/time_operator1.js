// const { interval, fromEvent } = rxjs;
// const { delay, tap, take } = rxjs.operators;
// interval(1000)
//   .pipe(
//     take(5),
//     tap((x) => console.log(x + " 발행시작")),
//     delay(1500)
//   )
//   .subscribe((x) => console.log(x + " 발행완료"));

// fromEvent(document, "click")
//   .pipe(
//     tap((e) => console.log(e.x + " 발행시작")),
//     delay(1500)
//   )
//   .subscribe((e) => console.log(e.x + " 발행완료"));

// const { fromEvent } = rxjs;
// const { timestamp, pluck, map } = rxjs.operators;
// fromEvent(document, "click")
//   .pipe(pluck("x"), timestamp())
//   .subscribe(console.log);

// fromEvent(document, "click")
//   .pipe(
//     pluck("x"),
//     timestamp(),
//     pluck("timestamp"),
//     map((x) => {
//       x = new Date(x).toString();
//       return x;
//     })
//   )
//   .subscribe(console.log);

// const { fromEvent, interval } = rxjs;
// const { timeInterval, pluck } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(pluck("x"), timeInterval())
//   .subscribe(console.log);
// interval(1000).pipe(timeInterval()).subscribe(console.log);

// const { fromEvent } = rxjs;
// const { ajax } = rxjs.ajax;
// const { timeout, pluck } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(timeout(3000))
//   .subscribe(
//     (_) => console.log("OK"),
//     (err) => console.error(err)
//   );

const { fromEvent, interval, of } = rxjs;
const { ajax } = rxjs.ajax;
const { timeoutWith, pluck, scan } = rxjs.operators;

fromEvent(document, "click")
  .pipe(
    timeoutWith(3000, interval(1000)),
    scan((acc, x) => {
      return acc + 1;
    }, 0)
  )
  .subscribe(console.log);

ajax("http://127.0.0.1:3000/people/name/random")
  .pipe(
    pluck("response"),
    timeoutWith(
      500,
      of({
        id: 0,
        first_name: "Hong",
        last_name: "Gildong",
        role: "substitute",
      })
    )
  )
  .subscribe(console.log, console.error);
