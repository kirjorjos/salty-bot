module.exports = {
    usage: "say <message>",
    description: "says something",
    run: async (bot, message, args, Discord) => {
       const say = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`${message.author.username} says`)
        .setDescription(args.join(" "))
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
        message.channel.sendSafe({embeds:[say]});
    }
}