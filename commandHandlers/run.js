module.exports = (message, bot, Discord) => {
  if (bot.functions.isBump(message)) return setTimeout(() => { message.channel.send(`<@&949756678738415687>, the server can be bumped.`)}, 1000*60*60*2)
  if (message.author.bot) return;
  if (!(message.member.permissions.has("ADMINISTRATOR") || message.channel.id == "857696865527922729")) return;
  if (!(message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`) || message.content.startsWith(bot.config.prefix))) return;
  let commandString;
  if (message.content.startsWith(`<@!${bot.user.id}>`)) commandString = message.content.substring(bot.user.id.length+6);
  if (message.content.startsWith(`<@!${bot.user.id}>`)) commandString = message.content.substring(bot.user.id.length+5);
  if (message.content.startsWith(bot.config.prefix)) commandString = message.content.substring(bot.config.prefix.length);
  let args = commandString.split(' ');
  let cmd = args.shift();
  if (args[0] == "help") {
    args = [cmd];
    cmd = "help";
  }
  message.pings = {};
  if (message.mentions.users.size>0) [message.pings.bots, message.pings.humans] = message.mentions.users.partition(u => u.bot);
  let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
  if (!command) return;
  message.flags = [];
  message.cmd = cmd;
  args.forEach((currentValue, index, array) => {
    if (currentValue.startsWith('-')) {
      message.flags.push(currentValue)
    };
  })
  message.flags.forEach((currentValue, index, array) => {
    message.flags[index] = currentValue.substring(1);
  })
  if (command.WIP && (!bot.config.lists.dev.includes(message.author.id))) return message.channel.sendSafe("This command is WIP, only the bot dev may use it.");
  if (command.category == "owner" && !bot.config.lists.owner.includes(message.author.id)) return message.channel.sendSafe("You lack permission to use this command.");
  if (["devTools"].includes(command.category) && !bot.config.lists.dev.includes(message.author.id)) return message.channel.sendSafe("You lack permission to use this command.");
  if (command.category == "admin" && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.sendSafe("You lack permission to use this command.");
  command.run(bot, message, args, Discord);
}