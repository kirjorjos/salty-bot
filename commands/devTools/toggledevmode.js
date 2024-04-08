module.exports = {
    usage: "toggledevmode",
    description: "Toggle if the bot is in dev mode or not",
    hidden: true,
    aliases: ["tdm"],
    run: async (bot, message, args, Discord) => {
      bot.config.devMode = !bot.config.devMode;
      message.channel.send(`Bot dev mode toggled to ${bot.config.devMode}`);
    }
}