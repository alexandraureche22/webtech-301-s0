function addToArray(array, ...args) {
  for (var i = 0; i < args.length; i++) {
    array.push(args[i]);
  }

  return array;
}

let array = ["a"];
console.log(addToArray(array, "b", "c").join(", "));

//implementarea mea
function intercaleazaArrayuri(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return [];
  }

  let rezultat = [];
  for (let i = 0; i < arr1.length; i++) {
    rezultat.push(arr1[i]);
    rezultat.push(arr2[i]);
  }

  return rezultat;
}

// teste:
console.log(intercaleazaArrayuri([1, 2, 3], ["a", "b", "c"]));
console.log(intercaleazaArrayuri(["soare", "luna"], ["galben", "argintiu"]));
console.log(intercaleazaArrayuri([1, 2], [3]));

//pas 6
const checkPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (!(n % i)) {
      return false;
    }
  }
  return true;
};

if (process.argv.length <= 2) {
  console.log("not enough parameters");
} else {
  console.log(checkPrime(parseInt(process.argv[2])));
}

//implementarea mea
function fibonacci(n) {
  if (n < 0) return "numar invalid";
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

if (process.argv.length <= 2) {
  console.log("Nu ai introdus ordinul elementului Fibonacci!");
} else {
  let n = parseInt(process.argv[2]);
  console.log(
    `Elementul de ordin ${n} din sir Fibonacci este: ${fibonacci(n)}`
  );
}

//pasul 7
const sampleString = "the quick brown fox jumps over the lazy dog";

const getCounts = (text) => {
  const words = text.split(" ");
  const result = {};
  for (let word of words) {
    if (word in result) {
      result[word]++;
    } else {
      result[word] = 1;
    }
  }
  for (let word in result) {
    result[word] /= words.length;
  }
  return result;
};

console.log(getCounts(sampleString));

//implementarea mea
const getLetterFrequencies = (text) => {
  const cleanText = text.replace(/\s+/g, "").toLowerCase();

  const result = {};

  for (let char of cleanText) {
    if (char in result) {
      result[char]++;
    } else {
      result[char] = 1;
    }
  }

  const totalLetters = cleanText.length;
  for (let char in result) {
    result[char] = result[char] / totalLetters;
  }

  return result;
};

// test
const sampleString1 = "The quick brown fox jumps over the lazy dog";
console.log(getLetterFrequencies(sampleString1));
