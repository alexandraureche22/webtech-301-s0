const censorText = (text, dictionary) => {
  return text
    .split(" ") // spargem textul în cuvinte
    .map((word) => {
      if (dictionary.includes(word)) {
        if (word.length > 2) {
          return word[0] + "**" + word[word.length - 1];
        } else {
          return "*".repeat(word.length);
        }
      }
      return word;
    })
    .join(" ");
};

// Exemplu de test
const text = "javascript este minunat";
const dictionary = ["este"];

console.log(censorText(text, dictionary));
