Number.prototype.times = function (callback) {
  for (let i = 0; i < this; i++) {
    callback(i);
  }
};

// --- testare ---
(3).times((i) => console.log(`Executie #${i + 1}`));

(5).times(() => console.log("Salut din callback!"));
