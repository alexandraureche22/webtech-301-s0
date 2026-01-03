const average = (numbers) => {
  if (numbers.length === 0) return 0; // protecție la împărțirea la 0

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
};

// Exemplu de test
const numere = [10, 20, 30, 40, 50];
console.log("Media este:", average(numere));
