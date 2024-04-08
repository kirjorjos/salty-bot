module.exports = async (interaction, bot, Discord) => {
  try { bot.rerequire(`./commandHandlers/interactions/${interaction.componentType}/${interaction.customId}.js`)(interaction, bot, Discord); } catch (e) { console.error(e.stack) };
}