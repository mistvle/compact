const { SlashCommandBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("tax")
    .setDescription("Calculate how much to charge based off Roblox tax.")
    .addIntegerOption(option => option
        .setName("amount")
        .setDescription("Input the amount to tax.")
        .setRequired(true)

    ),

    async execute (interaction) {
        const amount = interaction.options.getInteger("amount");
        const newAmount = Math.round(amount * 1.3);
        await interaction.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `To receive **R$${amount}**, you must charge **R$${newAmount}**.`
        }
      ]
    }
  ]
})
    }
}