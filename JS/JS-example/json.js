// Object to JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  symbol: Symbol("id"),
  jump: () => {
    console.log(`${this.name} can jump`);
  },
};
json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ["name", "color"]);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
  console.log(key, value);
  return key === "name" ? "ellie" : value;
});
console.log(json);

console.clear();
// JSON to Object
//parse(json)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
  return key === "birthDate" ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
//obj.jump(); // err

console.log(rabbit.birthDate.getDate());
// console.log(new Date(obj.birthDate).getDate());
console.log(obj.birthDate.getDate());

// jsonparser.org
