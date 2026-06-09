module.exports = {
    customId: "learn_more_menu",

    async execute (interaction) {
        const value = interaction.values[0];

        if (value === "our_mission") {
            return interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "**What does the history of Compact Customs entail?**\nCompact Customs was founded by <@1322778815394742296> on June 8th, 2026. We are currently growing to become on of the largest communities, focusing on customer satisfaction throughout the services & products we offer. Our mission has always been to provide reliable services, foster a welcoming community, and help creators elevate their projects through exceptional design solutions.\n\n**How does our moderation system work?**\nAt Compact Customs, all moderation actions are handled on a case-by-case basis. Our staff team carefully reviews each situation using available evidence and context before reaching a decision. We are committed to remaining fair, unbiased, and professional when enforcing our rules. Every report, appeal, and concern is evaluated individually to ensure that actions are justified and consistent with our community standards. If you believe a moderation decision was made in error, you may contact our support team to request a review. \n\n**Is it possible to become an official affiliate?**\nOur partners are carefully picked by our team. Official partners are offered advanced design services from our server. Our affiliates are carefully reviewed prior to being announced as an official affiliate, ensurin the quality of each affiliate. You can open a ticket if you are interested in partnering with our server."
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1513643373251006537/1513657425360588922/image.png?ex=6a2886d4&is=6a273554&hm=e140772531979d2f04b3dbc8d1046ccdf35497e495d213eb907891f553f82048&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
})
        }
        if (value === "guidelines") {
            return interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "` #1 ` **Discord ToS & Community Guidelines**\n- You are required to follow all guidelines listed within [Discord ToS](https://discord.com/terms) & [Discord Community Guidelines](https://discord.com/guidelines).\n- Failure to do so will result in a non-appealable ban.\n\n` #2 ` **Respect**\n- You are required to show respect to all members.\n- Discrimination, hateful speech, and racial slurs are not permitted.\n\n` #3 ` **Disruptions & Channel Usage**\n- Do not mention Management+ without a valid reason to do so.\n- Spamming & DM advertising is not permitted.\n- Use channels for their intended purposes.\n\n` #4 ` **Common Sense**\n- Use your common sense at all times.\n- You may be moderated for reasons not explicitly stated above."
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1513643373251006537/1513657425360588922/image.png?ex=6a2886d4&is=6a273554&hm=e140772531979d2f04b3dbc8d1046ccdf35497e495d213eb907891f553f82048&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
})
        }
    }
}