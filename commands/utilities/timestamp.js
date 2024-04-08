module.exports = {
  usage: "timestamp [time from now]",
  description: "Get a discord timestamp",
  run: async (bot, message, args, Discord) => {
    let ms = await bot.functions.getTimeFromString(args.join(" ") || 0);
    message.channel.send(`\\<t:${Math.floor((new Date().getTime()+ms)/1000)}:t>`);
  }
}