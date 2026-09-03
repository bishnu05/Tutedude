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

// callback hell

function getCandies(callback1) {
  setTimeout(() => {
    const candies = "🍬";
    console.log("In our getCandies method", candies);
    callback1(candies);
  }, 3000);
}

function handOverKeys(candies, callback2) {
  setTimeout(() => {
    const keys = candies + "🔑";
    console.log("In our handOverKeys method", keys);
    callback2(keys);
  }, 2000);
}

function onboarding(keys, callback3) {
  setTimeout(() => {
    const onboarded = keys + "🧑‍💻";
    console.log("In our onboarding method", onboarded);
    callback3(onboarded);
  }, 1000);
}

getCandies((candies) => {
  handOverKeys(candies, (keys) => {
    onboarding(keys, (onboarded) => {
      console.log("Welcome to our restaurant", onboarded);
    });
  });
});


// Promises //

function getCandiesPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const candies = "🍬";
      console.log("In our getCandiesPromise method", candies);
      resolve(candies);
    }, 3000);
  });
}

function handOverKeysPromise(candies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const keys = candies + "🔑";
      console.log("In our handOverKeysPromise method", keys);
      resolve(keys);
      // reject("keys are not handed over");
    }, 2000);
  });
}

function onboardingPromise(keys) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const onboarded = keys + "🧑‍💻";
      console.log("In our onboardingPromise method", onboarded);
      resolve(onboarded);
    }, 1000);
  });
}

getCandiesPromise()
  .then((candies) => {
    return handOverKeysPromise(candies);
  })
  .then((keys) => {
    return onboardingPromise(keys);
  })
  .then((onboarded) => {
    console.log("Welcome to our restaurant", onboarded);
  })
  .catch((error) => {
    console.log("Error:", error);
  }).finally(() => {
    console.log("All promises are done");
  });


  // Async Await //

  async function getOnboarded() {
    try {
      const candies = await getCandiesPromise();
      const keys = await handOverKeysPromise(candies);
      const onboarded = await onboardingPromise(keys);
      console.log("Welcome to our restaurant", onboarded);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      console.log("All operations are done");
    }
  }

  getOnboarded();

  // Promise.all //

  const promise1 = new Promise((resolve, reject) => { 
    setTimeout(() => {
      resolve("Promise 1 resolved");
    }, 1000);
  });

  const promise2 = new Promise((resolve, reject) => { 
    setTimeout(() => {
      resolve("Promise 2 resolved");
    }, 2000);
  });

  Promise.all([promise1, promise2])
    .then((values) => {
      console.log("All promises are resolved:", values);
    })
    .catch((error) => {
      console.log("Error:", error);
    });