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

// Call the command loader to load all commands
require("./miscellaneous/loader")(client);

// Once the bot is ready, log a message
client.once(Events.ClientReady, (c) => {
  console.log("The bot is ready! Logged in as " + c.user.tag);
});

// Parse and reply to bot commands
client.on(Events.InteractionCreate, async (interaction) => {
  // Ignore the interaction if it isn't a command
  if (!interaction.isChatInputCommand()) return;

  // Get the command name from the collection
  const cmd = interaction.client.commands.get(interaction.commandName);

  // If the command doesn't exist, return an error.
  if (!cmd) {
    await interaction.reply({
      content:
        "We're sorry, an internal error has occurred. Rest assured, we are trying to fix this as fast as possible.",
      ephemeral: true,
    });
    console.error(
      `[ERR] No command matching ${interaction.commandName} was found! Did you re-deploy your commands?`
    );
    return;
  }

  try {
    // Try to execute the command
    await cmd.execute(interaction);
  } catch (err) {
    // If the execution fails, log to console and return an error message
    console.error(err);
    await interaction.reply({
      content:
        "We're sorry, an internal error has occurred. Rest assured, we are trying to fix this as fast as possible.",
      ephemeral: true,
    });
  }
});

// Finally, login to the Discord API
client.login(process.env.BOT_TOKEN);
