const { readdirSync } = require("fs");

module.exports = {
  run: async (bot) => {
        readdirSync("./slashCommands/").forEach(dir => {
        const slashCommands = readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of slashCommands) {
          const slashCommand = require(`../slashCommands/${dir}/${file}`)
          bot.slashCommands.set(file.slice(0, -3), slashCommand);
        }
    });
  }
}