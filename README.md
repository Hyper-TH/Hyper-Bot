# Hyper-Bot
A simple Discord bot with a Disboard Bump ranking system

## v0.1.0

### List of commands
* !!h help <br>
Display list of available commands 

* !!h kick <br>
Kick a user with their user ID

* !!h ban <br>
Ban a user with their user ID

* !!h sum <br>
Get the sum of two numbers

* !!h day? <br>
Find the day of your birthday in x years

* !!h gay <br>
Find out how gay you are/someone is

* !!h leaderboard <br>
Display the top 10 Disboard bumpers of the server

# Setting up

### Envrionment variables (.env file)

Make a copy of `.env.example` and rename the copied file to `.env`. Environment variables go in here.

Edit `.env` with your bot's actual Bot Token and Client ID.

##### It is important to note that all tokens and urls from the environment file `.env` and from the source files itself prior to v0.1.0 are now invalid.

### Install dependencies/packages
```
npm install discord.js
npm install dotenv --save
npm install discord.js-leveling
npm install mongoose
npm install qrcode
```
### Start the bot

Start the bot by running

```
npm run start
```
