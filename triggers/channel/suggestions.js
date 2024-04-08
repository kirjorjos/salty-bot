module.exports = (message, bot, Discord) => {
  if (message.author.bot) return;
  let suggestionText = message.content.replace(/.suggest /, "");
  const suggestchannel = bot.channels.cache.get("705690438685687818");
  const suggestion = new Discord.MessageEmbed()
    .setColor('#b739bf')
    .setAuthor(`${message.author.username}'s Suggestion`, `${message.author.displayAvatarURL()}`)
    .setDescription(`${suggestionText}`)
    .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
    message.delete();

  suggestchannel.sendSafe({embeds: [suggestion]}).then(function(msg){
      msg.react('✅');
      msg.react('❌');
      msg.startThread({
        name: `${message.author.username}'s suggestion'`,
      	autoArchiveDuration: "MAX",
      	reason: message.content,
      });
    })
}