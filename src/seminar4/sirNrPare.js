class EvenNumberStream {
  #current;

  constructor(start) {
    // dacă start e impar, îl facem par
    this.#current = start % 2 === 0 ? start : start + 1;
  }

  next() {
    const value = this.#current;
    this.#current += 2;
    return value;
  }
}

// testare
const evenStream = new EvenNumberStream(5);

for (let i = 0; i < 10; i++) {
  console.log(`even[${i}] = ${evenStream.next()}`);
}
