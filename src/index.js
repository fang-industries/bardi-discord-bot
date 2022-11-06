/*
 * The main bot file, it handles events and logins to the
 * Discord API
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules and load from .env file
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();

// Clear the console when started
console.clear();

// Create a new client and a collection for the commands
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Call the command and event loader
require("./miscellaneous/loader/command")(client);
require("./miscellaneous/loader/event")(client);

// Finally, login to the Discord API
client.login(process.env.BOT_TOKEN);
