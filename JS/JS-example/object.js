// object = { key : value }

const subin = { name: "subin", age: 28 };
console.log(subin.name);
console.log(subin["name"]);
subin["hasJob"] = true;
console.log(subin.hasJob); // true
delete subin.hasJob;
console.log(subin.hasJob); // false

function printValue(obj, key) {
  console.log(obj[key]);
}
printValue(subin, "name"); // subin

// property value shorthand
const person1 = { name: "bob", age: 2 };
const person2 = { name: "steve", age: 3 };
const person3 = { name: "dave", age: 4 };
const person4 = new Person("subin", 28);
console.log(person4);

// constructor function
function Person(name, age) {
  // this = {}
  this.name = name;
  this.age = age;
  // return this
}

// in operator : 키가 있는지 확인
console.log("name" in subin); // true

console.clear(); // 로그 클리어
// for..in vs for..of
// for(key in obj)
for (key in subin) {
  console.log(key, subin[key]);
}

// for(value of iterable)
const arr = [1, 2, 4, 5];
for (const value of arr) {
  console.log(value);
}

// cloning
const user = { name: "subin", age: 28 };
const user2 = user;
user2.name = "change";

console.log(user);
console.log(user2);

// old way
const user3 = {};
for (key in user) {
  user3[key] = user[key];
}
user3.name = "return";
console.log(user3);

// new way
const user4 = Object.assign({}, user);
user4.name = "test";
console.log(user4);
