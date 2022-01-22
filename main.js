require('dotenv').config();

const { Client, Intents, Message, Channel } = require('discord.js');
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] , 
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = "!h";


Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.addYears = function (years) {
    let date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + years);
    return date;
};

const daysArr = {
    0 : 'Sunday',
    1 : 'Monday',
    2 : 'Tuesday',
    3 : 'Wednesday',
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday'
};

// Get today's date
var today = new Date();
var today_dd = String(today.getDate()).padStart(2, '0');
var today_mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var today_yyyy = today.getFullYear();

today = today_mm + '-' + today_dd + '-' + today_yyyy;
console.log('Today\'s Date: ', today);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
 

client.on("messageCreate", async (msg) => {
    
    // console.log(`[${msg.author.tag}]: ${msg.content} `);
    // if (msg.author.bot) return;
    // msg.channel.send('Message Recieved');

    if (msg.content.startsWith(PREFIX)) {

        // ... spreader operator
        const [CMD_NAME, ...args] = msg.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        
        console.log(CMD_NAME);
        console.log(args);

        if (CMD_NAME === 'kick') {
            
            if (!msg.member.hasPermissions('KICK_MEMBERS'))
                return msg.reply('You do not have permissions to use that command');
            if (args.length === 0) 
                return msg.reply('Please provide an ID');
            
            const member = msg.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => msg.channel.send(`${member} was kicked.`))
                    .catch((err) => msg.channel.send('I do not have permissions to kick that user:('));
            } else {
                msg.channel.send('Member not found');
            }
            msg.channel.send('Kicked the user');

        // end  kick
        } else if (CMD_NAME === 'ban') {
            if (!msg.member.hasPermissions('BAN_MEMBERS'))
                return msg.reply('You do not have permissions to use that command');
            if (args.length === 0) return msg.reply('Please provide an ID');

            try {
                const user = await msg.guild.members.ban(args[0]);
                msg.channel.send('User was banned successfully');
                console.log(user);
            } catch (err) {
                console.log(err);
                msg.channel.send('An error occured. Either I do not have permissions or the user was not found')
            } // end try catch

        // end ban
        } // else if (CMD_NAME == 'sum') {
        //     if (args.length === 0) return msg.reply('Please provide the numbers to be added');

        //     try {
        //         var sum = parseInt(args[0]) + parseInt(args[1]);
        //         var output = 'Sum of input numbers: ' + sum;

        //         console.log(output);
        //         msg.reply(output);
        //     } catch (err) {
        //         console.log(err);
        //         msg.channel.send('An error occured, please check console :(');
        //     }

        // // end sum
        // }
    } // end prefix

    // // Find sum of 2 numbers
    // if (msg.content.startsWith('sum')) {

    //     if (msg.author.bot) return;
        
    //     var userInput = msg.content; 
    //     const array = userInput.split(' ');

    //     console.log(array[2], array[3]);
        
    //     const sum = parseInt(array[2]) + parseInt(array[3]);

    //     var output = 'Sum of input numbers: ' + sum;

    //     console.log(output);
    //     msg.reply(output);

    // } // end !h sum

    // Find day of the week (MM/DD/YYYY yearsToAdd)
    // if (msg.content.startsWith('!h day?')) {

    //     if (msg.author.bot) return;

    //     var userInput = msg.content;
    //     const fullArray = userInput.split(' ');

    //     // Store user date into array
    //     var userDateRaw = fullArray[2].split('/');

    //     // Store amount of years user input
    //     var years = parseInt(fullArray[3]);

    //     // Get user's date
    //     // Date.parse() is an alternate option to convert the string date. 
    //     // It returns a numeric value instead of a date object. 
    //     // Hence it will require further processing if you expect a date object.
    //     var miliseconds = new Date();
    //     // MM/DD/YYYY (also change from / to -, for some reason it goes one day back with /)
    //     var miliseconds = Date.parse(userDateRaw[0] + '-' + userDateRaw[1] +  '-' + userDateRaw[2]); 

    //     // console.log(miliseconds);
    //     userDate = new Date(miliseconds);
    //     console.log(userDate); // for some reason displays a day before
        
    //     // userDate = userDate.addDays(1); // Add one day

    //     // Declare day month and years
    //     var day = new Date();
    //     var month = new Date();
    //     var year = new Date();

    //     // getDay returns day of week (i.e., Sunday = 0)
    //     // getDate returns the day of date
    //     date = userDate.getDate();
    //     day = userDate.getDay();
    //     month = userDate.getMonth() + 1; // January at 0
    //     year = userDate.getFullYear();

    //     // Output details of birthday
    //     console.log('Day of your birthday: ', date);
    //     console.log('Day of the week: ', daysArr[day])
    //     console.log('Month of your birthday: ', month);
    //     console.log('Year of your birthday: ', year);

    //     // Declare this year and next year's dates
    //     var thisYearMiliseconds = new Date();
    //     var nextYearMiliseconds = new Date();

    //     // MM/DD/YYYY (think of leap years)
    //     thisYearMiliseconds = Date.parse(userDateRaw[0] + '-' + userDateRaw[1] +  '-' + today_yyyy); // Get milliseconds of this year
    //     nextYearMiliseconds = Date.parse(userDateRaw[0] + '-' + userDateRaw[1] +  '-' + (today_yyyy + years)); // Get milliseconds of next year

    //     // Get the 1 year miliseconds difference
    //     miliDifference = nextYearMiliseconds - thisYearMiliseconds 

    //     // Add it to current year
    //     newMiliseconds = thisYearMiliseconds + miliDifference

    //     // Convert to date
    //     var result = new Date(newMiliseconds);

    //     day = result.getDay();
    //     var output = 'Your birthday will be on a ' + daysArr[day];

    //     console.log(output);
    //     msg.reply(output);        
    
    // } // end !h day?

}); // end message

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === 'message_id_here') {
        switch (name) {

            // copy into channel and copy emoji (\:apple:)
            case '🍎':
                member.roles.add('id_of_role');              
                break;
                
            case '🍌':
                member.roles.add('id_of_role');
                break;
                
            case '🍇':
                member.roles.add('id_of_role');
                break;
                
            case '🍑':
                member.roles.add('id_of_role');              
                break;
        }
    }
}); // end reaction add

client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === 'message_id_here') {
        switch (name) {

            // copy into channel and copy emoji (\:apple:)
            case '🍎':
                member.roles.remove('id_of_role');              
                break;
                
            case '🍌':
                member.roles.remove('id_of_role');
                break;
                
            case '🍇':
                member.roles.remove('id_of_role');
                break;
                
            case '🍑':
                member.roles.remove('id_of_role');              
                break;
        }
    }
}); // end reaction remove

// This has to be the last line of the file
client.login(process.env.TOKEN);
