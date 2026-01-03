const birthYears = [2005, 1998, 2010, 1987, 2003, 2015, 1995];

const currentYear = new Date().getFullYear();
const ages = birthYears.map((year) => currentYear - year);

const adultAges = ages.filter((age) => age >= 18);

console.log("Vârstele tuturor persoanelor:", ages);
console.log("Doar vârstele peste 18 ani:", adultAges);
