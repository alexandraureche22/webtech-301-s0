function deepClone(obj) {
  // Caz de baz: dacă nu e obiect (ex: număr, string, null, undefined) — returneaza valoarea
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // daca este un Array
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // Dacă este un obiect
  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

// --- testare ---
const original = {
  name: "Andrei",
  age: 25,
  hobbies: ["coding", "gaming", { type: "sport", name: "football" }],
  address: {
    city: "București",
    coords: { lat: 44.43, lon: 26.1 },
  },
};

const copy = deepClone(original);

copy.name = "Maria";
copy.address.city = "Cluj";
copy.hobbies[2].name = "basketball";

console.log("Original:", original);
console.log("Copia:", copy);
