module.exports = {
    usage: "rules",
    description: "Returns the server rules",
    run: async (bot, message, args, Discord) => {
      const rules = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle('Rules')
        .setDescription('To read the rules, please go to <#705690430070849607>')
        .setFooter({text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}`});
      message.channel.sendSafe({embeds:[rules]});
    }
}