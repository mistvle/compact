const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  customId: "help_modal",

  async execute(interaction) {

    const CATEGORY_ID = "1513792014297206844";

    const STAFF_ROLE_IDS = [
      "1513646135732998154",
      "1513646193400483840",
      "1513645990064951357"
    ];

    const reason = interaction.fields.getTextInputValue("help_reason");

    const username = interaction.user.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const existing = interaction.guild.channels.cache.find(
      c => c.topic === interaction.user.id
    );

    if (existing) {
      return interaction.reply({
        content: `<:xmark:1513786587568148561> You already have an open ticket: ${existing}`,
        flags: 64
      });
    }

    const staffRoles = STAFF_ROLE_IDS
      .map(roleId => interaction.guild.roles.cache.get(roleId))
      .filter(role => role);

    const overwrites = [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks
        ]
      },
      ...staffRoles.map(role => ({
        id: role.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks,
          PermissionFlagsBits.ManageChannels
        ]
      }))
    ];

    const channel = await interaction.guild.channels.create({
      name: `support-${username}`,
      type: ChannelType.GuildText,
      parent: CATEGORY_ID,
      topic: interaction.user.id,
      permissionOverwrites: overwrites
    });

    await interaction.reply({
      flags: 32768,
      ephemeral: true,
      components: [
        {
          type: 17,
          components: [
            {
              type: 10,
              content: `<:check:1513786612566331432> Your ticket has been created successfully: ${channel}`
            },
            {
              type: 14,
              spacing: 2
            },
            {
              type: 12,
              items: [
                {
                  media: {
                    url: "https://media.discordapp.net/attachments/1513643373251006537/1513657425360588922/image.png?ex=6a2886d4&is=6a273554&hm=e140772531979d2f04b3dbc8d1046ccdf35497e495d213eb907891f553f82048&=&format=webp&quality=lossless"
                  }
                }
              ]
            }
          ]
        }
      ]
    });

    await channel.send({
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            {
              type: 12,
              items: [
                {
                  media: {
                    url: "https://media.discordapp.net/attachments/1513643373251006537/1513652058388172800/assistancej.png?ex=6a2881d5&is=6a273055&hm=15ef829f960870bd07271b9d39d38c92b464007d88b657d496c05eae09918b2f&=&format=webp&quality=lossless"
                  }
                }
              ]
            },
            {
              type: 10,
              content: `-# @everyone | ${interaction.user}`
            },
            {
              type: 14,
              spacing: 2
            },
            {
              type: 10,
              content:
`<:bell:1513792273794732072> A new support ticket has been opened. Ensure to assist the user with their inquiry promptly.

**Ticket Guidelines**
- Do not ping anyone; our team has already been notified of your ticket
- Remain respectful & patient
- Remain active to avoid ticket closure

**Ticket Details**
- **Inquiry:** ${reason}`
            },
            {
              type: 14,
              divider: false
            },
            {
              type: 1,
              components: [
                {
                  style: 1,
                  type: 2,
                  label: "Claim",
                  custom_id: "claim",
                  flow: {
                    actions: []
                  }
                },
                {
                  style: 4,
                  type: 2,
                  label: "Close",
                  custom_id: "close",
                  flow: {
                    actions: []
                  }
                }
              ]
            }
          ]
        }
      ]
    });

  }
};