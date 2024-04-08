const say = new Discord.MessageEmbed()
    .setColor('#b739bf')
    .setTitle('Syntax Error')
    .setDescription(`Please use the format
'${bot.config.prefix}say {message}'`)
    .setFooter('saltyuniverse.net', `${bot.user.displayAvatarURL()}`)

const announceformat = new Discord.MessageEmbed()
    .setColor('#b739bf')
    .setTitle('Syntax Error')
    .setDescription(`Please use the format
'${bot.config.prefix}announce {message}`)
    .setFooter('saltyuniverse.net', `${bot.user.displayAvatarURL()}`)

const pingEmbed = new Discord.MessageEmbed()
    .setColor('#b739bf')
    .setTitle('Unable to send')
    .setDescription(`You cannot ping everyone
in a ${bot.config.prefix}say message!`)
    .setFooter('saltyuniverse.net', `${bot.user.displayAvatarURL()}`)

const acceptformat = new Discord.MessageEmbed()
    .setColor('b739bf')
    .setTitle('Syntax Error')
    .setDescription(`Please use the format
'${bot.config.prefix}accept {user-ID} {text}`)
    .setFooter('saltyuniverse.net', `${bot.user.displayAvatarURL()}`)






// IP Message Respond
if(message.content.toLowerCase().startsWith('${bot.config.prefix}say')) return;
if(message.content.toLowerCase().startsWith('${bot.config.prefix}suggest')) return;
if(message.content.toLowerCase().includes('iphone')) return;
if(message.content.toLowerCase().includes('ipad')) return;
if(message.content.toLowerCase().includes('ipod')) return;
if(message.author.id === bot.user.id) return;
if(message.content.toLowerCase().includes('${bot.config.prefix}ip')){
    message.reply(ip)}
if(message.content.toLowerCase().includes(' ip')){
    message.reply(ip)}
if(message.content.toLowerCase().includes(' ip')) return;
if(message.content.toLowerCase().startsWith('ip')){
    message.reply(ip)}
// IP Message Respond



// Announcements
if(message.content.toLowerCase() === ('${bot.config.prefix}announce')){
    message.channel.send(announceformat)}
if(message.content.toLowerCase() === ('${bot.config.prefix}announce')) return;
const args2 = message.content.split(" ").slice(1);
if(message.author.id === bot.user.id) return;
if(message.content.toLowerCase().startsWith('${bot.config.prefix}announce ')){
    if(message.channel.id === '705690440254488596'){
    var announcetext = args2.join(" ");
    var messagesender2 = message.author.username;
    var messageauthor2 = message.author
    const announcechannel = bot.channels.cache.get("705690441089155082");
// Announcements Embed
const announceembed = new Discord.MessageEmbed()
    .setTitle(`Announcement         _ _`)
    .setColor('#b739bf')
    .setDescription(`${announcetext}`)
    .setThumbnail(`${bot.user.displayAvatarURL()}`)
    .setFooter(`Announcement by ${messagesender2}`, `${messageauthor2.displayAvatarURL()}`)

const announcesent = new Discord.MessageEmbed()
    .setTitle('Announcement sent')
    .setColor('#b739bf')
// Announcements Embed
    announcechannel.send(announceembed)
    message.channel.send(announcesent)}
// Announcements





};})
bot.login('token');