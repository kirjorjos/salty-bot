let maxTimeAllowed = 2147483647;
module.exports = {
  getTimeFromString: async (timeRaw) => {
    let ms = 0;
    if (!timeRaw) return false;
    time = timeRaw.match(/[a-zA-Z]+|[0-9]+(\.[0-9]+)*/g)
    if (!time) return false;
    for (var i = 0; i < time.length; i += 2) {
      switch (time[i + 1]) {
        case "s":
        case "second":
        case "seconds":
          ms += 1000 * parseInt(time[i]);
          break;
        case "m":
        case "minute":
        case "minutes":
          ms += 1000 * 60 * parseInt(time[i]);
          break;
        case "h":
        case "hour":
        case "hours":
          ms += 1000 * 60 * 60 * parseInt(time[i]);
          break;
        case "d":
        case "day":
        case "days":
          ms += 1000 * 60 * 60 * 24 * parseInt(time[i]);
          break;
        case "y":
        case "year":
        case "years":
          ms += 1000 * 60 * 60 * 24 * 356 * parseInt(time[i]);
          break;
        case "w":
        case "week":
        case "weeks":
          ms += 1000 * 60 * 60 * 24 * 7 * parseInt(time[i]);
          break;
      }
    }
    let roundedMs = await Math.floor(ms) //ensure no decimal number of ms
    return roundedMs;
  },
  grabMessageReply: async (bot, message) => {
    if (!message || !bot) return;
    let reference = message.reference;
    let channel = bot.channels.cache.get(reference?.channelId);
    if (!channel) return;
    let repliedMessage = await channel.messages.fetch(reference?.messageId);
    if (!repliedMessage) return;
    return repliedMessage;
  },
  nocache: (module) => {
    require("fs").watchFile(require("path").resolve(module), () => {
      delete require.cache[require.resolve(module)]
    })
  }
}