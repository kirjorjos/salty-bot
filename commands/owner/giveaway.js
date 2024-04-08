module.exports = {
    usage: "giveaway create <time> <prize>",
    description: "Host a giveaway",
    run: async (bot, message, args, Discord) => {
    if (!bot.db.giveaways.count) bot.db.giveaways.count = 0;
    let giveawayChannelID = "855967384351145994";
    let giveawayChannel = bot.channels.cache.get(giveawayChannelID);
    let create = args.shift();
    let time = args.shift();
    let ms = await bot.functions.getTimeFromString(time);
    let count = 1//args.shift();
    let name = args.join(" ");
    let embed = await new Discord.MessageEmbed()
      .setDescription(`React with 🎉 to enter!\nEnds: <t:${Math.floor((ms+new Date().getTime())/1000)}:R> (<t:${Math.floor((ms+new Date().getTime())/1000)}:f>)\nHosted by: <@${message.author.id}>`)
      .setTimestamp((ms)+new Date().getTime())
      .setAuthor({"name": name})
      .setFooter({"text": `${count} winner${(count==1)?"":"s"} | Ends at`});
    let startMessage = await giveawayChannel.send({content: "🎉   **GIVEAWAY**   🎉", embeds: [embed]});
    startMessage.react("🎉");
    let vars = {
      messageID: startMessage.id,
      channelID: giveawayChannelID,
      ID: bot.db.giveaways.count++
    }
    let timeout = bot.functions.setTimeout(bot, ms ,(async () => {
      let startMessage = await bot.channels.cache.get(vars.channelID).messages.fetch(vars.messageID, {force: true});
      //send the 0 entres embed if it happens (the one is the bot)
      if (startMessage.reactions.cache.reverse().last().count==1) return startMessage.channel.send({content: "No valid entrants, so a winner could not be determined!",embeds: [new Discord.MessageEmbed({"title":null,"type":"rich","description":"0 entrants [:arrow_upper_right:](https://discord.com/channels/704987510073327638/955854974569562182/982248490803535883)","url":null,"timestamp":null,"color":3553599,"fields":[],"thumbnail":null,"image":null,"author":null,"footer":null})]})
      //pick a winner and send the embed
      let reactions = await startMessage.reactions.cache.reverse().last().users.fetch();
    reactions.delete(reactions.findKey(user=>user.id==bot.user.id))
      let winner = reactions.random();
      startMessage.channel.send({content: `Congratulations ${winner}, you won the ${startMessage.embeds[0].author.name}!`,embeds: [new Discord.MessageEmbed({"title":null,"type":"rich","description":`${reactions.size} entrant${(reactions.size==1)?"":"s"} [:arrow_upper_right:](https://discord.com/channels/704987510073327638/955854974569562182/982248490803535883)`,"url":null,"timestamp":null,"color":3553599,"fields":[],"thumbnail":null,"image":null,"author":null,"footer":null})]})
    }), vars)
  }
}