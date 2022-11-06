/*
 * This is the /ping command. It responds with 'Pong!'
 * when executed.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /ping
   * Description  : Pong!
   *
   * What it does : A basic test command, it
   *                only responds with "Pong!"
   *                when it is executed.
   */

  // Define data for loader
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),

  // Execute the command asynchronously
  async execute(interaction) {
    // Reply to the user with "Pong!"
    await interaction.reply("Pong!");
  },
};
