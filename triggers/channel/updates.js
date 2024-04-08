module.exports = async (message, bot, Discord) => {
  if (message.author.bot) return;
  let updateMessage = message.content;
  let channelID = message.channel.id;
  await message.delete();
  const updateChannel = bot.channels.cache.get("705690439482736751");
  let lastMessage = (await updateChannel.messages.fetch()).filter(m => m.author.id === bot.user.id).first()
  let changeNumber = lastMessage.embeds[0].author.name;
  changeNumber = changeNumber.match(/[0-9]+/);
  const update = new Discord.MessageEmbed()
    .setColor('#b739bf')
    .setAuthor(`Change ${++changeNumber}.`, `${message.author.displayAvatarURL()}`)
    .setDescription(`${updateMessage}`)
    .setFooter({ text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`})
    .setTimestamp(Date.now())
  updateChannel.sendSafe({ embeds: [update], content: "||<@&949756649533472859>||" });
}