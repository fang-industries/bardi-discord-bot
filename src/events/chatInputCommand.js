/*
 * This is the interactionCreate event; specifically,
 * only the command interaction events. It executes the
 * command on user interaction.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { Events } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Event        : interactionCreate/chatInputCommand
   * Usage        : On
   *
   * What it does : On user interaction with command,
   *                execute given command or return
   *                an error.
   */

  // Define data for loader
  name: Events.InteractionCreate,
  once: true,

  // Execute the event asynchronously
  async execute(interaction) {
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
  },
};
