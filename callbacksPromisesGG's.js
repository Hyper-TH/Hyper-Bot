const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Callbacks
rl.question('Input 1: ', function (input1) {
    rl.question('Input 2: ', function (input2) {
        rl.question('Input 3: ', function (input3) {

            console.log('Your inputs: ', input1, input2, input3);
            console.log('Sum: ', parseInt(input1) + parseInt(input2) + parseInt(input3));

            /*
                parseInt parses a value as a string and returns the first integer
                if first char cannot be converted, NaN is returned 
            */

            rl.close();
        });
    });
});


// Convenience function. Wrapping rl.question() in a Promise
function question (message) {
    return new Promise(function (resolve) {
        rl.question(message, resolve);
    })
}

async function main() {
    const input1 = await question('Input 1: ');
    const input2 = await question('Input 2: ');
    const input3 = await question('Input 3: ');

    console.log('Your inputs: ', input1, input2, input3);
    console.log('Sum: ', parseInt(input1) + parseInt(input2) + parseInt(input3));

    rl.close();
}

main();