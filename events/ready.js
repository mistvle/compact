module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);

    client.user.setActivity("🌿 Powering Compact Customs", {
      type: 3 // WATCHING
    });
  }
};