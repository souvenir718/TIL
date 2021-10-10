const { of } = rxjs;
const { map } = rxjs.operators;

of(1, 2, 3, 4, 5)
    .pipe(map((x) => x * x))
    .subscribe(console.log);

const { from } = rxjs;

from([
    { name: "apple", price: 1200 },
    { name: "carrot", price: 800 },
    { name: "meat", price: 5000 },
    { name: "milk", price: 2400 },
])
    .pipe(map((item) => item.price))
    .subscribe(console.log);

console.clear();

const { pluck } = rxjs.operators;

const obs$ = from([
    { name: "apple", price: 1200, info: { category: "fruit" } },
    { name: "carrot", price: 800, info: { category: "vegetable" } },
    { name: "pork", price: 5000, info: { category: "meet" } },
    { name: "milk", price: 2400, info: { category: "drink" } },
]);

obs$.pipe(pluck("info", "category")).subscribe(console.log);

const { ajax } = rxjs.ajax;

const obs2$ = ajax(`http://api.github.com/search/users?q=user:mojombo`).pipe(pluck("response", "items", 0, "html_url"));
obs2$.subscribe(console.log);

console.clear();

const { range } = rxjs;
const { toArray, filter } = rxjs.operators;

range(1, 50)
    .pipe(
        filter((x) => x % 3 === 0),
        filter((x) => x % 2 === 1),
        toArray()
    )
    .subscribe(console.log);

console.clear();

const { reduce, scan } = rxjs.operators;

const obs3$ = of(1, 2, 3, 4, 5);
obs3$
    .pipe(
        scan((acc, x) => {
            return acc + x;
        }, 0)
    )
    .subscribe((x) => console.log("scan: " + x));

console.clear();

const { interval, fromEvent, zip } = rxjs;

const obs4$ = from([1, 2, 3, 4, 5]);
const obs5$ = from(["a", "b", "c", "d", "e"]);
const obs6$ = from([true, false, "F", [6, 7, 8], { name: "zip" }]);

zip(obs4$, obs5$).subscribe(console.log);

const obs8$ = interval(1000);
const obs9$ = fromEvent(document, "click").pipe(pluck("x"));

zip(obs8$, obs9$).subscribe(console.log);
