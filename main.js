import DiscordJS, { 
    Intents, 
    Permissions,
    MessageEmbed,
    MessageAttachment
} from 'discord.js'

import dotenv from 'dotenv'
import levels from "discord.js-leveling"

dotenv.config()
levels.setURL(`${process.env.MONGO_URL}`)

const client = new DiscordJS.Client({ 
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: 'your mom',
            type: 'PLAYING'
        }],
    },
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ] , 
    partials: ['MESSAGE', 'REACTION']
}); 

// Help embedded
const hyper_png = new MessageAttachment('assets/hyper.png');
const helpEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help commands for Hyper Bot')
    .setAuthor({ name: 'Hyper Bot', iconURL: 'attachment://hyper.png', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }) 
    .setDescription('A simple but messy bot created by a clueless Computer Science student')
    .setThumbnail('attachment://hyper.png')
    .addFields(
        { name: 'Prefix', value: '`!!h`' },
        { name: 'Send help', value: '`!!h help`' },
        { name: 'Kick a member', value: '`!!h kick <user_id>` *Yeet a member* (For admins only)' },
        { name: 'Ban a member', value: '`!!h ban <user_id>` ***Yeet a member harder*** (For admins only)' },
        { name: 'Which day of the week is your birthday', value: '`!!h day? <MM/DD/YYYY> <# of years from now>` Find out which day of the week is your birthday in x years' },
        { name: 'Find sum of two numbers', value: '`!!h sum <num1> <num2>` ' },
        { name: 'Gay rate', value: '`!!h gay <optional: user>` Find out how gay you are' },
        { name: 'leaderboard', value: '`!!h leaderboard` Display the top 10 bumpers of this server' },
        { name: '\u200B', value: '\u200B' }, // space
    )
    .setTimestamp()
    .setFooter({ text: 'Ur mom', setImage: 'attachment://hyper.png' });


const PREFIX = "!!h "; // add space

const daysArr = {
    0 : 'Sunday',
    1 : 'Monday',
    2 : 'Tuesday',
    3 : 'Wednesday',
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday'
};

// Parse mention
function getUserFromMention (mention) {

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return mention;
	}
}

// Get today's date
var today = new Date();
var today_dd = String(today.getDate()).padStart(2, '0');
var today_mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var today_yyyy = today.getFullYear();

var today = new Date(today_mm + '-' + today_dd + '-' + today_yyyy);
console.log(`Today\'s Date: ${today}`);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", async (msg) => {
    
    if (msg.content.startsWith(PREFIX)) {

        // array destructuring 
        const [CMD_NAME, ...args] = msg.content // ... spreader operator
          .trim() // trim whitespaces before and after
          .substring(PREFIX.length) // return everything after prefix
          .split(/\s+/); // match all whitespaces (regular expression, match all patterns)

        console.log(`Command name used: ${CMD_NAME}`); 
        console.log(`Arguments passed : ${args}`);

        if (CMD_NAME === 'help') {
            msg.channel.send({ 
                embeds: [helpEmbed], 
                files: [hyper_png] 
            });
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
            
            if (args.length == 2) { 
                /*
                    Have a try catch when converting 
                    arguments passed into date values
                    (WIP)
                */

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

                // Get the year miliseconds difference
                const miliDifference = nextYearMiliseconds - thisYearMiliseconds 

                // Add it to current year
                const newMiliseconds = thisYearMiliseconds + miliDifference

                // Convert to date
                const result = new Date(newMiliseconds);

                day = result.getDay();
                const output = `Your birthday will be on a ${daysArr[day]} after ${years} year(s)`;

                console.log(output);
                msg.reply(output);   
            } else {
                msg.reply("Insufficient arguments, please check `!!h help`");
            }
        // end day?

        } else if (CMD_NAME === 'gay') {
            let x = Math.floor((Math.random() * 100) + 1);
            console.log(`Random number generated: ${x}`);

            if (args.length === 0){
                return msg.channel.send(`${msg.author.toString()} you are ${x}% gay`)
            } else { 
                let mentioned = args[0];
                return msg.channel.send(`${mentioned} you are ${x}% gay`)
            }
        } else if (CMD_NAME === 'gganon') {
            msg.reply(`FBI OPEN UP`)
        } else if (CMD_NAME === 'leaderboard') {

            // const rawLeaderboard = await levels.fetchLeaderboard(msg.guild.id, 10); // We grab top 10 users with most xp in the current server.
        
            // if (rawLeaderboard.length < 1) return msg.reply("Nobody's in leaderboard yet.");
    
            // const leaderboard = await levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
    
            // // Turn this into a proper embbed (WIP)
            // const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

            // msg.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);

            msg.channel.send("Leaderboard: hidden");
        }
    } // end prefix commands

    if (msg.content === 'no u') {
        if(msg.author.bot) return;
        return msg.reply('no u');
    } else if (msg.content === 'ur mom') {
        if(msg.author.bot) return;
        return msg.reply('ur mom');
    }

    /* DISBOARD */
    if (msg.author.id === process.env.DISBOARD_ID) {
        
        if ((msg.embeds).length) {
            
            if (msg.embeds[0].description.includes("Please wait")) {

                const embedString = msg.embeds[0].description.split(' ');
                let mentioned = embedString[0];

                console.log(`Bump unsuccessful for ${mentioned}`);

            } else if (msg.embeds[0].description.includes("Bump done!")) {

                const embedString = msg.embeds[0].description.split(' ');
                let mentioned = getUserFromMention(embedString[0]);

                const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
                const hasLeveledUp = await levels.appendXp(mentioned, msg.guild.id, randomAmountOfXp);
                
                msg.reply(`XP given for <@${mentioned}>, server bumped`);

                if (hasLeveledUp) {
                
                    const user = await levels.fetch(msg.author.id, msg.guild.id);
                    
                    const levelEmbed = new DiscordJS.MessageEmbed()
                    .setTitle('New Level!')
                    .setDescription(`**GG** ${msg.author}, you just leveled up to level **${user.level + 1}**!\n🥳`)

                    const sendEmbed = await msg.channel.send(levelEmbed)
                    sendEmbed.react('🥳')
                }
            } else if (msg.embeds[0].description.includes('DISBOARD')) {
                msg.channel.send(`The bot timed out/Unrecognized response from Disboard`);
            } else {
                // This is when DISBOARD randomly speaks in a different language
                msg.channel.send(`I'm not habla, I can only speak english`);
            }
        } 
    }
}); // end message


client.login(process.env.TOKEN);
