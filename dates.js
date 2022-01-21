const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log(today);


// Generate user input's date
var user_date = new Date();

// Get user input date (in callback forms)
rl.question('Input the month: ', function (input_mm)  {
    rl.question('Input the day: ', function (input_dd) {
            
            console.log('Your month: ', input_mm);
            console.log('Your day:',  input_dd);
            var input_yyyy = "2022";

            user_date = Date.parse(input_mm + '/' + input_dd + '/' + input_yyyy);
            
            console.log("Your user date: ", user_date);

            // Calculate user_input - today
            // To calculate the time difference of two dates
            //var Difference_In_Time = user_date.getTime() - today.getTime();
            
            // To calculate the no. of days between two dates
            //var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            
            //To display the final no. of days (result)
            // console.log("Total number of days between dates"
            //             + user_date + "and" 
            //             + today + " is: " 
            //             + Difference_In_Days);
                        
        rl.close();
    });
});

// Convenience function, wrapping rl.question() in a Promise
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
    console.log('Sum ', parseInt(input1) + parseInt(input2) + parseInt(input3));

    rl.close();
}

main();


