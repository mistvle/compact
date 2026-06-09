module.exports = {
    name: 'restart',

    async execute (message, args) {
        const ALLOWED_USER_ID = "1499915565538611401";

if (message.author.id !== ALLOWED_USER_ID) {
    return message.reply({
        content: "<:xmark:1513786587568148561> You do not have permission to run this command.",
        allowedMentions: { repliedUser: false }
    });
}
        

        const msg = await message.reply("<a:loading1:1513789039524970636> Restarting...")
        setTimeout(async () => {
    await msg.edit({
        content: "~~<a:loading1:1513789039524970636> Restarting...~~\n<:check:1513786612566331432> Successfully restarted bot."
    });
}, 5000);
    }
}