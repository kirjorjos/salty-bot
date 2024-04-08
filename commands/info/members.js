let humanMembers = (guild) => {
  console.log(guild);
}

module.exports = {
    usage: "members",
    description: "Returns member count for server",
    run: async (bot, message, args, Discord) => {
      let members = await bot.guilds.cache.get(message.guild.id).members.fetch()
      members = members.filter(member => !member.user.bot);
      let memberCount = members.size;
      const membersEmbed = new Discord.MessageEmbed()
          .setTitle('Discord Members')
          .setColor('#b739bf')
          .setDescription(`There are ${memberCount} members.`)
          .setFooter({text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}`})
      message.channel.sendSafe({embeds:[membersEmbed]});
    }
}