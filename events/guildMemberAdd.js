module.exports = {
  name: "guildMemberAdd",

  async execute(client, member) {

    const channel = member.guild.channels.cache.get("1511676379505098792");

    if (channel) {
      channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 10,
      "content": `Welcome ${member} to **Compact Systems** —  an ER:LC service hub meant to provide your server with top-notch products for the cheapest prices. We offer liveries, graphics, & clothing. Order today in our [services](https://discord.com/channels/1513641581134221484/1513644804481880244) channel.`
    },
    {
      "type": 1,
      "components": [
        {
          "style": 2,
          "type": 2,
          "label": `${member.guild.memberCount}`,
          "emoji": {
            "id": "1504308082287575151",
            "name": "m_Heart",
            "animated": false
          },
          "disabled": true,
          "flow": {
            "actions": []
          },
          "custom_id": "p_309972919314812929"
        },
        {
          "type": 2,
          "style": 5,
          "label": "Dashboard",
          "url": "https://discord.com/channels/1513641581134221484/1513641582665011233",
        }
      ]
    }
  ]
});
    }

    const totalMembers = member.guild.memberCount;

  }
};