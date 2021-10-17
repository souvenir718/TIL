const { Subject, BehaviorSubject, fromEvent, combineLatest, from } = rxjs;
const { ajax } = rxjs.ajax;
const {
  tap,
  switchMap,
  pluck,
  startWith,
  filter,
  timeInterval,
  map,
  scan,
  reduce,
  skip,
} = rxjs.operators;

const given = document.getElementById("given");
const input = document.getElementById("input");
const start = document.getElementById("start");
const logs = document.getElementById("logs");

const wordSubject = new Subject().pipe(
  tap((word) => (given.innerHTML = `<span class="word">${word}</span>`))
);

const ajaxSubject = new Subject().pipe(
  tap((_) => (given.innerHTML = '<span class="loading">LOADING...<span>')),
  switchMap((_) =>
    ajax("http://127.0.0.1:3000/people/name/random").pipe(
      pluck("response", Math.random() > 0.5 ? "first_name" : "last_name"),
      tap(console.log)
    )
  )
);

ajaxSubject.subscribe((word) => {
  wordSubject.next(null); // 단어가 도착한 순간부터 초를 재기 위함
  wordSubject.next(word);
});

fromEvent(start, "click").subscribe((_) => {
  input.focus();
  ajaxSubject.next();
});

combineLatest(
  wordSubject,
  fromEvent(input, "keyup").pipe(
    pluck("target", "value"),
    startWith(null) // 첫 단어 직전의 null과 combine되기 위한 초기값
  )
)
  .pipe(
    filter(([keyword, typed]) => {
      return [typed, null].includes(keyword);
    }),
    timeInterval() // 단어가 갓 주어졌을 때 ~ 입력 성공했을 때
  )
  .subscribe((result) => {
    console.log(result.value);
    if (result.value[0] !== null) {
      // 받아온 이름과 타이핑이 일치할 때
      input.value = "";
      ajaxSubject.next();
    }
    printRecords({
      interval: result.interval,
      value: result.value[0],
    });
  });

// function printRecords (result) {
//     console.log(result)
// }
// 대체

const recordSubject = new BehaviorSubject({
  records: [],
  average: null,
}).pipe(
  filter((result) => result.value !== null),
  scan((acc, cur) => {
    acc.records.push(cur);
    from(acc.records)
      .pipe(
        reduce(
          (acc2, cur2) => {
            return {
              lettersTotal: (acc2.lettersTotal += cur2.value.length),
              intervalTotal: (acc2.intervalTotal += cur2.interval),
            };
          },
          {
            lettersTotal: 0,
            intervalTotal: 0,
          }
        )
      )
      .subscribe((result) => {
        acc.average = result.intervalTotal / result.lettersTotal;
      });
    return acc;
  })
);

// recordSubject.subscribe(console.log) 대체
recordSubject.pipe(skip(1)).subscribe((result) => {
  logs.innerHTML =
    `<div class="average">Average: <span>${result.average}</span></div>` +
    result.records
      .map((record) => {
        return `<div class="score">${record.value}: <span>${record.interval}</span></div>`;
      })
      .join("");
});
function printRecords(result) {
  recordSubject.next(result);
}
