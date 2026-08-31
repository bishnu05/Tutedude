let n = 153; // create a variable to hold the number to be processed
let sumOfDigits = 0; // create a variable to store the sum of digits
let temp = n; // create a temporary variable to hold the value of n for calculations
let digit; // create a variable to hold the current digit being processed
let factors = []; // create an array to hold the factors of n
let isPrime = true; // create a variable to check if n is prime
let isArmstrong = true; // create a variable to check if n is an Armstrong number
let sumOfPowers = 0; // create a variable to hold the sum of the powers of the digits
let numberOfDigits = n.toString().length; // create a variable to hold the number of digits in n

// Calculate sum of digits
while (temp > 0) {
  digit = temp % 10;
  // console.log(`Current digit: ${digit}`); // log the current digit being processed
  sumOfDigits += digit;
  // console.log(`Sum of digits so far: ${sumOfDigits}`); // log the sum of digits so far
  temp = Math.floor(temp / 10);
  // console.log(`Remaining number after removing last digit: ${temp}`); // log the remaining number after removing the last digit
}

console.log(`Final sum of digits: ${sumOfDigits}`); // log the final sum of digits

// 2. Find factors of n
for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    factors.push(i);
    // console.log(`Factor found: ${i}`); // log each factor found
  }
}
console.log(`Factors of ${n}: ${factors.join(", ")}`); // log all factors of n

// 3. Check if n is prime

if (n <= 1) {
  isPrime = false; // numbers less than or equal to 1 are not prime
} else {
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      isPrime = false;
      // console.log(`Number is not prime: ${n} is divisible by ${i}`);
      break;
    }
  }
}
console.log("Is it a prime number?", isPrime ? "Yes" : "No"); // log whether n is prime

// multiplication table of n

for (let i = 1; i <= 10; i++) {
  console.log(`${n} x ${i} = ${n * i}`); // log the multiplication table of n
}

// 4. Check if n is an Armstrong number
temp = n;
sumOfPowers = 0; // reset sumOfPowers for Armstrong check

while (temp > 0) {
  digit = temp % 10;
  sumOfPowers += Math.pow(digit, numberOfDigits);
  // console.log(`Current digit: ${digit}, Sum of powers so far: ${sumOfPowers}`);
  temp = Math.floor(temp / 10);
}
console.log(`Is ${n} an Armstrong number? ${sumOfPowers === n ? "Yes" : "No"}`);
