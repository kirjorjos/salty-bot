module.exports = {
    usage: "close [ticket channel]",
    description: "Close the ticket linked or the current ticket",
    aliases: ["close"],
    run: async (bot, message, args, Discord) => {
      let channelID = message.channel.id;
      if (args[0]) channelID = args[0].match(/[0-9]+/)[0];
      if (!bot.functions.ticketFromChannel(channelID, bot)) return message.channel.send("It does not apear this channel is a ticket.");
      bot.rerequire("./commandHandlers/interactions/BUTTON/closeTicketUnsure.js")(message, bot, Discord);
    }
}