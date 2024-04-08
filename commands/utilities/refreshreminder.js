module.exports = {
    usage: "*reply to a reminder going off* <new time>",
    description: "Refresh a reminder",
    run: async (bot, message, args, Discord) => {
      let finalReminder = await bot.functions.grabMessageReply(bot, message);
      if (!finalReminder) return message.channel.send("Please reply to a reminder gone off.")
      let commandMessage = await bot.functions.grabMessageReply(bot, finalReminder);
      let newArgs = commandMessage.content.split(" ");
      newArgs.shift();
      newArgs[0] = args[0];
      if (!finalReminder) return message.channel.send("Either you failed to reply to a reminder or the reminder you replied to is too old to be supported.")
      let commandName = "remind";
      let command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
      if (!command) return message.channel.send("Please enter a valid command to simulate.");
      commandMessage.cmd = commandName;
      if (!newArgs[0]) newArgs = [];
      command.run(bot, commandMessage, newArgs, Discord);
    }
}