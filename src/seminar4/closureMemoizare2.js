function powerGen() {
  const cache = {};

  const pow = (base, exp) => {
    const key = `${base}^${exp}`;

    if (key in cache) {
      console.log(`found ${key}`);
      return cache[key];
    }

    console.log(`calculating ${key}...`);

    // condiție de oprire
    if (exp === 0) {
      cache[key] = 1;
    } else {
      cache[key] = base * pow(base, exp - 1);
    }

    return cache[key];
  };

  return pow;
}

// --- testare ---
const pow = powerGen();

console.log(pow(2, 4)); // 16
console.log(pow(2, 3)); // 8 (va fi găsit în cache parțial)
console.log(pow(3, 3)); // 27
console.log(pow(2, 4));
