const { MessageEmbed } = require("discord.js");

module.exports = {
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  aliases: ['h', 'commands'],
  run: async (bot, message, args, Discord) => {
    if (args[0]) {
      const command = await bot.commands.get(args[0]);

      if (!command) {
        return message.channel.sendSafe("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor({name: command.name, iconURL: bot.user.displayAvatarURL()})
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .addField("Aliases", (command.aliases)?("`" + command.aliases + "`"):("No aliases."))
        .addField("Category", (() => {
          let commandCategory = command.category[0].toUpperCase() + command.category.slice(1)
          return "`"+commandCategory+"`";
        })())
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL()});

      return message.channel.sendSafe({embeds:[embed]});
    } else {
      const commands = await bot.commands;

      let emx = new MessageEmbed()
        .setDescription("All commands:")
        .setColor("GREEN")
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL()})
        .setThumbnail(bot.user.displayAvatarURL());

      let com = {};
      commands.forEach(comm => {
        if (!comm.hidden) {
          let category = comm.category || "Unknown";
          let name = comm.name.split("");
          name[0] = name[0].toUpperCase();name = name.join("");
          if (!com[category]) {
            com[category] = [];
          }
        com[category].push(name);
        }
      })
      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()} [${value.length}]`, desc);
      }

      return message.channel.sendSafe({embeds: [emx]});
    }
  }
};