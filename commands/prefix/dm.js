const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "dm",

  async execute(message, args) {
    if (message.author.bot) return;

const LOG_CHANNEL_ID = "1513643373251006537";

const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
if (!isAdmin) {
  return message.reply("<:xmark:1513786587568148561> You do not have permission to use this command.");
}

const userId = args[0];
const text = args.slice(1).join(" ");

if (!userId || !text) {
  return message.reply("<:xmark:1513786587568148561> Please provide a valid message or user ID.");
}

let user;
try {
  user = await message.client.users.fetch(userId);
} catch (err) {
  return message.reply("<:xmark:1513786587568148561> Invalid user ID.");
}

// optional ActionRow (not required if using your raw components)
const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("dm_reply")
    .setLabel("Reply")
    .setStyle(ButtonStyle.Secondary)
);

try {
  await user.send({
    flags: 32768,
    components: [
      {
        type: 17,
        components: [
          { type: 10, content: "# Direct Message" },
          { type: 14, spacing: 2 },
          {
            type: 10,
            content:
              "A message has been sent to you by our **Executive Team**. Ensure to reply as soon as possible if prompted to. Use the button below to reply."
          },
          { type: 14, divider: false },
          {
            type: 9,
            components: [
              {
                type: 10,
                content: `**Message**: \`${text}\``
              }
            ],
            accessory: {
              style: 2,
              type: 2,
              label: "Reply",
              custom_id: "dm_reply"
            }
          },
          { type: 14, spacing: 2 },
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

  const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
  if (channel) {
    channel.send({
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: "# Message Log" },
            { type: 14, spacing: 2 },
            {
              type: 10,
              content: `A message has been sent by ${message.author} using the bot.\n\n**User**: ${user}\n**Message**: ${text}`
            },
            { type: 14, spacing: 2 },
            {
              type: 12,
              items: [
                {
                  media: {
                    url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a00950c&is=69ff438c&hm=f649ac59044116ca7ab9fef41098da0ae4ecaad67feaece2d26235e9953916ec&=&format=webp&quality=lossless&width=1768&height=152"
                  }
                }
              ]
            }
          ]
        }
      ]
    }).catch(() => {});
  }

  return message.reply(`<:check:1513786612566331432> Message sent to <@${userId}>.`);
} catch (err) {
  console.error("DM command error:", err);
  return message.reply("<:xmark:1513786587568148561> Failed to messge user.");
}

  }
}