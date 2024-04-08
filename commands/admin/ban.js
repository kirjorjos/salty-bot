module.exports = {
    usage: "ban <@user/user id> [reason]",
    description: "Bans a user",
    run: async (bot, message, args, Discord) => {
      if (!args[0]) return message.channel.send("Please specify a user.");
      let targetId = args.shift();
      let timeRaw = args[0];
      let ms = bot.functions.getTimeFromString(timeRaw);
      if (ms) args.shift();
      targetId = targetId.replace("<@", "");
      targetId = targetId.replace(">", "");
      targetId = targetId.replace("&", "");
      targetId = targetId.replace("!", "");
      let target = await message.guild.members.fetch(targetId);
      let ban = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`Banned ${target.nickname||target.user.username}`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      if (args[0]) ban.addField("Reason: ", args.join());
      target.ban({reason: args.join(" ")})
        .catch(console.error);
      let vars = {"message": message, "id": targetId};
      let code = () => {
        message.guild.members.unban(vars.id, "Timeout over");
      }
      if (ms) bot.functions.setTimeout(bot, ms, code, vars);
      message.channel.sendSafe({embeds:[ban]});
    }
}