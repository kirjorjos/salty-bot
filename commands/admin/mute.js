module.exports = {
  usage: "mute <@user/user id> <time> [reason]",
  description: "Mutes a user",
  run: async (bot, message, args, Discord) => {
    if (!args[0]) return message.channel.send("Please specify a user.");
    let targetID = args.shift();
    let timeRaw = args[0];
    let ms = await bot.functions.getTimeFromString(timeRaw);
    if (ms) args.shift(); else return message.channel.send(`${timeRaw} is not a vliad time.`)
    let target = await message.guild.members.fetch(targetID.match(/[0-9]{18}/)[0])
    let failed;
    await target.timeout(ms, args.join(" ")).catch((e) => {
      console.error(e);
      message.channel.send("Something went wrong.");
      failed = true;
    })
    if (failed) return;
    message.channel.send(`Muted ${target} until <t:${Math.floor(((new Date().getTime()) + ms) / 1000)}>`)
  }
}