// Q1
const fruits = ["apple", "banana", "orange"];
console.log(fruits.join(" "));

// Q2
const fruits2 = "apple, banana, orange";
console.log(fruits2.split(", "));

// Q3
const arr = [1, 2, 3, 4, 5];
console.log(arr.reverse());
console.log(arr.sort((a, b) => b - a));

// Q4
const arr2 = [1, 2, 3, 4, 5];
const newArr = arr2.slice(2);
console.log(newArr);
console.log(arr2);

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 66),
  new Student("E", 18, true, 88),
];
// Q5
const result = students.find((a) => a.score === 90);
console.log(result);

// Q6
const enrollResult = students.filter((a) => a.enrolled);
console.log(enrollResult);

// Q7
const arrScore = students.map((student) => student.score);
console.log(arrScore);

// Q8
// some은 배열에서 하나라도 조건에 만족하면 OK
const check = students.some((student) => student.score < 50);
console.log(check);

// every는 배열에 모든 요소가 조건에 만족되야 OK
const check2 = !students.every((student) => student.score >= 50);
console.log(check2);

console.clear();
// Q9
const sum = students.reduce((prev, cur) => {
  return prev + cur.score;
}, 0);
console.log(sum / students.length);

// Q10
const scoreStr = students.map((student) => student.score).join(", ");
console.log(scoreStr);

// Bonus
const scoreSortStr = students
  .map((student) => student.score)
  .sort((a, b) => a - b)
  .join(", ");
console.log(scoreSortStr);
