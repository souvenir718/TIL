// const { fromEvent } = rxjs;
// const { timeInterval, pluck, scan, tap } = rxjs.operators;

// const clicks$ = fromEvent(document, "click").pipe(
//   timeInterval(),
//   pluck("interval"),
//   scan((acc, i) => acc + i, 0),
//   tap((x) => console.log("CLICKED: " + x))
// );

// 검색을 통한 ajax 요청시
// const { debounceTime } = rxjs.operators;

// clicks$
//   .pipe(debounceTime(1000))
//   .subscribe((x) => console.log("OUTPUT: -------- " + x));

// const { auditTime } = rxjs.operators;

// clicks$
//   .pipe(auditTime(1000))
//   .subscribe((x) => console.log("OUTPUT: -------- " + x));
// const { sampleTime } = rxjs.operators;

// clicks$
//   .pipe(sampleTime(1000), timeInterval())
//   .subscribe((x) =>
//     console.log("OUTPUT: -------- " + x.value + " :" + x.interval)
//   );

// const { throttleTime } = rxjs.operators;

// // audit과의 차이는 complete의 차이
// clicks$
//   .pipe(
//     throttleTime(1000, undefined, {
//       leading: true,
//       trailing: true,
//     })
//   )
//   .subscribe((x) => console.log("OUTPUT: -------- " + x));

const { BehaviorSubject, fromEvent, interval } = rxjs;
const { debounce, tap } = rxjs.operators;

const bs = new BehaviorSubject(1000);

fromEvent(document, "click")
  .pipe(
    tap((_) => console.log(bs.getValue())),
    debounce((e) => interval(bs.getValue())),
    tap((_) => bs.next(bs.getValue() + 500))
  )
  .subscribe((_) => console.log("CLICK"));
