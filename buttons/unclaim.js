module.exports = {
    customId: "unclaim_ticket",

    async execute(interaction) {

        const channel = interaction.channel;

        const ownerId = (channel.topic || "").split("|")[0];

        // RESET TOPIC
        await channel.setTopic(ownerId);

        // CLONE COMPONENTS
        const data = JSON.parse(JSON.stringify(interaction.message.components));

        const container = data[0];

        const buttonRow = container.components.find(c => c.type === 1);

        // CHANGE BUTTON
        buttonRow.components[0] = {
            style: 3,
            type: 2,
            label: "Claim",
            custom_id: "claim"
        };

        await interaction.update({
            flags: 32768,
            components: data
        });

        await interaction.followUp({
            "flags": 32768,
            "components": [
                {
                    "type": 17,
                    "components": [
                        {
                            "type": 10,
                            "content": `> <:xmark:1513786587568148561> ${interaction.user} has unclaimed this ticket. Another member of our team will assist you shortly.`
                        }
                    ]
                }
            ]
        });
    }
}