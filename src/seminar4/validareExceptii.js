const increaseSalary = (salaries, percent) => {
  if (!Array.isArray(salaries)) {
    throw new Error("Primul parametru trebuie să fie un array de salarii!");
  }

  if (typeof percent !== "number" || isNaN(percent)) {
    throw new Error("Al doilea parametru trebuie să fie un număr!");
  }

  return salaries.map((s) => {
    if (typeof s !== "number") {
      throw new Error(
        `Toate elementele din array trebuie să fie numere! Valoare invalidă: ${s}`
      );
    }
    return s + (s * percent) / 100;
  });
};

// --- testare ---
try {
  const initial = [3000, 4500, 5000];
  const updated = increaseSalary(initial, 10);
  console.log("Salarii actualizate:", updated);
} catch (err) {
  console.error("Eroare:", err.message);
}

try {
  // exemple de erori:
  increaseSalary("nu e array", 10);
  // increaseSalary([3000, 4500], "zece");
} catch (err) {
  console.error("Eroare:", err.message);
}
