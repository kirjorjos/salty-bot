module.exports = {
    usage: "ping",
    description: "Returns latency and API ping",
    run: async (bot, message, args, Discord) => {
       const ping = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`Ping - ${bot.ws.ping}ms`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      message.channel.sendSafe({embeds:[ping]});
    }
}