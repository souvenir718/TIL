"use strict";

// async
function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve("subin");
  });
}

async function asyncFetchUser() {
  return "subin";
}

const user = asyncFetchUser();
// user.then(console.log);
console.log(user);

// await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return "apple";
}
async function getBanana() {
  await delay(2000);
  return "banana";
}

// function pickFruits() {
//   return getApple().then((apple) => {
//     return getBanana().then((banana) => `${apple}, ${banana}`);
//   });
// }

async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple}, ${banana}`;
}
pickFruits().then(console.log);

// userful Promise APIs
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(", ")
  );
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
