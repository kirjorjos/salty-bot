module.exports = (bot) => {
  const fs = require('fs');
  const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  const { token } = process.env;
  const guildId = bot.config.guildId;
  let clientId = bot.application.id;
  const commands = [];
  fs.readdirSync("./slashCommands/").forEach(dir => {
    const commandFiles = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./slashCommands/${dir}/${file}`);
      let commandRaw = {};
      switch(command.type) {
        case "user":
          break;
        case "message":
          commandRaw = new ContextMenuCommandBuilder().setName(file.slice(0, -3));
          break;
        default:
          commandRaw = new SlashCommandBuilder().setName(file.slice(0, -3)).setDescription(command.description);
      }
      commandRaw = (command.build)?command.build(commandRaw):commandRaw;
      commandRaw = commandRaw.toJSON();
      commands.push(commandRaw);
    }
  });
  const rest = new REST({ version: '9' }).setToken(token);
  
  (async () => {
  	try {
  		console.log('Started refreshing application (/) commands.');
  		await rest.put(
  			Routes.applicationGuildCommands(clientId, guildId),
  			{ body: commands },
  		);
  
  		console.log('Successfully reloaded application (/) commands.');
  	} catch (error) {
  		console.error(error);
  	}
  })();
}