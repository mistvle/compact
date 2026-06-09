const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Send a message via the bot.")
    .addStringOption(option => option
        .setName('message')
        .setDescription("Input the message to send.")
        .setRequired(true)

    ),

    async execute (interaction) {
        if (!interaction.member.permissions.has("Administrator")) {
            return interaction.reply({content: "<:xmark:1513786587568148561> You do not have permission to run this command.", flags: 64})

        }

        const message = interaction.options.getString('message');
        await interaction.channel.send(message);
        await interaction.reply("<:xmark:1513786587568148561> **Successfully** sent message.")
    }
}