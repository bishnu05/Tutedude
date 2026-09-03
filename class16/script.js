let arr = [1, 2, 3, 4, 5];

// filter, find,reduce

let filteredArr = arr.filter((num) => num > 2);
let filteredArr2 = arr.filter((num) => num % 2 === 0); // This will return [2, 4] because it filters all elements that satisfy the condition
console.log("filteredArr", filteredArr);
console.log("filteredArr2", filteredArr2);

let foundNum = arr.find((num) => num === 3);
let foundNum2 = arr.find((num) => num < 4); // This will return 1 because it finds the first element that satisfies the condition
console.log("foundNum", foundNum);
console.log("foundNum2", foundNum2);

let reducedArr = arr.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log("reducedArr", reducedArr);

const cartItems = [
  { id: 1, name: "Iphone 16", price: 10, quantity: 2 },
  { id: 2, name: "Watter Bottle", price: 20, quantity: 1 },
  { id: 3, name: "Laptop Bag", price: 15, quantity: 3 },
];

const totalPrice = cartItems.reduce((accumulator, currVal) => {
  return accumulator + currVal.price * currVal.quantity;
}, 0);

console.log("Total Price:", totalPrice);

const names = cartItems
  .filter((currVal) => currVal.quantity > 1)
  .map((item) => {
    return `<li>${item.name}</li>`;
  });

console.log("Names:", names);

const div = document.getElementById("container");
div.innerHTML = `<ul>${names.join("")}</ul>`;
