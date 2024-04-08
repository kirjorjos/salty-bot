let maxTimeAllowed = 2147483647;
module.exports = {
  writeReminders: (bot) => {
    bot.database.set("reminders", bot.db.reminders)
  },
  isBump: (message) => {
    if (message.content == `⚠️ **Regular commands are being replaced in favour of slash commands.**
From <t:1648767600:F> regular commands will no longer work and the bot will only respond to slash commands.
Try typing \`/\` to see a list of available commands.

If you cannot see a list of commands for DISBOARD, try re-adding the bot via the link below:
 https://discord.com/api/oauth2/authorize?client_id=302050872383242240&permissions=0&scope=bot%20applications.commands&guild_id=704987510073327638.`) {
      if (message.embeds[0].description.includes("Bump done")) return true; else return false;
    } else {
      return false
    };
  },
  ticketFromChannel: async (channelID, bot) => {
    if (!bot) return message.channel.send("<@500682420723384321>, you forgot to pass the bot var");
    return bot.tickets[Object.keys(bot.tickets).find(userID => 
      bot.tickets[userID]?.channelID == channelID)];
  },
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
  setTimeout: async (bot, ms, code, vars) => {
    let timeoutFunction = () => {
      timeout = setTimeout(function() {
        if (ms > maxTimeAllowed) {
          ms -= maxTimeAllowed;
          return timeoutFunction();
        }
        code();
      }, (ms > maxTimeAllowed) ? maxTimeAllowed : ms);
    }
    timeoutFunction();
  },
  grabMessageReply: async (bot, message) => {
    if (!message || !bot) return;
    let reference = message.reference;
    let channel = bot.channels.cache.get(reference?.channelId);
    if (!channel) return;
    let repliedMessage = await channel.messages.fetch(reference?.messageId);
    if (!repliedMessage) return;
    return repliedMessage;
  }
}