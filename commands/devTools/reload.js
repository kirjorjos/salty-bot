module.exports = {
    usage: "reload",
    description: "Reload the commands without restarting everything else",
    hidden: true,
    run: async (bot, message, args, Discord) => {
       bot.loadCommands = await bot.rerequire("./commandHandlers/load.js");
       bot.loadCommands.run(bot);
       const reloaded = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`Commands reloaded.`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
        message.channel.sendSafe({embeds:[reloaded]});
      console.log("Commands reloaded!")
    }
}