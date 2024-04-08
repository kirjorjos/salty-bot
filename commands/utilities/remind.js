module.exports = {
  usage: "remind <set/remove/cancel/list/edit> [time/number] [reminder]",
  aliases: ["remindme", "reminder", "reminders"],
  description: "Returns latency and API ping",
  run: async (bot, message, args, Discord) => {
    if (message.cmd == "reminders") args.unshift("list");
    if (!bot.db.reminders[message.author.id]) bot.db.reminders[message.author.id] = [];
    if (!bot.db.reminders[message.author.id][0]) bot.db.reminders[message.author.id] = [];
    let flag = args.shift();
    let hasFlag = false;
    switch (flag) {
      case "list":
        if (bot.db.reminders[message.author.id].length == 0 || !bot.db.reminders[message.author.id]) {
          message.channel.sendSafe("You have 0 items on your reminders list.");
          break;
        }
        let remindersEmbed1 = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle(`${message.author.username}'s reminders list:`)
          .setFooter({ text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}` });
        for (var i = 0; i < bot.db.reminders[message.author.id].length; i++) {
          remindersEmbed1.addField(`Reminder ${i + 1} | <t:${Math.floor(bot.db.reminders[message.author.id][i].time/1000)}:t>`, bot.db.reminders[message.author.id][i].reminder);
        }
        return message.channel.sendSafe({ embeds: [remindersEmbed1] });
        break;
      case "remove":
      case "cancel":
        try {
          let removed = bot.db.reminders[message.author.id].splice(parseInt(args.join(" ")) - 1, 1);
          let timeout = bot.db.timeouts.reminders[message.author.id].splice(parseInt(args.join(" ")) - 1, 1);
          if (bot.db.timeouts.reminders[message.author.id] == [null]) bot.db.timeouts.reminders[message.author.id] = [];
          if (bot.db.reminders[message.author.id] == [null]) bot.db.reminders[message.author.id] = [];
          clearTimeout(timeout[0]);
          message.channel.sendSafe(`${removed[0].reminder} removed from your reminder list.`);
        } catch (e) {
          console.log(e.stack);
          return message.channel.sendSafe(`Unknown list item: ${args.join(" ")}.  Please remember to use the number given in \`${bot.config.prefix}reminders list\`.`);
        }
        bot.functions.writeReminders(bot);
        break;
      case "edit":
        let number = parseInt(args.shift());
        let previous = bot.db.reminders[message.author.id][number - 1];
        if (previous) previous = previous.reminder;
        let newReminder = args.join(" ");
        message.channel.send(`\`${previous}\` replaced with \`${newReminder}\`.`);
        if (bot.db.reminders[message.author.id][(number - 1)]) {
          bot.db.reminders[message.author.id][((number) - 1)].reminder = newReminder;
        }
          bot.functions.writeReminders(bot);
        break;
      case "set":
        hasFlag = true;
      //no break is very intentional
      default:
        if (!hasFlag) args.unshift(flag);  //"flag" will more than likely be the time if its not an option.
        if (!args[0]) return message.channel.sendSafe("Invalid args.")
        let valid = true;
        let timeRaw = args.shift();
        let ms = await bot.functions.getTimeFromString(timeRaw);
        if (!ms) return message.channel.sendSafe(`Unknown time: ${timeRaw}`);
        try {
          let resultTime = (parseInt(new Date().getTime()) + ms)
          let vars = { 
            "channel": message.channel,
            "message": message,
            "userID": message.author.id,
            "resultTime": resultTime
          };
          vars.reminder = args.join(" ");
          let remindEmbed = await new Discord.MessageEmbed()
            .setColor('#b739bf')
            .setTitle(`${message.author.username}'s reminder`)
            .setDescription(vars.reminder)
            .setFooter({ text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}` });
          if (!bot.db.reminders[message.author.id][0]) bot.db.reminders[message.author.id] = [];
          bot.db.reminders[message.author.id][bot.db.reminders[message.author.id].length] = {
            "time": resultTime,
            "channelId": message.channel.id,
            "username": message.author.username,
            "userPing": `${message.author}`,
            "messageID": `${message.id}`,
            "reminder": vars.reminder
          }
          const remindSuccess = new Discord.MessageEmbed()
            .setColor('#b739bf')
            .setTitle(`Reminder set for <t:${Math.floor(resultTime / 1000)}:R>.`)
          message.channel.send({ embeds: [remindSuccess] })
          vars.remindEmbed = remindEmbed;
          let code = function() {
            try {
              let reminderFinal = bot.db.reminders[vars.userID][Object.keys(bot.db.reminders[vars.userID]).find(num => bot.db.reminders[message.author.id][num].time == vars.resultTime)].reminder;
            vars.remindEmbed.setDescription(reminderFinal)
              vars.message.reply({ embeds: [vars.remindEmbed], content: `${vars.message.author}` });
            } catch (e) {
              console.error(e.stack);
            }
            bot.db.timeouts.reminders[vars.message.author.id].splice([bot.db.reminders[vars.message.author.id].indexOf(vars.reminder)], 1);
            if (bot.db.timeouts.reminders[message.author.id] == [null]) bot.db.timeouts.reminders[vars.mesage.author.id] = [];
            bot.db.reminders[vars.message.author.id].splice([bot.db.reminders[vars.message.author.id].indexOf(vars.reminder)], 1);
            if (bot.db.reminders[vars.message.author.id] == [null]) bot.db.reminders[vars.message.author.id] = [];
            bot.functions.writeReminders(bot);
          }
          bot.functions.setTimeout(bot, ms, code, vars);
          bot.db.timeouts.reminders = bot.db.timeouts.reminders || {};
          bot.db.timeouts.reminders[message.author.id] = bot.db.timeouts.reminders[message.author.id] || [];
          bot.db.timeouts.reminders[message.author.id] = [...bot.db.timeouts.reminders[message.author.id], timeout];
          bot.functions.writeReminders(bot);
        } catch (e) {
          console.log(e.stack);
        }
    }
  }
}