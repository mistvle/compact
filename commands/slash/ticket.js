const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const STAFF_ROLE_ID = "1508991304028131399";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket management")

    .addSubcommand(sub =>
      sub.setName("rename")
        .setDescription("Rename a ticket.")
        .addStringOption(opt =>
          opt.setName("name").setDescription("Input the new name of the ticket.").setRequired(true)
        )
    )

    .addSubcommand(sub =>
      sub.setName("add")
        .setDescription("Add a user or role to the ticket.")
        .addUserOption(opt => opt.setName("user").setDescription("Select the user to add."))
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role to add."))
    )

    .addSubcommand(sub =>
      sub.setName("remove")
        .setDescription("Remove a user or role from the ticket.")
        .addUserOption(opt => opt.setName("user").setDescription("Select the user to remove."))
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role to remove."))
    )

    .addSubcommand(sub =>
      sub.setName("close").setDescription("Close the ticket.")
    ),
  async execute(interaction) {

    const sub = interaction.options.getSubcommand();
    const channel = interaction.channel;

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole =
      interaction.member.roles.cache.has("1513646193400483840") ||
      interaction.member.roles.cache.has("1513646135732998154");

    if (!hasRole && !isAdmin) {
      return interaction.reply("<:xmark:1513786587568148561> You must be an employee to use this command.");
    }

    if (!channel.topic || !/^\d+(\|\d+)?$/.test(channel.topic)) {
      return interaction.reply({
        content: "<:xmark:1513786587568148561> This command must be used in a ticket.",
        flags: 64
      });
    }

    if (sub === "rename") {
      const name = interaction.options.getString("name");

      await channel.setName(name);

      return interaction.reply({
        content: `<:check:1513786612566331432> **Successfully** renamed ticket to **${name}**.`,
        flags: 64
      });
    }

    if (sub === "add") {
      const user = interaction.options.getUser("user");
      const role = interaction.options.getRole("role");

      if (!user && !role) {
        return interaction.reply({
          content: "<:xmark:1513786587568148561> Failed to detect a valid user or role.",
          flags: 64
        });
      }

      if (user) {
        await channel.permissionOverwrites.edit(user.id, {
          ViewChannel: true,
          SendMessages: true
        });

        return interaction.reply({
          content: `<:check:1513786612566331432> **Successfully** added ${user} to the ticket.`,
          flags: 64
        });
      }

      if (role) {
        await channel.permissionOverwrites.edit(role.id, {
          ViewChannel: true,
          SendMessages: true
        });

        return interaction.reply({
          content: `<:check:1513786612566331432> **Successfully** added ${role} to the ticket.`,
          flags: 64
        });
      }
    }

    if (sub === "remove") {
      const user = interaction.options.getUser("user");
      const role = interaction.options.getRole("role");

      if (!user && !role) {
        return interaction.reply({
          content: "<:xmark:1513786587568148561> Failed to detect a valid user or role.",
          flags: 64
        });
      }

      if (user) {
        await channel.permissionOverwrites.delete(user.id);

        return interaction.reply({
          content: `<:check:1513786612566331432> **Successfully** removed ${user} from the ticket.`,
          flags: 64
        });
      }

      if (role) {
        await channel.permissionOverwrites.delete(role.id);

        return interaction.reply({
          content: `<:check:1513786612566331432> **Successfully** removed ${role} from the ticket.`,
          flags: 64
        });
      }
    }

    const discordTranscripts = require("discord-html-transcripts");

    if (sub === "close") {

      const [ownerId] = (channel.topic || "").split("|");

      await interaction.reply({
        flags: 32832,
        components: [
          {
            type: 17,
            components: [
              {
                type: 10,
                content: "<a:loading:1513788860218474646> Closing ticket..."
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
                      url: "https://cdn.discordapp.com/attachments/1513643373251006537/1513657425360588922/image.png?ex=6a2886d4&is=6a273554&hm=e140772531979d2f04b3dbc8d1046ccdf35497e495d213eb907891f553f82048&"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });

      const user = await interaction.client.users.fetch(ownerId).catch(() => null);

      if (user) {
        await user.send({
          flags: 32768,
          components: [
            {
              type: 17,
              components: [
                {
                  type: 10,
                  content: "# <:bell:1513792273794732072> Ticket Closed"
                },
                {
                  type: 10,
                  content: "Your ticket in **Compact Customs** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
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
                        url: "https://cdn.discordapp.com/attachments/1513643373251006537/1513657425360588922/image.png?ex=6a2886d4&is=6a273554&hm=e140772531979d2f04b3dbc8d1046ccdf35497e495d213eb907891f553f82048&"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }).catch(() => {});
      }

      const messages = await channel.messages.fetch({ limit: 10 });

      const panel = messages.find(m =>
        m.components?.[0]?.components?.some(c =>
          c.content?.includes("Ticket Details")
        )
      );

      let inquiry = "N/A";

      if (panel) {

        const textBlock = panel.components[0].components.find(c =>
          c.content?.includes("Ticket Details")
        );

        if (textBlock) {

          const content = textBlock.content;

          if (
            channel.name.startsWith("support-") ||
            channel.name.startsWith("aa-")
          ) {

            const lines = content.split("\n");

            const inquiryLine = lines.find(line =>
              line.includes("Inquiry:")
            );

            if (inquiryLine) {
              inquiry = inquiryLine.replace("- Inquiry:", "").trim();
            }
          }

          if (channel.name.startsWith("ia-")) {

            const lines = content.split("\n");

            const callsign =
              lines.find(l => l.includes("Deputy Callsign:"))
              ?.replace("- Deputy Callsign:", "")
              ?.trim() || "N/A";

            const username =
              lines.find(l => l.includes("Deputy Username:"))
              ?.replace("- Deputy Username:", "")
              ?.trim() || "N/A";

            const reason =
              lines.find(l => l.includes("Reason:"))
              ?.replace("- Reason:", "")
              ?.trim() || "N/A";

            inquiry =
`Deputy Callsign: ${callsign}
Deputy Username: ${username}
Reason: ${reason}`;
          }
        }
      }

      const attachment = await discordTranscripts.createTranscript(channel, {
        limit: -1,
        returnType: "attachment",
        filename: `transcript-${channel.id}.html`
      });

      const logChannel = interaction.guild.channels.cache.get("1513793052995747880");

      const embed = {
        title: "Ticket Closed",
        color: 4079169,
        image: {
          url: "https://cdn.discordapp.com/attachments/1513643373251006537/1513657425360588922/image.png?ex=6a2886d4&is=6a273554&hm=e140772531979d2f04b3dbc8d1046ccdf35497e495d213eb907891f553f82048&"
        },
        description:
`A ticket has been closed. Review information regarding it below.

**Channel Name:** ${channel.name}
**Channel ID:** ${channel.id}
**Inquiry:** ${inquiry || "N/A"}

**Opened By:** <@${ownerId}>
**Closed By:** ${interaction.user}`
      };

      await logChannel.send({
        embeds: [embed],
        files: [attachment]
      });

      setTimeout(() => {
        channel.delete().catch(() => {});
      }, 2000);
    }


  }
};