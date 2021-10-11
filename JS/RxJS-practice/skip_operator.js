const { range, interval, fromEvent } = rxjs;
const { skip, filter, pluck } = rxjs.operators;
// range(1, 20).pipe(skip(5)).subscribe(console.log);
// interval(1000)
//   .pipe(skip(5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// fromEvent(document, "click")
//   .pipe(skip(5), pluck("x"))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

const { skipLast } = rxjs.operators;

// range(1, 20).pipe(skipLast(5)).subscribe(console.log);
// interval(1000)
//   .pipe(skipLast(5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// fromEvent(document, "click")
//   .pipe(skipLast(5), pluck("x"))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

const { skipWhile } = rxjs.operators;

// range(1, 20)
//   .pipe(skipWhile((x) => x <= 10))
//   .subscribe(console.log);

// interval(1000)
//   .pipe(skipWhile((x) => x < 5))
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

// fromEvent(document, "click")
//   .pipe(
//     pluck("x"),
//     skipWhile((x) => x < 200)
//   )
//   .subscribe(
//     console.log,
//     (err) => console.error(err),
//     (_) => console.log("COMPLETE")
//   );

const { timer } = rxjs;
const { skipUntil } = rxjs.operators;
// const obs1$ = interval(1000);
// const obs2$ = fromEvent(document, "click");

// obs1$.pipe(skipUntil(obs2$)).subscribe(
//   console.log,
//   (err) => console.error(err),
//   (_) => console.log("COMPLETE")
// );

const obs1$ = fromEvent(document, "click");
const obs2$ = timer(5000);

obs1$.pipe(pluck("x"), skipUntil(obs2$)).subscribe(
  console.log,
  (err) => console.error(err),
  (_) => console.log("COMPLETE")
);
