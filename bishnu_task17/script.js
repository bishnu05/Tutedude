// Tasks:
// Write a JavaScript function that takes two numbers as input and returns a Promise.
// • The function should perform division of the first number by the second
// number.
// • If the second number is zero, the function should reject the Promise with an
// appropriate error message.
// • Otherwise, the function should resolve the Promise with the result of the
// division
// • Use dummy values for testing purposes.
// • Run for at least 5 cases
// • Function should be arrow function


const divideNumbers = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject("Error: Division by zero is not allowed.");
        } else {
            resolve(num1 / num2);
        }
    });
}

// Test cases
const testCases = [
    { num1: 10, num2: 2 },
    { num1: 15, num2: 3 },
    { num1: 20, num2: 0 },
    { num1: 25, num2: 5 },
    { num1: 30, num2: 6 }
];

testCases.map(({ num1, num2 }) => {
    divideNumbers(num1, num2)
        .then(result => {
            console.log(`Result of ${num1} / ${num2} = ${result}`);
        })
        .catch(error => {
            console.error(`Error dividing ${num1} by ${num2}: ${error}`);
        });
});