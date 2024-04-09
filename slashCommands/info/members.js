module.exports = {
    usage: "members",
    description: "Returns member count for server",
    run: async (bot, interaction, args, Discord) => {
      let members = await bot.guilds.cache.get(interaction.guild.id).members.fetch()
      members = members.filter(member => !member.user.bot);
      let memberCount = members.size;
      const membersEmbed = new Discord.MessageEmbed()
          .setTitle('Discord Members')
          .setColor('#b739bf')
          .setDescription(`There are ${memberCount} members.`)
          .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
      interaction.reply({embeds:[membersEmbed]});
    }
}