// const { merge, interval, fromEvent } = rxjs;
// const { map } = rxjs.operators;

// const interval$ = interval(1000).pipe(map((_) => "interval"));
// const click$ = fromEvent(document, "click").pipe(map((_) => "click"));

// merge(interval$, click$).subscribe(console.log);

// const { merge, interval } = rxjs;
// const { map, take } = rxjs.operators;

// const intv1$ = interval(1000).pipe(
//   map((_) => "INTERVAL 1"),
//   take(3)
// );
// const intv2$ = interval(1000).pipe(
//   map((_) => "INTERVAL 2"),
//   take(6)
// );
// const intv3$ = interval(1000).pipe(
//   map((_) => "INTERVAL 3"),
//   take(9)
// );
// const intv4$ = interval(1000).pipe(
//   map((_) => "INTERVAL 4"),
//   take(9)
// );
// const intv5$ = interval(1000).pipe(
//   map((_) => "INTERVAL 5"),
//   take(9)
// );

// merge(intv1$, intv2$, intv3$, intv4$, intv5$, 3).subscribe(console.log);

// const { concat, interval } = rxjs;
// const { map, take } = rxjs.operators;

// const intv1$ = interval(1000).pipe(
//   map((_) => "INTERVAL 1"),
//   take(3)
// );
// const intv2$ = interval(1000).pipe(
//   map((_) => "INTERVAL 2"),
//   take(3)
// );
// const intv3$ = interval(1000).pipe(
//   map((_) => "INTERVAL 3"),
//   take(3)
// );

// concat(intv1$, intv2$, intv3$).subscribe(console.log);

// const { concat, interval, fromEvent } = rxjs;
// const { map, take } = rxjs.operators;

// const interval$ = interval(1000).pipe(
//   map((_) => "interval"),
//   take(5)
// );
// const click$ = fromEvent(document, "click").pipe(map((_) => "click"));

// concat(interval$, click$).subscribe(console.log);

// const { interval, fromEvent } = rxjs;
// const { mergeMap, map, take } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(
//     mergeMap((e) =>
//       interval(1000).pipe(
//         map((i) => e.x + " : " + i),
//         take(5)
//       )
//     )
//   )
//   .subscribe(console.log);

// const { of } = rxjs
// const { ajax } = rxjs.ajax
// const { mergeMap, pluck } = rxjs.operators

// of(3, 15, 4, 9, 1, 7).pipe(
//     mergeMap(keyword => ajax(
//             `http://127.0.0.1:3000/people/${keyword}`
//         ).pipe(
//             pluck('response', 'first_name')
//         )
//     )
// ).subscribe(console.log)

// const { interval, fromEvent } = rxjs;
// const { concatMap, map, take } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(
//     concatMap((e) =>
//       interval(1000).pipe(
//         map((i) => e.x + " : " + i),
//         take(5)
//       )
//     )
//   )
//   .subscribe(console.log);

// const { interval, fromEvent } = rxjs;
// const { switchMap, map, take } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(
//     switchMap((e) =>
//       interval(1000).pipe(
//         map((i) => e.x + " : " + i),
//         take(5)
//       )
//     )
//   )
//   .subscribe(console.log);

// const { interval, fromEvent } = rxjs;
// const { mergeMapTo, take } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(mergeMapTo(interval(1000).pipe(take(5))))
//   .subscribe(console.log);

// const { interval, fromEvent } = rxjs;
// const { concatMapTo, take } = rxjs.operators;

// fromEvent(document, "click")
//   .pipe(concatMapTo(interval(1000).pipe(take(5))))
//   .subscribe(console.log);

const { interval, fromEvent } = rxjs;
const { switchMapTo, take } = rxjs.operators;

fromEvent(document, "click")
  .pipe(switchMapTo(interval(1000).pipe(take(5))))
  .subscribe(console.log);
