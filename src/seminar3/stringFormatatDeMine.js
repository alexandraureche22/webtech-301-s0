const formatStringNamed = (template, params) => {
  let result = template;
  for (const key in params) {
    const placeholder = `{${key}}`;
    result = result.replace(placeholder, params[key]);
  }
  return result;
};

// exemplu de test:
const text = "un {substantiv} este {adjectiv}";
const valori = { substantiv: "căluț", adjectiv: "drăguț" };

console.log(formatStringNamed(text, valori));
