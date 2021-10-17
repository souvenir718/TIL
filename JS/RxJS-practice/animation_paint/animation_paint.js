const { fromEvent, interval, iif, empty, merge, BehaviorSubject } = rxjs;
const {
  map,
  tap,
  startWith,
  scan,
  takeUntil,
  take,
  pluck,
  switchMap,
  throttleTime,
  mergeMap,
} = rxjs.operators;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 3;
ctx.strokeStyle = "dodgerblue";
ctx.font = "16px sans-serif";

const whichMap = rxjs.operators.concatMap;

const whichMapBS = new BehaviorSubject("mergeMap");
whichMapBS.subscribe((x) => {
  ctx.clearRect(0, 0, 600, 360);
  ctx.fillText(x, 12, 24);
});

merge(
  fromEvent(document.getElementById("mergeMap"), "click"),
  fromEvent(document.getElementById("concatMap"), "click"),
  fromEvent(document.getElementById("switchMap"), "click")
)
  .pipe(pluck("target", "value"), tap(console.log))
  .subscribe((x) => whichMapBS.next(x));

whichMapBS
  .pipe(
    switchMap((which) => {
      return fromEvent(canvas, "click").pipe(
        map((e) => {
          return { x: e.x, y: e.y };
        }),
        startWith({ x1: null, y1: null, x2: null, y2: null }),
        scan((acc, cur) => {
          return { x1: acc.x2, y1: acc.y2, x2: cur.x, y2: cur.y };
        }),
        rxjs.operators[which]((xy) =>
          iif(
            (_) => xy.x1 === null,
            empty(),
            interval(10).pipe(
              startWith({ x1: xy.x1, y1: xy.y1, x2: xy.x1, y2: xy.y1 }),
              scan((acc, cur) => {
                return {
                  x1: acc.x1,
                  y1: acc.y1,
                  x2: acc.x2 + (xy.x2 - xy.x1) / 100,
                  y2: acc.y2 + (xy.y2 - xy.y1) / 100,
                };
              }),
              take(100)
            )
          )
        )
      );
    })
  )
  .subscribe(drawLine);

function drawLine(xy) {
  ctx.beginPath();
  ctx.moveTo(xy.x1, xy.y1);
  ctx.lineTo(xy.x2, xy.y2);
  ctx.closePath();
  ctx.stroke();
}

function drawIndicator({ x, y }) {
  ctx.lineWidth = 3;
  ctx.fillStyle = "#000000";
  ctx.fillRect(590, 0, 10, 360);
  ctx.fillRect(0, 350, 600, 10);
  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(x, 350);
  ctx.lineTo(x, 360);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(590, y);
  ctx.lineTo(600, y);
  ctx.stroke();
  ctx.strokeStyle = "dodgerblue";
}
// fromEvent(canvas, "mousemove").subscribe(drawIndicator);
fromEvent(canvas, "mousemove")
  .pipe(
    throttleTime(15, undefined, {
      leading: false,
      trailing: true,
    })
  )
  .subscribe(drawIndicator);
