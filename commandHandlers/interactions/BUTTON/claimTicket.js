module.exports = async (interaction, bot, Discord) => {
  let ticket = await bot.functions.ticketFromChannel(interaction.channel.id, bot)
  if (!ticket) return interaction.reply("This channel isn't a ticket or something went wrong.")
  if (ticket.userPing == `<@${interaction.user.id}>`) return interaction.reply({content: `You can't claim your own ticket.`, ephemeral: true});
  if (ticket.claimed) return interaction.reply({content: `This ticket is already claimed by ${ticket.claimed}.`, ephemeral: true});
  interaction.reply(`Ticket claimed by ${interaction.user.username}`);
  ticket.claimed = interaction.user.username;
  bot.tickets.set("tickets", bot.tickets);
}