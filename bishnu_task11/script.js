// A = amount
// P = principal
// r = rate of interest
// t = time (in years)
// n = number of times interest is compounded per year

let P = 40000;
let r = 0.077216;
let t = 3;
let n = 1;

// let A = P * Math.pow((1 + (r / n)), n * t);
let A = P * (1 + r / n) ** (n * t);

console.log("The compound interest after " + 3 + " years is: " + Math.round(A));
