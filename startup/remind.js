const fs = require("fs");
module.exports = async (bot, Discord) => {
  let maxTimeAllowed = 2147483647;
  if (!bot.db.timeouts.reminders) bot.db.timeouts.reminders = {};
  try {
    Object.entries(bot.db.reminders).forEach(async reminders => {
      const [userId, userReminders] = reminders;
      userReminders.forEach(async userReminder => {
        const reminderInfo = userReminder;
        let remindEmbed = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle(`${reminderInfo.username}'s reminder`)
          .setFooter({ text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}` });
        let ms = (reminderInfo.time - parseInt(new Date().getTime()))
        let channel = await bot.channels.fetch(`${reminderInfo.channelId}`);
        let message;
        if (reminderInfo.messageID) message = await channel.messages.fetch(reminderInfo.messageID).catch(() => {}); else message = false;
        if (message) channel.sendSafe = message.reply; else channel.sendSafe = function(content) {
          let object = false;
          if (typeof (content) == "object") object = true;
          content = (object) ? JSON.stringify(content) : content;
          content = content.replaceAll("@everyone", `everyone ping (Nice try ${reminderInfo.userPing}.)`);
          content = content.replaceAll("@here", `here ping (Nice try ${reminderInfo.userPing}.)`);
          content = (object) ? JSON.parse(content) : content;
          channel.send(content);
        }
        let timeoutFunction = () => {
          timeout = setTimeout(function() {
            if (ms > maxTimeAllowed) {
              ms -= maxTimeAllowed;
              return timeoutFunction();
            }
            try {
              let reminderFinal = bot.db.reminders[userId][Object.keys(bot.db.reminders[userId]).find(num => bot.db.reminders[message.author.id][num].time == reminderInfo.time)].reminder;
              remindEmbed.setDescription(reminderFinal)
              let sending = { embeds: [remindEmbed], content: `${reminderInfo.userPing}` }
              if (message) message.reply(sending); else channel.sendSafe(sending);
            } catch (e) {
              console.error(e.stack);
            } bot.db.timeouts.reminders[userId].splice([bot.db.reminders[userId].indexOf(reminderInfo)], 1);
            if (bot.db.timeouts.reminders[userId] == [null]) bot.db.timeouts.reminders[userId] = [];
            bot.db.reminders[userId].splice([bot.db.reminders[userId].indexOf(reminderInfo)], 1);
            if (bot.db.reminders[userId] == [null]) bot.db.reminders[userId] = [];
            bot.functions.writeReminders(bot);
          }, (ms > maxTimeAllowed) ? maxTimeAllowed : ms);
          if (!bot.db.timeouts.reminders[userId]) bot.db.timeouts.reminders[userId] = [];
          bot.db.timeouts.reminders[userId][bot.db.timeouts.reminders[userId].length] = timeout;
        }
        timeoutFunction();
      })
    })
  } catch (e) {
    console.log(e.stack);
  }
}