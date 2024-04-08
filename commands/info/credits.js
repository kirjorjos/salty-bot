module.exports = {
    usage: "ip",
    description: "Returns the servers IP address",
    run: async (bot, message, args, Discord) => {
      const credits = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`Credit for coding me`, true)
        .addField("Most commands made by", "kirjorjos", true)
        .addField("a few made by", "lilspojo", true)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      message.channel.sendSafe({embeds:[credits]});
    }
}