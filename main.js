import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

// require('dotenv').config();

// const { Client, Intents, Message, Channel } = require('discord.js');
const client = new DiscordJS.Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ] , 
    partials: ['MESSAGE', 'REACTION']
}); 
const PREFIX = "!h "; // add space


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

var today = new Date(today_mm + '-' + today_dd + '-' + today_yyyy);
console.log(`Today\'s Date: ${today}`);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)

    // test guild 
    const guildId = process.env.TEST_GUILD // store test server id in env file
    const guild = client.guilds.cache.get(guildId)
    let commands 

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
               name: 'num1',
               description: 'The first numbers.',
               required: true,
               type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER 
            },
            {
                name: 'num2',
                description: 'The second number.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER 
            },
        ],
    })
    // global
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            // ephemeral: true, // comment to let other users see
        })
    } else if (commandName === 'add') {
        const num1 = options.getNumber('num1') || 0 // default value is 0 (use ! if always expect a value)
        const num2 = options.getNumber('num2') || 0
        
        await interaction.deferReply({
            ephemeral: true
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        await interaction.editReply({
            content: `The sum is ${num1 + num2}`,
            // ephemeral: true,
        })
    }
})

client.on("messageCreate", async (msg) => {
    
    // console.log(`[${msg.author.tag}]: ${msg.content} `);
    // if (msg.author.bot) return;
    // msg.channel.send('Message Recieved');

    if (msg.content.startsWith(PREFIX)) {

        // array destructuring 
        const [CMD_NAME, ...args] = msg.content // ... spreader operator
          .trim() // trim whitespaces before and after
          .substring(PREFIX.length) // return everything after prefix
          .split(/\s+/); // match all whitespaces (regular expression, match all patterns)

        console.log(`Command name used: ${CMD_NAME}`); // For some reason, CMD_NAME becomes an arg
        console.log(`Arguments passed : ${args}`);

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
        } else if (CMD_NAME === 'sum') {
            
            if (args.length === 0) return msg.reply('Please provide the numbers to be added');

            try {
                const sum = parseInt(args[0]) + parseInt(args[1]);
                const output = 'Sum of input numbers: ' + sum;
                console.log(output);
                msg.reply(output);
            } catch (err) {
                console.log(err);
                msg.channel.send('An error occured, please check console :(');
            }

        // end sum
        } else if (CMD_NAME === 'day?') {
            
            // Get user date and store into array
            const userDateRaw = args[0].split('/');

            // Get amount of years to be added
            const years = parseInt(args[1]);

            // Get user's date
            // Date.parse() is an alternate option to convert the string date. 
            // It returns a numeric value instead of a date object. 
            // Hence it will require further processing if you expect a date object.
            // MM/DD/YYYY (also change from / to -, for some reason it goes one day back with /)
            const miliseconds = Date.parse(userDateRaw[0] + '-' + userDateRaw[1] +  '-' + userDateRaw[2]); 
            var userDate = new Date(miliseconds);
            console.log(userDate); // for some reason displays a day before

            // Declare day month and years
            // getDay returns day of week (i.e., Sunday = 0)
            // getDate returns the day of date
            const date = userDate.getDate();
            var day = userDate.getDay();
            const month = userDate.getMonth() + 1; // January at 0
            const year = userDate.getFullYear();

            // Output details of birthday
            console.log('Day of your birthday: ', date);
            console.log('Day of the week: ', daysArr[day])
            console.log('Month of your birthday: ', month);
            console.log('Year of your birthday: ', year);

            // Declare this year and next year's dates
            var thisYearMiliseconds = new Date();
            var nextYearMiliseconds = new Date();

            // MM/DD/YYYY (think of leap years)
            thisYearMiliseconds = Date.parse(userDateRaw[0] + '-' + userDateRaw[1] +  '-' + today_yyyy); // Get milliseconds of this year
            nextYearMiliseconds = Date.parse(userDateRaw[0] + '-' + userDateRaw[1] +  '-' + (today_yyyy + years)); // Get milliseconds of next year

            // Get the 1 year miliseconds difference
            const miliDifference = nextYearMiliseconds - thisYearMiliseconds 

            // Add it to current year
            const newMiliseconds = thisYearMiliseconds + miliDifference

            // Convert to date
            const result = new Date(newMiliseconds);

            day = result.getDay();
            const output = `Your birthday will be on a ${daysArr[day]} after ${years} year(s)`;

            console.log(output);
            msg.reply(output);   

        // end day?
        }
    } // end prefix

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
