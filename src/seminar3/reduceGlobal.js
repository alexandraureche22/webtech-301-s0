const sampleArray = [1, 2, 3, 4, 5];

const reduce = (array, reducer, initialValue) => {
  let accumulator = initialValue;

  for (const element of array) {
    accumulator = reducer(accumulator, element);
  }

  return accumulator;
};

const sum = reduce(sampleArray, (acc, curr) => acc + curr, 0);
console.log("Suma elementelor:", sum);

const product = reduce(sampleArray, (acc, curr) => acc * curr, 1);
console.log("Produsul elementelor:", product);
