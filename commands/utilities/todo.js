module.exports = {
  usage: "todo <add/list/remove/edit> [item/id/new item]",
  description: "a todo list",
  aliases: ["todos"],
  run: async (bot, message, args, Discord) => {
    if (message.cmd == "todos") args.unshift("list");
    let flag = args.shift()
    switch(flag) {
      case "add":
        if (!bot.db.todo[message.author.id]) bot.db.todo[message.author.id] = [];
        bot.db.todo[message.author.id][bot.db.todo[message.author.id].length] = args.join(" ");
        message.channel.sendSafe(`Added to your to do list: ${args.join(" ")}`);
        break;
      case "list":
        if (!bot.db.todo[message.author.id] || bot.db.todo[message.author.id] == []) return message.channel.sendSafe("You have 0 items on your todo list.");
        let todoEmbed1 = new Discord.MessageEmbed()
        .setColor('#b739bf')
        .setTitle(`${message.author.username}'s todo list:`)
        .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`});
        for (var i = 0; i<bot.db.todo[message.author.id].length; i++) {
          todoEmbed1.addField(`Item ${i+1}`, bot.db.todo[message.author.id][i]);
        }
        return message.channel.sendSafe({embeds: [todoEmbed1]});
        break;
      case "remove":
        try {
          let removed = bot.db.todo[message.author.id].splice(parseInt(args.join(" "))-1, 1);
          message.channel.sendSafe(`${removed} removed from your to do list.`);
        } catch(e) {
          console.log(e.stack);
          return message.channel.sendSafe(`Unknown list item: ${args.join(" ")}.  Please remember to use the number given in \`${bot.config.prefix}todo list\`.`);
        }
        break;
      case "edit":
        let num = (parseInt(args.shift())-1)
        let org = bot.db.todo[message.author.id][num];
        let changed = args.join(" ");
        bot.db.todo[message.author.id][num] = changed;
        let todoEmbed2 = new Discord.MessageEmbed()
          .setColor('#b739bf')
          .setTitle(`${message.author.username}`)
          .setFooter({text: 'Salty Universe', iconURL: `${bot.user.displayAvatarURL()}`})
          .setDescription(`You updated item ${num+1} (\`${org}\`) to \`${changed}\`.`);
        message.channel.sendSafe({embeds: [todoEmbed2]});
        break;
      default:
        if (!flag) return message.channel.sendSafe(`Please sepficy a method.  Run \`${bot.config.prefix}help todo\` if need be.`)
        return message.channel.sendSafe(`Unknown operation: ${flag}`);
    }
    bot.database.set("todo", bot.db.todo)
  }
}