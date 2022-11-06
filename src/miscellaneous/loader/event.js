/*
 * This file loads the events inside the /events
 * folder, and then pushes it to the main bot file
 * for listening
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { readdirSync } = require("node:fs");

module.exports = async (client) => {
  // Define the path for commands folder and filter only .js files
  const evnFile = readdirSync("./src/events/").filter((file) =>
    file.endsWith(".js")
  );

  for (const f of evnFile) {
    const loc = `../../events/${f}`;
    const evn = require(loc);

    if (evn.once) {
      // If the event only happens once
      console.log(`The event ${f} has been loaded successfully!`);
      client.once(evn.name, (...args) => evn.execute(...args));
    } else {
      // If the event happens multiple times
      console.log(`The event ${f} has been loaded successfully!`);
      client.on(evn.name, (...args) => evn.execute(...args));
    }
  }
};
