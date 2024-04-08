module.exports = (bot, Discord) => {
  const replitDatabase = require("@replit/database");
  bot.aliases = new Discord.Collection();
  bot.commands = new Discord.Collection();
  bot.slashCommands = new Discord.Collection();
  bot.triggers = new Discord.Collection();
  bot.database = new replitDatabase();
  bot.functions = bot.rerequire('./functions.js');
  bot.db = {};
  bot.db.timeouts = {};
  bot.database.get("reminders").then((reminders) => {
    bot.db.reminders = reminders;
  });
  bot.database.get("todo").then((todo) => {
    bot.db.todo = todo;
  });
  bot.database.get("giveaways").then((giveaways) => {
    bot.db.giveaways = giveaways;
  });
  bot.database.get("tickets").then((tickets => {
    bot.tickets = tickets;
  }));
  bot.config = require("./config.json");
  bot.loadCommands = require("./commandHandlers/load.js");
  bot.loadSlashCommands = require("./commandHandlers/loadSlash.js");
  bot.loadCommands.run(bot);
  bot.loadSlashCommands.run(bot);
  bot.on('ready', async () => {
    bot.logChannel = await bot.channels.cache.get("993978631263109211");
    bot.started = true;
    require("./registerSlash.js")(bot);
    require('./startup/remind.js')(bot, Discord);
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
    bot.rerequire("./reactions.js")(reaction, user, bot, true);
  });
  bot.on('messageReactionRemove', async (reaction, user) => {
    // console.log("removed")
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        return console.error('Something went wrong when fetching the message:', error);
      }
    }
    bot.rerequire("./reactions.js")(reaction, user, bot, false);
  });
  bot.on('interactionCreate', async interaction => {
    try {
      bot.rerequire(`./commandHandlers/interactions/${interaction.type}.js`)(interaction, bot, Discord);
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
      if (message.content.toLowerCase().match(/([^A-Za-z0-9`])+([iI][pP])([^A-Za-z0-9`])+/) && (function() {
        for (var i = 0; i < message.content.split(" ").length; i++) {
          if (["what", "how"].contains(message.content[i])) {
            return true
          }
        }
      })) return require("./triggers/keyWord/ip.js")(message, bot, Discord);
      bot.rerequire('./commandHandlers/run.js')(message, bot, Discord);
    } catch (e) {
      console.log(e.stack);
    }
  })
  bot.on('rateLimit', async (rateLimitData) => {
    // console.log(rateLimitData)
  });
  bot.on("messageDelete", async (message) => {
    if (message.partial) return bot.logChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle("ERROR")
          .setColor("#ff0000")
          .setDescription(`A message was deleted, but I couldn't gather any info!`)
          .setTimestamp(Date.now())
      ]
    })
    if (message.author.bot) return;
    // let logs = await message.guild.fetchAuditLogs("MESSAGE_DELETE");
    // let log = logs.first();
    let deleter = "this is not implemented yet"
    // console.log(log);
    let embed = new Discord.MessageEmbed()
      .setTitle("Deleted message")
      .setColor((message.member.roles.highest.color) ? message.member.roles.highest.color : "#b739bf")
      .setAuthor({ name: `${message.member.displayName}`, iconURL: message.member.displayAvatarURL() })
      .addField("Deleted by: ", `${deleter}`)
      .setDescription(message.content)
      .setTimestamp()
      .addField("Channel: ", `${message.channel}`);
    bot.logChannel.send({ embeds: [embed] });
  });
  if (!bot.started) {
    bot.rerequire("./firstStartup.js")(bot);
  } else {
    bot.rerequire("./secondStartup.js")(bot);
  }
  if (!bot.started) {
    let token = process.env.token;
    bot.login(token);
  }
}