module.exports = {
    usage: "runas <user id/ping> <command> [argd]",
    description: "Dev tool to simulate running a command as another user",
    hidden: true,
    run: async (bot, message, args, Discord) => {
      try {
        let userIdName = args.shift();
        let userID = userIdName.match(/[0-9]{18}/)[0];
        let username;
        if (!userID) username = userIdName;
        let commandName = args.shift();
        let command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
        let member;
        if (userID) member = await bot.guilds.cache.get(message.guild.id).members.fetch(userID);
        if (member) message.author = member.user;
        let members;
        members = await bot.guilds.cache.get(message.guild.id).members.fetch();
        member = members.filter(member => member.user.username == userIdName).at(0);
        if (!member) member = members.filter(member => member.user.nickname == userIdName);
        if (!member && !userID) return message.channel.send("Please give a valid id or username.")
        if (!command) return message.channel.send("Please enter a valid command to simulate.")
        message.cmd = commandName;
        if (args == [null]) args = [];
        command.run(bot, message, args, Discord)
      } catch(e) {
        console.error(e.stack);
        message.channel.send("Something went wrong, please try again.");
      }
    }
}