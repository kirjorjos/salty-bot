module.exports = {
    usage: "eval <cmd>",
    description: "Evals a command",
    hidden: true,
    run: async (bot, message, args, Discord) => {
      let sendResponce = true;
      try {
        let code = args.join(" ");
        code = code.replace("```js", "");
        code = code.replace("```", "");
      let result = eval(code);
       if (sendResponce) message.channel.sendSafe("Result: ```js\n" + result + "```");
      } catch(e) {
        try {
          message.channnel.sendSafe("```xl" + e.stack + "```");
        } catch(q) {
          console.log(e.stack);
        }
      }
    }
}