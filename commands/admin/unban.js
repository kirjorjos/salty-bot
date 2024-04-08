module.exports = {
  usage: "unban <user id> [reason]",
  description: "Unbans a user",
  run: async (bot, message, args, Discord) => {
    let id = args.shift();
    try {
      await message.guild.members.unban(id, args.join(" ")).catch(console.error);
      let target = await bot.users.fetch(id);
      let unban = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`Unbanned ${target.username}`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      message.channel.sendSafe({ embeds: [unban] });
    } catch (e) { 
      console.log(e.stack)
      message.channel.send(`${target.displayName} is not currently banned.`) 
    }
  }
}