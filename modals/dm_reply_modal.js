module.exports = {
  customId: "dm_reply_modal",

  async execute(interaction) {

    const reply = interaction.fields.getTextInputValue("reply_text");

    const LOG_CHANNEL_ID = "1513643373251006537";
    const channel = interaction.client.channels.cache.get(LOG_CHANNEL_ID);

    if (!channel) {
      return interaction.reply({
        content: "<:xmark:1513786587568148561> **Failed** to **fetch** reply channel.",
        ephemeral: true
      });
    }

    await channel.send({
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: "# Message Reply" },
            { type: 14, spacing: 2 },
            {
              type: 10,
              content: `A message reply has been sent by ${interaction.user} (\`${interaction.user.id}\`).`
            },
            { type: 14, divider: false },
            {
              type: 10,
              content: `**Reply**: \`${reply}\``
            }
          ]
        }
      ]
    });

    await interaction.reply({
      content: "<:check:1513786612566331432> **Successfully** sent reply.",
      ephemeral: true
    });
  }
};