module.exports = {
    usage: "sayas <user ping> <message>",
    description: "Say something as another user",
    run: async (bot, message, args, Discord) => {
      if (!args[0]) return message.channel.send("Please provide a user ping.");
      if (!args[1]) return message.channel.send("Please provide a message.");
      let userPing = args.shift();
      let msg = args.join(" ");
      console.log(`${message.author.username} ran sayas at ${new Date()}`)
      let userID = userPing.match(/[0-9]{18}/)[0];
      let member = await bot.guilds.cache.get(message.guild.id).members.fetch(userID);
      let webhook = await message.channel.createWebhook(member.displayName, { avatar: member.displayAvatarURL() });
      await webhook.send({content: msg});
      webhook.delete();
      message.delete();
    }
}