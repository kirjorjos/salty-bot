const { readdirSync } = require("fs");
function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = {
  run: async (bot, message, args, Discord) => {
    let ranOnce;
    if (bot.commands) ranOnce = true; else ranOnce = false;
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = bot.rerequire(`./commands/${dir}/${file}`);
            let commandName = file.slice(0, -3)
            if (pull.disabled) return;
            pull.name = commandName;
            pull.category = dir;
            bot.commands.set(commandName, pull)
            table.addRow(file, '✅');
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, commandName));
        }
    });
    console.log(table.toString());
  }
}