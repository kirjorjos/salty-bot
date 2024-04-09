module.exports = {
  run: (reaction, user, bot, giveRole) => {
    if (reaction.message.id !== "949737120480759848") return;
    let member = bot.guilds.cache.get("704987510073327638").members.cache.get(user.id) || await bot.guilds.cache.get("704987510073327638").members.fetch(user.id);
    let roleId;
    switch(reaction._emoji.name) {
      case "🎉":
        try{(giveRole)?member.roles.add("949756541811183646"):member.roles.remove("949756541811183646")}catch(e){};
        break;
      case "📣":
        try{(giveRole)?member.roles.add("949756607225557032"):member.roles.remove("949756607225557032")}catch(e){};
        break;
      case "📰":
        try{(giveRole)?member.roles.add("949756649533472859"):member.roles.remove("949756649533472859")}catch(e){};
        break;
      case "🔃":
        try{(giveRole)?member.roles.add("949757617671143435"):member.roles.remove("949757617671143435")}catch(e){};
        break;
      case "upvote":
        try{(giveRole)?member.roles.add("949756678738415687"):member.roles.remove("949756678738415687")}catch(e){};
        break;
    }
  }
}