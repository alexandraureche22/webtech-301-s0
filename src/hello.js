console.log("hello world!");
let sayHello = (name) => {
  return `Hello, ${name}!`;
};

console.log(sayHello(process.argv[0]));
console.log(sayHello(process.argv[1]));
console.log(sayHello(process.argv[2]));

let concatStrings = (array) => {
  return array.join(" ");
};

let cuvinte = ["imi", "place", "sa", "invat", "JavaScript"];
console.log(concatStrings(cuvinte));
