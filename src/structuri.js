function checkDivisible(n, divisor) {
  if (n % divisor) {
    return false;
  } else {
    return true;
  }
}

console.log(checkDivisible(10, 2));
console.log(checkDivisible(10, 3));

//implementarea mea
function caractereDiferite(str1, str2) {
  if (str1.length !== str2.length) {
    return -1;
  }

  let diferite = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      diferite++;
    }
  }

  return diferite;
}

console.log(caractereDiferite("mama", "masa"));
console.log(caractereDiferite("rock", "rack"));
console.log(caractereDiferite("cat", "dog"));
console.log(caractereDiferite("pisica", "rata"));
