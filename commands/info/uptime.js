module.exports = {
    usage: "uptime [increment]",
    description: "Returns the bot's uptime",
    run: async (bot, message, args, Discord) => {
      let time = {};
      let totalseconds = (bot.uptime / 1000);
      let days = Math.floor(totalseconds / 86400);
      totalseconds %= 86400;
      let hours = Math.floor(totalseconds / 3600);
      totalseconds %= 3600;
      let minutes = Math.floor(totalseconds / 60);
      let seconds = Math.floor(totalseconds % 60);

      // Uptime Embed
      time.uptimeseconds = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle('Uptime')
          .setDescription(`I have been online for
      ${seconds} seconds`)
          .setFooter({text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}`})

      time.uptimeminutes = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle('Uptime')
          .setDescription(`I have been online for
      ${minutes} minutes ${seconds} seconds`)
          .setFooter({text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}`})

      time.uptimehours = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle('Uptime')
          .setDescription(`I have been online for
      ${hours} hours ${minutes} minutes ${seconds} seconds`)
          .setFooter({text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}`})

      time.uptimedays = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle('Uptime')
          .setDescription(`I have been online for
      ${days} days ${hours} hours ${minutes} minutes`)
          .setFooter({text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}`})
      // Uptime Embed
      if (!["seconds", "hours", "minutes", "days"].includes(args[0]) && args[0]) return message.channel.send(`Unknown increment: ${args.join(" ")}`)
      message.channel.sendSafe({embeds:[time["uptime"+(args[0] || "days")]]})
  }
}