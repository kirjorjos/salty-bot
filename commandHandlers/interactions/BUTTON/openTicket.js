module.exports = async (interaction, bot, Discord) => {
  // if (!![]) return interaction.reply({content: "This button is still WIP", ephemeral: true})  //weird if statement is so it isnt complaining about unreachable code
  if (!bot.tickets.ticketCount) bot.tickets.ticketCount = 0;
  if (bot.tickets[interaction.user.id]) return interaction.reply({content: `You can only have 1 ticket open at a time, close your ticket at <#${bot.tickets[interaction.user.id].channelID}> first.`, ephemeral: true})
  let ticketChannel = await bot.guilds.cache.get("704987510073327638").channels.create(`Ticket - ${interaction.user.username}`, {
    topic: "Open a ticket!", 
    parent: "743910995696549929",
    permissionOverwrites: [
		{
			id: interaction.user.id,
			allow: [
                Discord.Permissions.FLAGS.VIEW_CHANNEL,
                Discord.Permissions.FLAGS.SEND_MESSAGES
             ]
		},
    {
      id: interaction.guild.id,
      deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL]
    },
    {
      id: "929475560042807406",
      allow: [
        Discord.Permissions.FLAGS.VIEW_CHANNEL,
        Discord.Permissions.FLAGS.SEND_MESSAGES
      ]
    }
	]});
  if (!bot.tickets[interaction.user.id]) bot.tickets[interaction.user.id] = {
    "channelID": ticketChannel.id,
    "ticketNumber": ++bot.tickets.ticketCount
  };
  bot.tickets[interaction.user.id].userPing = `${interaction.user}`
  bot.tickets[interaction.user.id].openedTime = Math.floor(new Date().getTime()/1000);
  let ticketLogChannel = bot.channels.cache.get("743911112843722792");
  let openedEmbed = new Discord.MessageEmbed()
  .setTitle('Ticket Opened')
  .setColor(3066993)
  .setTimestamp(1647634474297)
  .addFields([
      { name: 'Ticket ID', value: `${bot.tickets.ticketCount}`, inline: true },
      { name: 'Opened By', value: `<@${interaction.user.id}>`, inline: true },
      { name: 'Open Time', value: `<t:${Math.floor(new Date().getTime()/1000)}:f>`, inline: true }
  ])
  ticketLogChannel.send({embeds: [openedEmbed]});
  interaction.reply({content: `Opened ticket <#${ticketChannel.id}>`, ephemeral: true});
  let userEmbed = new Discord.MessageEmbed()
  .setTitle("Open a ticket!")
  .setDescription("If you want to report a bug, Please explain everything in detail and support will help out as much as they can. Thank you for your patience!")
  .setColor(3066993)
  let buttons = new Discord.MessageActionRow()
    .addComponents([
      new Discord.MessageButton()
      	.setCustomId('closeTicketUnsure')
      	.setLabel('Close')
      	.setStyle('DANGER')
        .setEmoji("🔒"),
      new Discord.MessageButton()
        .setCustomId('claimTicket')
        .setLabel('Claim')
        .setStyle("SUCCESS")
        .setEmoji("🙋‍♂️")
    ])
  ticketChannel.send({embeds: [userEmbed], components: [buttons]});
  bot.database.set("tickets", bot.tickets)
}