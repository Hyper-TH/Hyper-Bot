import DiscordJS, { 
    Intents, 
    Permissions,
    MessageEmbed,
    MessageAttachment
} from 'discord.js'

import dotenv from 'dotenv'
dotenv.config()

// // Regex
// function getUserFromMention(mention) {
// 	// The id is the first and only match found by the RegEx.
// 	const matches = mention.match(USERS_PATTERN);

// 	// If supplied variable was not a mention, matches will be null instead of an array.
// 	if (!matches) return;

// 	// The first element in the matches array will be the entire mention, not just the ID,
// 	// so use index 1.
// 	const id = matches[1];

// 	return client.users.cache.get(id);
// }

// Get userid from mention
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

// First parameter is id while second is token
const webhookData = {
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN
}
const webhook = new DiscordJS.WebhookClient(webhookData);
webhook.send('Hyper was here!')

const client = new DiscordJS.Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ] , 
    partials: ['MESSAGE', 'REACTION']
}); 

const PREFIX = "!h "; // add space

// Embeded example
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

// Help embedded
const hyper_png = new MessageAttachment('assets/hyper.png');
const helpEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help commands for Hyper Bot')
    // .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Hyper Bot', iconURL: 'attachment://hyper.png', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }) // Add hyper logo to sources
    .setDescription('A simple but messy bot created by a clueless student')
    .setThumbnail('attachment://hyper.png')
    .addFields(
        { name: 'Prefix', value: '`!h`' },
        { name: 'Send help', value: '`!h help`' },
        { name: 'Kick a member', value: '`!h kick <user_id>` *Yeet a member*' },
        { name: 'Ban a member', value: '`!h ban <user_id>` ***Yeet a member harder***' },
        { name: 'Which day of the week is your birthday', value: '`!h day? <MM/DD/YYYY> <# of years from now>` Find out which day of the week is your birthday in x years' },
        { name: 'Find sum of two numbers', value: '`!h sum <num1> <num2>` ' },
        { name: 'Gay rate', value: '`!h gay` Find out how gay you are' },
        { name: '\u200B', value: '\u200B' }, // space
    )
    .setTimestamp()
    .setFooter({ text: 'Ur mom', setImage: 'attachment://hyper.png' });


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
    const testGuildId = process.env.TEST_GUILD 
    const testGuild = client.guilds.cache.get(testGuildId)
    let commands 

    if (testGuild) {
        commands = testGuild.commands
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

        if (CMD_NAME === 'help') {
            msg.channel.send({ embeds: [helpEmbed], files: [hyper_png] });
        } else if (CMD_NAME === 'kick') {
            
            if (!msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
                return msg.reply('You do not have permissions to use that command');
            if (args.length === 0) 
                return msg.reply('Please provide an ID');
            
            // const member = msg.guild.members.cache.get(args[0]);
            try {
                const user = await msg.guild.members.kick(args[0]);
                msg.channel.send('User was kicked successfully');
                console.log(user);
            } catch (err) {
                console.log(err);
                msg.channel.send('An error occured. Either I do not have permissions or the user was not found')
            } // end try catch

            // if (member) {
            //     member
            //         .kick()
            //         .then((member) => msg.channel.send(`${member} was kicked.`))
            //         .catch((err) => msg.channel.send('I do not have permissions to kick that user:('));
            //     console.log(`${member} was kicked.`)
            // } else {
            //     msg.channel.send('Member not found');
            // }
        
        // end  kick

        } else if (CMD_NAME === 'ban') {
            if (!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
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
        } else if (CMD_NAME === 'gay') {
            let x = Math.floor((Math.random() * 100) + 1);
            console.log(`Random number generated: ${x}`);

            if (args === 0){
                return msg.channel.send(`${msg.author.toString()} you are ${x}% gay`)
            }
            else { 
                
                let mentioned = getUserFromMention(args[0]);
                return msg.channel.send(`${mentioned} you are ${x}% gay`)
            }
        } 
    } // end prefix

    if (msg.content === 'no u') {
        return msg.reply('No u');
    } else if (msg.content === 'Ur mom') {
        return msg.reply('Ur mom');
    }
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
