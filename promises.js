const { Console } = require('console');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Convenience function
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