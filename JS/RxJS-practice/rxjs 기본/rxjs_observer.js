const { from } = rxjs;
const observable$ = from([1, 2, 3, 4, 5]);

const observer = {
  next: console.log,
  error: (err) => console.error("발행중 오류", err),
  complete: () => console.log("발행물 완결"),
};

observable$.subscribe(observer);

const { Observable } = rxjs;

const obs2$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3)(null)[0];
  subscriber.next(4);
});

obs2$.subscribe(
  console.log,
  (err) => console.error("발행중 오류", err),
  (_) => console.log("발행물 완결")
);

const obs3$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4);
});

obs3$.subscribe(
  console.log,
  (err) => console.error("발행중 오류", err),
  (_) => console.log("발행물 완결")
);

const { interval } = rxjs;

const obs4$ = interval(1000);
const subscription = obs4$.subscribe(console.log);

setTimeout((_) => subscription.unsubscribe(), 5500);
