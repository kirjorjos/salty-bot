module.exports = (message) => {
  message.channel.sendSafe = function(content) {
    let object = false;
    if (typeof(content)=="object") object=true;
    content = (object)?JSON.stringify(content):content;
    content = content.replaceAll("@everyone", `[everyone ping]`);
    content = content.replaceAll("@here", `[here ping]`);
    content = (object)?JSON.parse(content):content;
    return message.channel.send(content);
  }
}