function occurences(text, character) {
  let count = 0;
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) === character) {
      count++;
    }
  }
  return count;
}

console.log(occurences("sample text", "e"));

//implementarea mea
function copieArray(lista) {
  let nouArray = [];

  for (let i = 0; i < lista.length; i++) {
    nouArray.push(lista[i]);
  }

  return nouArray;
}

// teste:
console.log(copieArray([1, 2, 3, 4]));
console.log(copieArray([10, 20, 30]));
console.log(copieArray([]));
console.log(copieArray([5, -3, 12, 0, 8]));
