module.exports = {
    customId: "learn_more",

    async execute (interaction) {
        return interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "You can view further information regarding **Compact Customs** below. Use the select menu below to select our guidelines or our mission."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 1,
          "components": [
            {
              "type": 3,
              "options": [
                {
                  "label": "Our Mission",
                  "value": "our_mission",
                  "description": "View our mission."
                },
                {
                  "label": "Guidelines",
                  "value": "guidelines",
                  "description": "View server guidelines."
                }
              ],
              "placeholder": "Learn More",
              "flows": {},
              "custom_id": "learn_more_menu",
              "min_values": 1,
              "max_values": 1
            }
          ]
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