module.exports = async (interaction, bot, Discord) => {
  let ticket = await bot.functions.ticketFromChannel(interaction.channel.id, bot);
  if (!ticket) return interaction.reply("This channel isn't a ticket or something went wrong.")
  let ticketLogChannel = bot.channels.cache.get("743911112843722792");
  let closedEmbed = new Discord.MessageEmbed()
  .setTitle('Ticket Closed')
  .setColor(3066993)
  .setTimestamp(1647634474297)
  .addFields([
      { name: 'Ticket ID', value: `${ticket.ticketNumber}`, inline: true },
      { name: 'Opened By', value: `${ticket.userPing}`, inline: true },
      { name: 'Open Time', value: `<t:${ticket.openedTime}:f>`, inline: true },
    { name: 'Close Time', value: `<t:${Math.floor(new Date().getTime()/1000)}:f>`, inline: true },
    { name: 'Closed by', value: `${interaction.user}`}
  ])
  ticketLogChannel.send({embeds: [closedEmbed]});
  delete bot.tickets[Object.keys(bot.tickets).find(userID => bot.tickets[userID]?.channelID == interaction.channel.id)];
  bot.database.set("tickets", bot.tickets)
  interaction.channel.delete();
}