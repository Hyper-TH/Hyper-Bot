// /* Program to do calculation and display result (SEQUENCE CONTROL) */
// /* Cons: need to call 2 functions */
// function myDisplayer (some) {
//     console.log(some);
// }

// function myCalculator(num1, num2) {
//     let sum = num1 + num2;
//     return sum;
// }

// let result = myCalculator(5, 5);
// myDisplayer(result);


// /* Program to do calculation and display result v2 */
// /* Cons: cant prevent calculator function from displaying result */
// function myDisplayer(some) {
//     console.log(some);
// }

// function myCalculator(num1, num2) {
//     let sum = num1 + num2;
//     myDisplayer(sum);
// }

// myCalculator(5, 5);


// /* Callback calculator function */
// function myDisplayer(some) {
//     console.log(some);
// }

// function myCalculator(num1, num2, myCallback) {
//     let sum = num1 + num2;
//     myCallback(sum);
// }

// myCalculator(5, 5, myDisplayer);

// /* When passing a function as an arg, do not use parentheses */


// let oddNumbers = numbers.filter(function (number) {
//     return number % 2;
// });

// console.log(oddNumbers); // [ 1, 7, 3, 5 ]


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input first number: ', function (num1) {
    rl.question('Input second number: ', function (num2) {

        console.log('Your inputs: ', num1, num2);
        console.log('Sum: ', parseInt(num1) + parseInt(num2))

        rl.close();
    });
});