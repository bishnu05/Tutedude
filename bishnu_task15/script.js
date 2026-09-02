let arr = [4, 8, 2, 11, 6, 7, 10];

// find the maximum number in the array
// named function
function findMax(arr) {
  if (arr.length === 0) {
    return null; // Return null for empty array
  }
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

let max = findMax(arr);
console.log(max);

// calculate the sum of all elements in the array
// annonymous function
let calculateSum = function (arr) {
  if (arr.length === 0) {
    return 0; // Return 0 for empty array
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

let sum = calculateSum(arr);
console.log(sum);

// count the number of odd numbers in the array
// arrow function
let countOddNumbers = (arr) => {
  if (arr.length === 0) {
    return 0; // Return 0 for empty array
  }
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      count++;
    }
  }
  return count;
};

let oddCount = countOddNumbers(arr);
console.log(oddCount);
