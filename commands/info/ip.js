module.exports = {
    usage: "ip",
    description: "Returns the servers IP address",
    run: async (bot, message, args, Discord) => {
      const ip = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`IP: SaltyUniverse.net`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      message.channel.sendSafe({embeds:[ip]});
    }
}