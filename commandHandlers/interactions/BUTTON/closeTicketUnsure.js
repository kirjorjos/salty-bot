module.exports = async (interaction, bot, Discord) => {
  interaction.reply({
    components: [
      new Discord.MessageActionRow()
        .addComponents([
          new Discord.MessageButton()
            .setCustomId('closeTicketConfirm')
            .setLabel('Close')
            .setStyle('PRIMARY')
            .setEmoji("✔️"),
          new Discord.MessageButton()
            .setCustomId('closeTicketCancel')
            .setLabel('Cancel')
            .setStyle('DANGER')
            .setEmoji("❌"),
        ])
    ],
    embeds: [
      new Discord.MessageEmbed()
      .setTitle("Confirm close")
    ]
  })
}