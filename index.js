const Discord = require("discord.js");
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
bot.aliases = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.slashCommands = new Discord.Collection();
bot.triggers = new Discord.Collection();
bot.config = require("./config.json");
bot.functions = require('./functions.js');
bot.reactions = ("./reactions.js");
require("./commandHandlers/load.js").run(bot);
require("./commandHandlers/loadSlash.js").run(bot);
bot.on('ready', async () => {
  require("./registerSlash.js")(bot);
  console.log(`Logged in as ${bot.user.tag}! - ${new Date()}`);
  bot.user.setActivity(`saltyuniverse.net | ${bot.config.prefix}help`);
});
bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      return console.error('Something went wrong when fetching the message:', error);
    }
  }
  bot.reactions.run(reaction, user, bot, true);
});
bot.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      return console.error('Something went wrong when fetching the message:', error);
    }
  }
  bot.reactions.run(reaction, user, bot, false);
});
bot.on('interactionCreate', async interaction => {
  try {
    require(`./commandHandlers/interactions/${interaction.type}.js`)(interaction, bot, Discord);
  } catch (e) { console.error(e.stack) }
});
bot.on('messageCreate', async message => {
  require("./clean.js")(message);
  try {
    if (message.channel.id == "705690438685687818") {
      return require("./triggers/channel/suggestions.js")(message, bot, Discord);
    }
    if (message.channel.id == "705690439482736751") {
      return require("./triggers/channel/updates.js")(message, bot, Discord);
    }
    require('./commandHandlers/run.js')(message, bot, Discord);
  } catch (e) {
    console.log(e.stack);
  }
})
let token = bot.config.token || process.env.token;
bot.login(token);