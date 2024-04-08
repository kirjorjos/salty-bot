module.exports = {
  usage: "unmute <@user/user id> [reason]",
  description: "Mutes a user",
  run: async (bot, message, args, Discord) => {
    if (!args[0]) return message.channel.send("Please specify a user.");
    let targetID = args.shift();
    let target = await message.guild.members.fetch(targetID.match(/[0-9]{18}/)[0])
    target.timeout(null, args.join(" ")).catch(console.error)
    message.channel.send(`Unmuted ${target}`);
  }
}