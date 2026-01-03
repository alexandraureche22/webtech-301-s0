const sumOfDivisibleNumbers = (numbers, divisor) => {
  return numbers
    .filter((num) => num % divisor === 0)
    .reduce((sum, num) => sum + num, 0);
};

const numbers = [3, 5, 10, 12, 15, 18, 20];
const divisor = 5;

const result = sumOfDivisibleNumbers(numbers, divisor);
console.log("Suma numerelor divizibile cu", divisor, "este:", result);
