module.exports = (bot) => {
  for (var i = 0; i<bot.listerners.length; i++) {
    removeListener(bot.listerners[i]);
  }
  bot.listerners = [];
}