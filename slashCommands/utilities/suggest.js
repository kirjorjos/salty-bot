module.exports = {
    usage: "suggest <suggestion/accept/deny> [suggestion]",
    description: "Returns latency and API ping",
    build: (command) => {
      command.addSubcommand(subcommand => 
        subcommand.setName('accept')
        .setDescription('Accept a suggestion')
      );
      command.addSubcommand(subcommand => 
        subcommand.setName('deny')
        .setDescription('Deny a suggestion')
        );
      command.addStringOption((option) => 
        option.setName('suggestion')
        .setDescription("You'r suggestion")
        .setRequired(false)
      );
      return command;
    },
    run: async (bot, interaction, args, Discord) => {
       console.log(interaction);
    }
}