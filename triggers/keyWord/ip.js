let isQuestion = (string) => {
  return string.toLowerCase().match(/([^A-Za-z0-9`])+([iI][pP])([^A-Za-z0-9`])+/)
}

module.exports = (message, bot, Discord) => {
  if (isQuestion(" " + message.content + " ")) {
    const ip = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`IP: SaltyUniverse.net`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      message.channel.sendSafe({embeds:[ip]});
  }
}