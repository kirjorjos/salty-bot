module.exports = {
    usage: "suggest <suggestion/accept/deny> [suggestion]",
    description: "Returns latency and API ping",
    build: (command) => {
      command.addSubcommand(subcommand => 
        subcommand.setName('suggestion')
          .setDescription("Your suggestion")
          .addStringOption(option =>
            option.setName("suggestion")
                .setDescription("Your suggestion")
                .setRequired(true)
          )
      );
      command.addSubcommand(subcommand => 
        subcommand.setName('accept')
        .setDescription('Accept a suggestion')
      );
      command.addSubcommand(subcommand => 
        subcommand.setName('deny')
        .setDescription('Deny a suggestion')
        );
      return command;
    },
    run: async (bot, interaction, args, Discord) => {
       console.log(interaction);
    }
}