module.exports = (interaction, bot, Discord) => {
  const command = bot.slashCommands.get(interaction.commandName);
  if (!command) return console.log(`Error running command:\n${interaction.commandName}`);
  try {
    let args = [];
    command.run(bot, interaction, args, Discord);
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}