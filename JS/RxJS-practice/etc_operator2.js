const { of } = rxjs;
const { startWith } = rxjs.operators;

const obs$ = of(1, 2, 3);

obs$.pipe(startWith(0)).subscribe(console.log);
// obs$.pipe(startWith(-2, -1, 0)).subscribe(console.log);

const { every } = rxjs.operators;

of(1, 3, 5, 7, 9, 11, 13, 15)
  .pipe(every((x) => x % 2 !== 0))
  .subscribe(console.log);

const { fromEvent, timer } = rxjs;
const { defaultIfEmpty, pluck, takeUntil } = rxjs.operators;

fromEvent(document, "click")
  .pipe(takeUntil(timer(5000)), pluck("x"), defaultIfEmpty("NO CLICK"))
  .subscribe(console.log);

const { range } = rxjs;
const { ajax } = rxjs.ajax;
const { mergeMap, retry } = rxjs.operators;

// range(1, 20)
//   .pipe(
//     mergeMap((keyword) =>
//       ajax(`http://127.0.0.1:3000/people/quarter-error/${keyword}`).pipe(
//         pluck("response", "first_name"),
//         retry(3)
//       )
//     )
//   )
//   .subscribe(console.log);

const { defer } = rxjs;

// fromEvent(document.querySelector("#check"), "change")
//   .pipe(pluck("target", "checked"))
//   .subscribe((checked) => {
//     defer((_) => (checked ? of("CHECKED") : of("UNCHECKED"))).subscribe(
//       console.log
//     );
//   });

const { iif } = rxjs;

fromEvent(document.querySelector("#check"), "change")
  .pipe(pluck("target", "checked"))
  .subscribe((checked) => {
    iif((_) => checked, of("CHECKED"), of("UNCHECKED")).subscribe(
      console.log,
      (err) => console.log(err),
      (_) => console.log("COMPLETE")
    );
  });

// 스트림으로 발행하되 빈 값을 내보낼 때 사용
const { empty } = rxjs;

empty().subscribe(console.log, console.error, (_) => console.log("COMPLETE"));

const { throwError } = rxjs;

throwError("ERROR").subscribe(console.log, console.error, (_) =>
  console.log("COMPLETE")
);

const { interval } = rxjs;
const { take, tap, takeLast, share } = rxjs.operators;

const obs1$ = interval(1000).pipe(
  take(20),
  tap((x) => console.log(`side effect: ${x}`)),
  share()
);

// obs1$.subscribe((x) => console.log(`subscriber 1: ${x}`));

// setTimeout((_) => {
//   obs1$.subscribe((x) => console.log(`subscriber 2: ${x}`));
// }, 5000);
// setTimeout((_) => {
//   obs1$.subscribe((x) => console.log(`subscriber 3: ${x}`));
// }, 10000);

const { shareReplay } = rxjs.operators;

const obs2$ = interval(1000).pipe(
  take(20),
  tap((x) => console.log(`side effect: ${x}`)),
  shareReplay(3)
);

obs2$.subscribe((x) => console.log(`subscriber 1: ${x}`));

setTimeout((_) => {
  obs2$.subscribe((x) => console.log(`subscriber 2: ${x}`));
}, 5000);
setTimeout((_) => {
  obs2$.subscribe((x) => console.log(`subscriber 3: ${x}`));
}, 10000);
