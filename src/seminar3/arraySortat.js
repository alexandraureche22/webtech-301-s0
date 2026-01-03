const sortObjectsByKey = (array, key) => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
};

// Exemplu de test:
const persoane = [
  { nume: "Alex", varsta: 25 },
  { nume: "Maria", varsta: 19 },
  { nume: "Andrei", varsta: 30 },
  { nume: "Bianca", varsta: 22 },
];

console.log("Sortare după nume:");
console.log(sortObjectsByKey([...persoane], "nume"));

console.log("\nSortare după vârstă:");
console.log(sortObjectsByKey([...persoane], "varsta"));
