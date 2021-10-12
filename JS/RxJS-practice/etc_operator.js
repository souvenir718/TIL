const { from, fromEvent } = rxjs;
const { sequenceEqual, mergeMap, map, take } = rxjs.operators;

const num$ = from([3, 1, 4, 7, 5, 8, 2]);

const key$ = fromEvent(document, "keyup")
  .pipe(
    map((e) => Number(e.code.replace("Digit", ""))),
    take(7),
    sequenceEqual(num$)
  )

  .subscribe(console.log);

// const { of } = rxjs;
// const { distinctUntilChanged } = rxjs.operators;

// of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 3, 4, 4, 1)
//   .pipe(distinctUntilChanged())
//   .subscribe(console.log);

const { distinctUntilChanged } = rxjs.operators;

const students = [
  { name: "홍길동", sex: "male" },
  { name: "전우치", sex: "male" },
  { name: "아라치", sex: "female" },
  { name: "성춘향", sex: "female" },
  { name: "임꺽정", sex: "male" },
];
from(students)
  .pipe(distinctUntilChanged((a, b) => a.sex === b.sex))
  .subscribe(console.log);

const { combineLatest, interval } = rxjs;
const { pluck } = rxjs.operators;

// combineLatest(
//   interval(2000),
//   fromEvent(document, "click").pipe(pluck("x"))
// ).subscribe(console.log);

const { buffer } = rxjs.operators;

// interval(1000)
//   .pipe(buffer(fromEvent(document, "click")))
//   .subscribe(console.log);

const { range } = rxjs;
const { bufferCount } = rxjs.operators;
// 몇개씩 자르고 몇개씩 shift할건지
// range(1, 100).pipe(bufferCount(10, 10)).subscribe(console.log);
// 클릭 3번중 한 번만 반응하기

fromEvent(document, "click")
  .pipe(bufferCount(3))
  .subscribe((_) => console.log("FIRE"));

const { bufferTime } = rxjs.operators;

// interval(200).pipe(bufferTime(2000)).subscribe(console.log);

const { groupBy, toArray } = rxjs.operators;

range(1, 50)
  .pipe(
    groupBy((x) => x % 3),
    mergeMap((groups$) => groups$.pipe(toArray()))
  )
  .subscribe(console.log);
