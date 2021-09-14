"use strict";

// 프로미스 상태
// pending ==> fulfilled or rejected

// Producer vs Consumer

// 1. Producer
// 새로 프로미스가 만들어질때 executor 함수는 자동으로 실행된다.
// 유의해서 코드 짜기
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log("doing something....");
  setTimeout(() => {
    resolve("subin");
    // reject(new Error("no network"));
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise
  .then((value) => {
    // then은 promise가 정상적으로 실행됐을 때, resolve 함수에서 전달해주는 값이 value로 전달된다.
    console.log(value);
  })
  .catch((error) => {
    // catch는 promise가 에러를 발생했을때, reject 함수에서 전달해주는 값을 받는다.
    console.log(error);
  })
  .finally(() => {
    // 성공 실패 여부와 상관없이 실행
    console.log("finally");
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("닭"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`${hen} => 달걀`)), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 계란후라이`), 1000);
  });

getHen() //
  .then(getEgg)
  .catch((err) => {
    return "빵";
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);

//
