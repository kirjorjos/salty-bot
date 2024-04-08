module.exports = {
  usage: "suggest <suggestion/accept/deny> [suggestion id]",
  description: "suggest a feature or accept/deny one",
  run: async (bot, message, args, Discord) => {
    let msgID;
    let suggestion;
    let suggestionEmbed;
    let reactions;
    let reactionCounts;
    switch (args[0]) {
      case "accept":
        let acceptCase = args.shift();
        msgID = args.shift();
        if (!bot.config.lists.owner.includes(message.author.id)) return message.channel.send("Sorry, you're not allowed to accept a suggestion.");
        suggestion = await bot.channels.cache.get("705690438685687818").messages.fetch(msgID).catch(() => null);
        if (!suggestion) return message.channel.sendSafe("Please enter a valid message id.");
        let acceptChannel = await bot.channels.cache.get("918669695891161108");
        suggestionEmbed = suggestion.embeds[0] || new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setAuthor(`${suggestion.author.username}'s Suggestion`, `${suggestion.author.displayAvatarURL()}`)
          .setDescription(`${args.join(" ")}`)
          .setFooter({ text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}` });
        if (args[0]) suggestionEmbed.addField("Reason: ", args.join(" "));
        if (suggestion.hasThread) suggestionEmbed.addField("Discussion: ", `[Thread](https://discord.com/channels/704987510073327638/${suggestion.thread.id})`);
        if (suggestion.reactions.cache.size>1) reactions = [suggestion.reactions.cache.at(0).emoji.toString(), suggestion.reactions.cache.at(1).emoji.toString()];
        if (suggestion.reactions.cache.size>1) reactionCounts = [suggestion.reactions.cache.at(0).count.toString(), suggestion.reactions.cache.at(1).count.toString()];
        if (suggestion.reactions.cache.size>1) suggestionEmbed.addField(`Votes:`, `${reactions[0]}: ${reactionCounts[0] - 1} ${reactions[1]}: ${reactionCounts[1] - 1}`);
        acceptChannel.send({ embeds: [suggestionEmbed], files: suggestion.attachments.map(i => i) });
        suggestion.delete();
        break;
      case "deny":
        let denyCase = args.shift();
        msgID = args.shift();
        if (!bot.config.lists.owner.includes(message.author.id)) return message.channel.send("Sorry, you're not allowed to deny a suggestion.");
        suggestionDenied = await bot.channels.cache.get("705690438685687818").messages.fetch(msgID).catch(() => null);
        if (!suggestionDenied) return message.channel.sendSafe("Please enter a valid message id.");
        let denyChannel = await bot.channels.cache.get("934160521429680159");
        suggestionEmbed = suggestionDenied.embeds[0] || new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setAuthor(`${suggestionDenied.author.username}'s Suggestion`, `${suggestionDenied.author.displayAvatarURL()}`)
          .setDescription(`${args.join(" ")}`)
          .setFooter({ text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}` });
        if (args[0]) suggestionEmbed.addField("Reason: ", args.join(" "));
        if (suggestionDenied.hasThread) suggestionEmbed.addField("Discussion: ", `[Thread](https://discord.com/channels/704987510073327638/${suggestionDenied.thread.id})`)
        if (suggestionDenied.reactions.cache.size>1) reactions = [suggestionDenied.reactions.cache.at(0).emoji.toString(), suggestionDenied.reactions.cache.at(1).emoji.toString()];
        if (suggestionDenied.reactions.cache.size>1) reactionCounts = [suggestionDenied.reactions.cache.at(0).count, suggestionDenied.reactions.cache.at(1).count];
        if (suggestionDenied.reactions.cache.size>1) suggestionEmbed.addField(`Votes:`, `${reactions[0]}: ${reactionCounts[0] - 1} ${reactions[1]}: ${reactionCounts[1] - 1}`);
        denyChannel.send({ embeds: [suggestionEmbed], files: suggestionDenied.attachments.map(i => i) });
        suggestionDenied.delete();
        break;
      default:
        const suggestchannel = bot.channels.cache.get("705690438685687818");
        message.delete();
        suggestion = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setAuthor(`${message.author.username}'s Suggestion`, `${message.author.displayAvatarURL()}`)
          .setDescription(`${args.join(" ")}`)
          .setFooter({ text: 'saltyuniverse.net', iconURL: `${bot.user.displayAvatarURL()}` });
        suggestchannel.send({ embeds: [suggestion] }).then(function(msg) {
          msg.react('✅');
          msg.react('❌');
          msg.startThread({
            name: `${message.author.username}'s suggestion'`,
            autoArchiveDuration: "MAX",
            reason: args.join(" "),
          });
        })
    }
  }
}