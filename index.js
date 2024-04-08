const Discord = require('discord.js');
const bot = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_BANS
  ],
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTION'
  ]
});
bot.rerequire = (filepath) => {
  delete require.cache[require.resolve(filepath)];
  try {
    let required = require(filepath);
    return required;
  } catch(e) { console.error(e.stack) }
}
bot.rerequire("./main.js")(bot, Discord);