module.exports = {
    name: 'dashboard',

    async execute (message) {
        const isAdmin = message.member.permissions.has("Administrator")
        if (!isAdmin) {
            return;
        }

        await message.delete();
        const channel = message.guild.channels.cache.get("1513641582665011233");
        await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1513643373251006537/1513651973411442709/dashboard_2.png?ex=6a2881c0&is=6a273040&hm=ca76fee97729156b1e0a4a1bda45a9ed28771acc712f708aa7f78693892473b6&=&format=webp&quality=lossless&width=550&height=183"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "**Compact Customs** is a creative studio focused on clean, modern visuals. We create custom graphics, cohesive branding, and high-quality designs tailored for the Roblox community, helping groups and creators stand out with a professional identity."
        },
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "type": 2,
              "label": "Help",
              "flow": {
                "actions": []
              },
              "custom_id": "help"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Learn More",
              "flow": {
                "actions": []
              },
              "custom_id": "learn_more"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Apply",
              "flow": {
                "actions": []
              },
              "custom_id": "apply"
            },
            {
              "type": 2,
              "style": 5,
              "label": "Roblox Group",
              "url": "https://www.roblox.com/communities/36020839/Aqua-Designs-2025#!/about",
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